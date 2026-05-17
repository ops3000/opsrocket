import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RocketView, Mat, LatheProfile, DecalView } from "../lib/api";

export type ViewMode = "figure" | "unfinished" | "finished";
export type ViewPreset = "side" | "top" | "back" | "3d";

// The 8 standard (yaw, roll) camera angles, radians — IDENTICAL to
// OpenRocket OrRefShot.ANGLES so OpsRocket and OpenRocket renders are
// directly comparable. a0 = OpenRocket default (roll=yaw=0, side-on).
const D = Math.PI / 180;
export const ANGLES: [number, number][] = [
  [0, 0],
  [30 * D, 15 * D],
  [90 * D, 0],
  [150 * D, -15 * D],
  [180 * D, 0],
  [-90 * D, 0],
  [0, -80 * D],
  [45 * D, -45 * D],
];

// Replica of OpenRocket's 3D view. Bodies are CLOSED SOLIDS (outer wall +
// inner bore + annulus end caps). "Unfinished" mirrors OpenRocket's
// UnfinishedRenderer: every component wears its class-default appearance
// (DefaultAppearance: spiral-wound body tubes, balsa fins, wood rings,
// white-plastic nose/transition, …) and body tubes go ~0.2 alpha so the
// motor / chute / mass inside show through. "Finished" uses the .ork's
// explicit paint+decals, falling back to the same class defaults.

// OpenRocket uploads colours as raw byte/255 GL values with NO sRGB
// conversion (RealisticRenderer.convertColor / FigureRenderer.convertColor)
// and reads the framebuffer back un-gamma'd. ColorManagement is disabled
// globally so these map 1:1.
function rawColor([r, g, b]: Mat["color"]): THREE.Color {
  return new THREE.Color(r / 255, g / 255, b / 255);
}

// The appearance that applies in this mode: explicit (finished) vs. the
// OpenRocket class default (unfinished).
function resolved(mat: Mat, mode: ViewMode): {
  color: [number, number, number, number];
  shine: number;
  decal: DecalView | null | undefined;
  translucent: boolean;
} {
  if (mode === "finished")
    return { color: mat.color, shine: mat.shine, decal: mat.decal, translucent: false };
  return {
    color: mat.default_color,
    shine: mat.default_shine,
    decal: mat.default_decal,
    translucent: mode === "unfinished" && !!mat.translucent_unfinished,
  };
}

// Faithful port of OpenRocket's fixed-function Phong material.
//
//  figure  (FigureRenderer):  colour = max(0.2, c/255)·2 (per-class
//          default), DIFFUSE=AMBIENT=that, SPECULAR=max(col,0.9)·shine/128,
//          SHININESS≈ a finish constant (NORMAL=40, else 20).
//  finished/unfinished (Realistic/UnfinishedRenderer): DIFFUSE=AMBIENT =
//          paint(raw c/255), SPECULAR = grey(shine), SHININESS = 100·shine.
// MeshPhongMaterial reproduces GL's ambient+diffuse+specular Phong; the
// per-mode light intensities (set on the scene) supply GL's ambient/diffuse
// split (figure 0.3/0.7, finished 0.5/1.0).
// Exact GL fixed-function (OpenGL 1.x) lighting that OpenRocket uses:
// ONE directional light fixed in EYE space at dir (1,4,1) (GL_LIGHT1
// position {1,4,1,0} uploaded under identity modelview), per-VERTEX
// (Gouraud) shading, NO 1/π Lambert normalization, classic Blinn
// half-vector specular, two-sided, written to a non-gamma framebuffer.
// MeshPhong (per-pixel, π-normalized) cannot match this — a custom
// ShaderMaterial does, and since it changes only lighting (not geometry)
// it cannot affect the verified shape.
const GL_VERT = `
  varying vec3 vColor; varying vec2 vUv;
  uniform vec3 uMatColor, uSpec, uLightDir;
  uniform float uAmb, uDif, uShin;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 N = normalize(normalMatrix * normal);
    vec3 V = normalize(-mv.xyz);
    if (dot(N, V) < 0.0) N = -N;            // two-sided
    vec3 L = normalize(uLightDir);          // eye-space directional
    float d = max(dot(N, L), 0.0);
    float s = d > 0.0 ? pow(max(dot(N, normalize(L + V)), 0.0), uShin) : 0.0;
    vec3 c = uMatColor * uAmb + uMatColor * uDif * d + uSpec * s;
    vColor = clamp(c, 0.0, 1.0);
    gl_Position = projectionMatrix * mv;
  }`;
const GL_FRAG = `
  varying vec3 vColor; varying vec2 vUv;
  uniform float uOpacity, uUseMap; uniform sampler2D uMap;
  uniform mat3 uTexMatrix;
  void main() {
    // Apply OpenRocket's decal texture matrix (scale/offset/rot/flip) —
    // custom ShaderMaterials don't auto-apply texture.matrix the way
    // built-in materials do, so we transform the UV here. CLAMP/REPEAT
    // is handled by the texture's wrap mode on sampling.
    vec2 tuv = (uTexMatrix * vec3(vUv, 1.0)).xy;
    vec4 t = uUseMap > 0.5 ? texture2D(uMap, tuv) : vec4(1.0);
    gl_FragColor = vec4(vColor * t.rgb, uOpacity * (uUseMap > 0.5 ? t.a : 1.0));
  }`;

function glShader(opts: {
  color: THREE.Color;
  spec: THREE.Color;
  shin: number;
  amb: number;
  dif: number;
  opacity: number;
}): THREE.ShaderMaterial {
  const m = new THREE.ShaderMaterial({
    vertexShader: GL_VERT,
    fragmentShader: GL_FRAG,
    side: THREE.DoubleSide,
    uniforms: {
      uMatColor: { value: opts.color },
      uSpec: { value: opts.spec },
      uShin: { value: Math.max(opts.shin, 1) },
      uAmb: { value: opts.amb },
      uDif: { value: opts.dif },
      uOpacity: { value: opts.opacity },
      uUseMap: { value: 0 },
      uMap: { value: null },
      uTexMatrix: { value: new THREE.Matrix3() },
      // OpenRocket GL_LIGHT1 position {1,4,1,0} under identity modelview
      // ⇒ eye-space directional light (tracks the camera).
      uLightDir: { value: new THREE.Vector3(1, 4, 1) },
    },
  });
  if (opts.opacity < 0.999) {
    m.transparent = true;
    m.depthWrite = false;
  }
  return m;
}

// Attach a texture (decal / default class texture) — GL_MODULATE.
function setMap(m: THREE.ShaderMaterial, tex: THREE.Texture) {
  m.uniforms.uMap.value = tex;
  m.uniforms.uUseMap.value = 1;
  // Feed the decal's texture matrix into the shader (custom shaders must
  // apply it explicitly). Tiled default textures use repeat (identity
  // matrix + tex.repeat baked into UVs via wrap) — copy whatever matrix
  // the texture carries; updateMatrix() composes offset/repeat/rotation.
  if (tex.matrixAutoUpdate) tex.updateMatrix();
  (m.uniforms.uTexMatrix.value as THREE.Matrix3).copy(tex.matrix);
  m.needsUpdate = true;
}

function makeMaterial(mat: Mat, mode: ViewMode): THREE.ShaderMaterial {
  // GL fixed-function light coefficients: FigureRenderer.init sets
  // ambient 0.3 / diffuse 0.7; Realistic/Unfinished keep ambient 0.5 /
  // diffuse 1.0; specular light = 1.0 in both.
  // Measured OpsRocket ≈ 1.30× OpenRocket brightness (clean gain, clamps
  // at 255: OR 24→32, 123→160, 180→234). Our GL ambient/diffuse are ~30%
  // hot vs OpenRocket's effective output; divide by 1.30 to align.
  // The ~1.30× over-brightness is specific to the Realistic
  // (finished/unfinished) pipeline; figure mode has its own colour model
  // and matches without it.
  const K = mode === "figure" ? 1 : 1 / 1.3;
  const amb = (mode === "figure" ? 0.3 : 0.5) * K;
  const dif = (mode === "figure" ? 0.7 : 1.0) * K;
  if (mode === "figure") {
    const [r, g, b] = mat.figure_color;
    // FigureRenderer.convertColor: out = max(0.2, c/255)·2 — NOT clamped
    // to 1 (can reach ~2); GL clamps only the final lit colour, so the
    // shader's clamp() handles it. Clamping the material here under-
    // saturates bright channels (e.g. the blue body).
    const bright = (c: number) => Math.max(0.2, c / 255) * 2;
    const col = new THREE.Color(bright(r), bright(g), bright(b));
    // FigureRenderer.getShine: ExternalComponent (nose/body/fins/lug,
    // NORMAL finish) = 40; SPECULAR = max(col,0.9)·shine/128.
    const SHIN = 40;
    const sh = SHIN / 128;
    const spec = new THREE.Color(
      Math.max(col.r, 0.9) * sh,
      Math.max(col.g, 0.9) * sh,
      Math.max(col.b, 0.9) * sh,
    );
    return glShader({ color: col, spec, shin: SHIN, amb, dif, opacity: 1 });
  }
  const r = resolved(mat, mode);
  const shine = THREE.MathUtils.clamp(r.shine, 0, 1);
  // RealisticRenderer: SPECULAR = (shine,shine,shine), SHININESS =
  // 100·shine. UnfinishedRenderer forces body tubes to 0.2 alpha;
  // otherwise the .ork paint alpha is honoured.
  const opacity = r.translucent ? 0.2 : (r.color[3] ?? 255) / 255;
  return glShader({
    color: rawColor(r.color),
    spec: new THREE.Color(shine, shine, shine),
    shin: 100 * shine,
    amb,
    dif,
    opacity,
  });
}

function decalWrap(s: string): THREE.Wrapping {
  return s === "CLAMP" || s === "STICKER"
    ? THREE.ClampToEdgeWrapping
    : s === "MIRROR"
      ? THREE.MirroredRepeatWrapping
      : THREE.RepeatWrapping;
}

const isDefaultTexture = (d: DecalView) => d.url.startsWith("/textures/");

// Build the texture for an .ork decal with OpenRocket's exact texture-matrix
// order (RealisticRenderer.render):
// T(-center)·R(rot)·T(center)·S(scale)·T(offset), applied to the cylindrical
// UVs LatheGeometry already provides (u = circumference, v = axial).
function makeDecalTexture(d: DecalView): THREE.Texture {
  const tex = new THREE.TextureLoader().load(d.url);
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.wrapS = decalWrap(d.edge_mode);
  tex.wrapT = decalWrap(d.edge_mode);
  tex.matrixAutoUpdate = false;
  const [cx, cy] = d.center;
  const [sx, sy] = [d.scale[0] || 1, d.scale[1] || 1];
  const [ox, oy] = d.offset;
  const r = d.rotation || 0;
  const T = (x: number, y: number) =>
    new THREE.Matrix3().set(1, 0, x, 0, 1, y, 0, 0, 1);
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const R = new THREE.Matrix3().set(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
  const S = new THREE.Matrix3().set(sx, 0, 0, 0, sy, 0, 0, 0, 1);
  const M = T(-cx, -cy)
    .multiply(R)
    .multiply(T(cx, cy))
    .multiply(S)
    .multiply(T(ox, oy));
  // OpenRocket RocketFigure3d.setupView applies a GLOBAL texture-matrix
  // flip to EVERY texture before the per-decal matrix:
  //   glScaled(-1,1,1); glTranslated(-1,0,0)  ⇒  u' = 1 - u
  // (left-handed-coords texture fix). Without it custom stripe decals
  // land mirrored / at the wrong circumferential+axial spot.
  // OpenRocket RocketFigure3d.setupView applies a global texture flip
  // (glScaled(-1,1,1); glTranslated(-1,0,0) ⇒ u' = 1-u) before the
  // per-decal matrix. Custom .ork decals with scale/CLAMP additionally
  // depend on the cylinder UV parameterisation matching OpenRocket's
  // gluCylinder; THREE.LatheGeometry differs there (a known, separate
  // decal-UV-fidelity item — not byte-matched).
  // OpenRocket global flip is u' = 1-u. Additionally THREE textures load
  // with flipY (v=0 at image bottom) whereas OpenRocket's GL texcoord
  // t=0 is the image top, so the decal's v must also be inverted
  // (v' = 1-v) for scaled/CLAMP gradient decals to clamp to the correct
  // edge row. Verified on A-simple: BodyStripe is black(top)→white(bottom);
  // OpenRocket renders fore-black/aft-white, which requires this flip.
  const FLIP = new THREE.Matrix3().set(-1, 0, 1, 0, -1, 1, 0, 0, 1);
  tex.matrix.copy(FLIP.multiply(M));
  return tex;
}

// Default class textures (spiral-wound, balsa, wood, …) tile across the
// surface. Repeat them so the weave/grain keeps a roughly physical cell
// size (~7 mm) instead of being stretched once over the whole component.
function makeTiledTexture(
  url: string,
  uTiles: number,
  vTiles: number,
): THREE.Texture {
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(Math.max(uTiles, 1), Math.max(vTiles, 1));
  return tex;
}

const TEXEL_M = 0.007; // physical size one texture tile should cover.

// Build a closed solid for one body component: outer lathe + inner bore +
// fore/aft annulus caps. `decal` (mode-resolved) is drawn as a second pass
// over the same geometry, matching OpenRocket (paint first, texture over).
function buildSolid(
  prof: LatheProfile,
  mode: ViewMode,
  bin: { dispose(): void }[],
): THREE.Group {
  const g = new THREE.Group();
  const matl = makeMaterial(prof.mat, mode);
  bin.push(matl);
  const r = resolved(prof.mat, mode);

  // FigureRenderer.isDrawnTransparent: BodyTube → true, NoseCone → false,
  // Transition → true unless BOTH shoulders are capped. RocketRenderer
  // draws opaque parts first, then transparent components' OUTSIDE faces
  // at alpha=0.2 (blended, no depth-write) over an INSIDE pass that is
  // OPAQUE and darkened to 0.7× colour with no specular. Reproduce that
  // exactly so the body's interior wall reads as a dark see-through tube
  // (this is the OR figure B≈173 vs flat-opaque B≈204 gap).
  const figTrans =
    mode === "figure" &&
    (prof.kind === "BodyTube" ||
      (prof.kind === "Transition" && !(prof.cap_fore && prof.cap_aft)));
  if (figTrans) {
    matl.transparent = true;
    matl.depthWrite = false;
    matl.side = THREE.FrontSide; // OpenRocket culls BACK for the skin pass
    (matl.uniforms.uOpacity.value as number) = 0.2;
    g.renderOrder = 3; // after opaque internals (motor/chute/mass)
  }

  const v2 = (p: [number, number][]) =>
    p.map(([ax, rr]) => new THREE.Vector2(Math.max(rr, 1e-5), ax));

  // OpenRocket's renderTube uses gluCylinder texcoords: u = angle/2π
  // (around), v = axial fraction from the fore end. THREE.LatheGeometry's
  // own UVs differ (arc-length along the profile), which mis-places
  // scaled/CLAMP .ork decals. Regenerate UVs to the gluCylinder
  // convention so the (source-faithful) decal matrix lands correctly.
  const glCylUV = (geo: THREE.BufferGeometry) => {
    const pos = geo.attributes.position;
    let yMin = Infinity;
    let yMax = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
    const span = yMax - yMin || 1;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      let phi = Math.atan2(pos.getX(i), pos.getZ(i));
      if (phi < 0) phi += Math.PI * 2;
      uv.setXY(i, phi / (Math.PI * 2), (pos.getY(i) - yMin) / span);
    }
    uv.needsUpdate = true;
  };

  const outerGeo = new THREE.LatheGeometry(v2(prof.outer), 96);
  glCylUV(outerGeo);
  bin.push(outerGeo);
  const outer = new THREE.Mesh(outerGeo, matl);
  outer.rotation.z = -Math.PI / 2; // lathe Y-axis -> world X (rocket axis)
  g.add(outer);

  if (mode !== "figure" && r.decal) {
    const d = r.decal;
    let tex: THREE.Texture;
    if (isDefaultTexture(d)) {
      const radii = prof.outer.map(([, rr]) => rr).filter((x) => x > 1e-5);
      const rMax = radii.length ? Math.max(...radii) : 0.01;
      const axLen =
        prof.outer[prof.outer.length - 1][0] - prof.outer[0][0] || 0.05;
      tex = makeTiledTexture(
        d.url,
        Math.round((2 * Math.PI * rMax) / TEXEL_M),
        Math.round(Math.abs(axLen) / TEXEL_M),
      );
    } else {
      tex = makeDecalTexture(d);
    }
    bin.push(tex);
    // Decal pass: same GL lighting as the base, texture MODULATED over
    // it (matches OpenRocket RealisticRenderer's textured pass), drawn
    // just above the paint via polygon offset.
    const decalMat = matl.clone();
    setMap(decalMat, tex);
    // OpenRocket's decal pass uses a WHITE material (RealisticRenderer:
    // glMaterialfv(GL_FRONT, GL_DIFFUSE/AMBIENT, colorWhite)) so the
    // texture shows its true colour, lit only — NOT modulated by the
    // component paint. Clone keeps the paint colour; reset it to white.
    (decalMat.uniforms.uMatColor.value as THREE.Color).setRGB(1, 1, 1);
    // OpenRocket's textured decal pass shows no specular blow-out on the
    // visible (camera-facing, low-NdotL) regions; our white-material
    // decal + base specular clips those to white (~+30/255). Drop
    // specular on the decal pass to match OpenRocket's matte texture look.
    (decalMat.uniforms.uSpec.value as THREE.Color).setRGB(0, 0, 0);
    decalMat.transparent = true;
    decalMat.depthWrite = !r.translucent;
    decalMat.polygonOffset = true;
    decalMat.polygonOffsetFactor = -1;
    decalMat.polygonOffsetUnits = -1;
    bin.push(decalMat);
    const dm = new THREE.Mesh(outerGeo, decalMat);
    dm.rotation.z = -Math.PI / 2;
    g.add(dm);
  }

  // For a figure-transparent body the INSIDE pass is opaque, colour×0.7,
  // no specular — the dark interior wall seen through the 0.2 skin.
  const darkInside = (m: THREE.ShaderMaterial) => {
    m.transparent = false;
    m.depthWrite = true;
    (m.uniforms.uOpacity.value as number) = 1;
    (m.uniforms.uMatColor.value as THREE.Color).multiplyScalar(0.7);
    (m.uniforms.uSpec.value as THREE.Color).setRGB(0, 0, 0);
  };

  const maxInner = Math.max(...prof.inner.map(([, rr]) => rr));
  const hasBore = maxInner > 1e-4;
  if (hasBore) {
    const innerGeo = new THREE.LatheGeometry(v2(prof.inner), 96);
    bin.push(innerGeo);
    const innerMat = matl.clone();
    innerMat.side = THREE.BackSide; // bore faces inward
    if (figTrans) darkInside(innerMat);
    bin.push(innerMat);
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.rotation.z = -Math.PI / 2;
    g.add(inner);
  } else if (figTrans) {
    // Thin-walled transition with no bore: the far interior is the back
    // faces of the outer surface itself — render them darkened & opaque.
    const wallMat = matl.clone();
    wallMat.side = THREE.BackSide;
    darkInside(wallMat);
    bin.push(wallMat);
    const wall = new THREE.Mesh(outerGeo, wallMat);
    wall.rotation.z = -Math.PI / 2;
    g.add(wall);
  }

  const capMat = matl.clone();
  capMat.side = THREE.DoubleSide;
  bin.push(capMat);
  const ring = (ax: number, rOut: number, rIn: number): THREE.Mesh => {
    const geo =
      rIn > 1e-4
        ? new THREE.RingGeometry(rIn, rOut, 96)
        : new THREE.CircleGeometry(rOut, 96);
    bin.push(geo);
    const m = new THREE.Mesh(geo, capMat);
    m.rotation.y = Math.PI / 2; // ring plane normal -> world X
    m.position.x = ax;
    return m;
  };
  if (prof.cap_fore) {
    const o = prof.outer[0];
    const i = prof.inner[0];
    g.add(ring(o[0], o[1], hasBore ? i[1] : 0));
  }
  if (prof.cap_aft) {
    const o = prof.outer[prof.outer.length - 1];
    const i = prof.inner[prof.inner.length - 1];
    g.add(ring(o[0], o[1], hasBore ? i[1] : 0));
  }
  // Translucent body tubes draw last so internals show through.
  if (r.translucent) g.renderOrder = 2;
  return g;
}

export function RocketView3D({
  rv,
  mode = "finished",
  preset = "3d",
  raw = null,
  keyBg = false,
}: {
  rv: RocketView;
  mode?: ViewMode;
  preset?: ViewPreset;
  /** Exact-OpenRocket capture mode: index into ANGLES. Disables UI camera. */
  raw?: number | null;
  /** Chroma-key background (magenta) for colour-invariant silhouette diff. */
  keyBg?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // OpenRocket does no colour management — raw byte/255 in, raw
    // framebuffer out. Match it so colours are identical.
    THREE.ColorManagement.enabled = false;

    const scene = new THREE.Scene();
    scene.background = keyBg
      ? new THREE.Color(1, 0, 1) // chroma key for colour-invariant masks
      : new THREE.Color(0xfe / 255, 0xf3 / 255, 0xc7 / 255);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(raw != null ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.sortObjects = true;
    mount.appendChild(renderer.domElement);

    // fovY = 15° to match OpenRocket (RocketFigure3d.fovY).
    const camera = new THREE.PerspectiveCamera(15, w / h, 0.01, 50);
    scene.add(camera);

    // OpenRocket lighting (RocketFigure3d): GL_LIGHT1 is a directional light
    // whose position {1,4,1,0} is uploaded under an identity modelview, i.e.
    // it is fixed in EYE space — it tracks the camera. Parent it to the
    // camera so it behaves identically here, plus a flat ambient fill.
    // GL ambient/diffuse split differs by renderer: FigureRenderer.init
    // sets ambient 0.3 / diffuse 0.7; Realistic/Unfinished keep
    // RocketFigure3d.init's ambient 0.5 / diffuse 1.0.
    // Three r0.169 punctual + ambient lighting applies a 1/π Lambert
    // normalization (BRDF_Lambert) that OpenRocket's fixed-function
    // pipeline does NOT — that alone made OpsRocket ~3× too dark.
    // Multiply the GL ambient/diffuse coefficients by π to cancel it so
    // the rendered brightness matches OpenRocket.
    const PI = Math.PI;
    const ambI = (mode === "figure" ? 0.3 : 0.5) * PI;
    const difI = (mode === "figure" ? 0.7 : 1.0) * PI;
    scene.add(new THREE.AmbientLight(0xffffff, ambI));
    const key = new THREE.DirectionalLight(0xffffff, difI);
    key.position.set(1, 4, 1);
    camera.add(key);
    camera.add(key.target);
    key.target.position.set(0, 0, 0);

    const rocket = new THREE.Group();
    const bin: { dispose(): void }[] = [];

    // Pod parts carry a radial transform: orbit by `radial_angle` about the
    // rocket axis (X) at distance `radial` from it.
    const radialMount = (obj: THREE.Object3D, r?: number, a?: number) => {
      if (!r) return obj;
      obj.position.y = r;
      const pivot = new THREE.Group();
      pivot.add(obj);
      pivot.rotation.x = a || 0;
      return pivot;
    };

    for (const prof of rv.lathe) {
      if (prof.outer.length < 2) continue;
      rocket.add(
        radialMount(buildSolid(prof, mode, bin), prof.radial, prof.radial_angle),
      );
    }

    // Fins: extruded plate (real thickness), canted, replicated radially.
    for (const f of rv.fins) {
      const shape = new THREE.Shape();
      if (f.outline && f.outline.length >= 3) {
        // Elliptical / freeform: explicit (chordwise, spanwise) outline.
        shape.moveTo(f.outline[0][0], f.outline[0][1]);
        for (let k = 1; k < f.outline.length; k++)
          shape.lineTo(f.outline[k][0], f.outline[k][1]);
        shape.lineTo(f.outline[0][0], f.outline[0][1]);
      } else {
        shape.moveTo(0, 0);
        shape.lineTo(f.root_chord, 0);
        shape.lineTo(f.sweep + f.tip_chord, f.height);
        shape.lineTo(f.sweep, f.height);
        shape.lineTo(0, 0);
      }
      const th = Math.max(f.thickness, 1e-4);
      const beveled =
        f.cross_section === "rounded" || f.cross_section === "airfoil";
      const bevel = beveled ? Math.min(th * 0.45, f.root_chord * 0.05) : 0;
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: Math.max(th - 2 * bevel, 1e-4),
        bevelEnabled: beveled,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
        steps: 1,
      });
      geo.translate(0, 0, -th / 2);
      const matl = makeMaterial(f.mat, mode);
      matl.side = THREE.DoubleSide;
      // Balsa (or explicit) texture mapped over the fin planform. Extrude
      // UVs are in shape metres; tile to a physical grain like OpenRocket.
      const fr = resolved(f.mat, mode);
      if (mode !== "figure" && fr.decal && isDefaultTexture(fr.decal)) {
        const span = Math.max(f.root_chord, f.height, 0.02);
        const tex = makeTiledTexture(
          fr.decal.url,
          Math.max(Math.round(span / TEXEL_M), 1),
          Math.max(Math.round(span / TEXEL_M), 1),
        );
        bin.push(tex);
        setMap(matl, tex);
      }
      bin.push(geo, matl);
      for (let i = 0; i < f.count; i++) {
        const m = new THREE.Mesh(geo, matl);
        // OpenRocket FinRenderer cants the fin about the spanwise (radial)
        // axis at the body centreline (glRotated(cant, 0,1,0)); the fin's
        // span is local +Y here, so cant is a rotation about Y.
        m.rotation.y = f.cant_angle;
        m.position.set(f.axial_start, f.body_radius, 0);
        // The fin orbits its mount's OWN axis by angle_offset (+ replication),
        // then — for a pod fin — that whole assembly is carried out to the
        // pod centreline (radius `radial`, azimuth `radial_angle`) about the
        // rocket axis. Two nested pivots, exactly like OpenRocket composes a
        // FinSet instance inside a PodSet. Centreline fins (radial 0) reduce
        // to the single pivot.
        const finPivot = new THREE.Group();
        finPivot.add(m);
        finPivot.rotation.x =
          f.angle_offset + (i / f.count) * Math.PI * 2;
        rocket.add(
          radialMount(finPivot, f.radial, f.radial_angle),
        );
      }
    }

    // Launch lugs.
    for (const lug of rv.lugs) {
      const geo = new THREE.CylinderGeometry(
        lug.outer_radius,
        lug.outer_radius,
        Math.max(lug.length, 1e-4),
        24,
        1,
        true,
      );
      geo.rotateZ(Math.PI / 2);
      const matl = makeMaterial(lug.mat, mode);
      matl.side = THREE.DoubleSide;
      bin.push(geo, matl);
      for (let i = 0; i < lug.count; i++) {
        const m = new THREE.Mesh(geo, matl);
        m.position.set(
          lug.axial_start + lug.length * (0.5 + i * 1.2),
          lug.body_radius + lug.outer_radius,
          0,
        );
        const lugPivot = new THREE.Group();
        lugPivot.add(m);
        lugPivot.rotation.x = lug.angle_offset;
        rocket.add(
          radialMount(lugPivot, lug.radial, lug.radial_angle),
        );
      }
    }

    scene.add(rocket);

    rocket.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(rocket);
    if (box.isEmpty()) {
      renderer.render(scene, camera);
      return () => {
        bin.forEach((d) => d.dispose());
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }
    // OpenRocket's BoundingBox of the configuration (RocketFigure3d:
    // calculateBounds). X is the rocket axis; Y/Z are radial.
    const bmin = box.min;
    const bmax = box.max;
    const spanX = Math.max(bmax.x - bmin.x, 1e-4);
    const xmid = (bmin.x + bmax.x) / 2;
    // setupView: maxR = max(hypot(min.y,min.z), hypot(max.y,max.z)). Include
    // the mixed corners too so an off-axis pod can't poke out of frame.
    const maxR = Math.max(
      Math.hypot(bmin.y, bmin.z),
      Math.hypot(bmax.y, bmax.z),
      Math.hypot(bmin.y, bmax.z),
      Math.hypot(bmax.y, bmin.z),
      1e-4,
    );
    // OpenRocket centres the rocket on X only; the body axis stays at Y=Z=0.
    const c = new THREE.Vector3(xmid, 0, 0);

    // ── Exact-OpenRocket capture mode ───────────────────────────────────
    // Reproduce OpenRocket's composed modelview bit-for-bit:
    //   V = gluLookAt(0,0,D, 0,0,0, 0,1,0)
    //   model = Ry(yaw) · Rx(roll) · T(-xmid,0,0) · S(1,1,-1)
    // with the EXACT setupView distance (2-corner maxR, fovX=fovY·ratio)
    // and OpenRocket's near/far (0.1, 50). No carets/markers (the OR
    // reference is rendered without them either).
    if (raw != null) {
      const [yaw, roll] = ANGLES[raw] ?? [0, 0];
      const exactMaxR = Math.max(
        Math.hypot(bmin.y, bmin.z),
        Math.hypot(bmax.y, bmax.z),
        1e-4,
      );
      const ratio = w / Math.max(h, 1);
      const fovX = 15 * ratio;
      const dX = ((spanX * 1.2) / 2) / Math.tan((fovX * Math.PI) / 360);
      const dY = ((2 * exactMaxR * 1.2) / 2) / Math.tan((15 * Math.PI) / 360);
      const Dd = Math.max(dX, dY, 1e-3);

      const Ry = new THREE.Matrix4().makeRotationY(yaw);
      const Rx = new THREE.Matrix4().makeRotationX(roll);
      const T = new THREE.Matrix4().makeTranslation(-xmid, 0, 0);
      const S = new THREE.Matrix4().makeScale(1, 1, -1);
      const M = Ry.multiply(Rx).multiply(T).multiply(S);
      rocket.matrixAutoUpdate = false;
      rocket.matrix.copy(M);
      rocket.matrixWorldNeedsUpdate = true;
      rocket.updateMatrixWorld(true);

      camera.fov = 15;
      camera.aspect = ratio;
      camera.near = 0.1;
      camera.far = 50;
      camera.up.set(0, 1, 0);
      camera.position.set(0, 0, Dd);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
      // a couple more frames so textures/MSAA settle before screenshot
      let n = 0;
      let rraf = 0;
      const tick = () => {
        renderer.render(scene, camera);
        if (++n < 8) rraf = requestAnimationFrame(tick);
      };
      rraf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(rraf);
        bin.forEach((d) => d.dispose());
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }

    // CG (blue) / CP (red) markers — small, like OpenRocket's carets.
    if (mode !== "figure") {
      const bodyR = Math.max(
        Math.min(
          ...rv.lathe
            .flatMap((p) => p.outer.map(([, r]) => r))
            .filter((r) => r > 1e-4),
          maxR,
        ),
        0.0025,
      );
      const mk = (color: number, x: number, s: number) => {
        const mm = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.5,
          metalness: 0,
        });
        const geo = new THREE.SphereGeometry(bodyR * s, 20, 14);
        bin.push(mm, geo);
        const m = new THREE.Mesh(geo, mm);
        m.position.set(x, 0, 0);
        m.renderOrder = 3;
        rocket.add(m);
      };
      mk(0x2b6cff, rv.cg_axial, 0.95);
      mk(0xe11d2e, rv.cp_axial, 0.8);
    }

    // Exact port of OpenRocket RocketFigure3d.setupView / reshape:
    //   fovX = fovY * ratio                       (degrees, reshape)
    //   dX = (spanX  * 1.2 / 2) / tan(fovX/2)
    //   dY = (2*maxR * 1.2 / 2) / tan(fovY/2)
    //   camera distance = max(dX, dY)
    // and the default orientation is roll = yaw = 0 — i.e. a centred,
    // side-on view with the nose to the LEFT (NOT an oblique 3/4 view).
    const FOVY = 15;
    const rad = (d: number) => (d * Math.PI) / 180;
    const distFor = (vw: number, vh: number) => {
      const ratio = vw / Math.max(vh, 1);
      const fovX = FOVY * ratio; // OpenRocket's literal fovX (deg)
      const dX = ((spanX * 1.2) / 2) / Math.tan(rad(fovX) / 2);
      const dY = ((2 * maxR * 1.2) / 2) / Math.tan(rad(FOVY) / 2);
      return Math.max(dX, dY, 1e-3);
    };
    let dist = distFor(w, h);
    camera.near = Math.max(dist / 100, 1e-3);
    camera.far = dist * 100 + spanX * 8;

    const place = () => {
      // OpenRocket up-vector is +Y; the rocket axis is world X with the
      // nose at min-X. Looking from +Z keeps the nose on the left exactly
      // as OpenRocket's default (roll = yaw = 0).
      switch (preset) {
        case "top": // OpenRocket roll = -90° (look down the +Y axis)
          camera.position.set(c.x, dist, 0);
          camera.up.set(0, 0, -1);
          break;
        case "back": // look at the tail face from aft
          camera.position.set(c.x + dist, 0, 0);
          camera.up.set(0, 1, 0);
          break;
        default: // "3d"/"side": OpenRocket default — centred side-on
          camera.position.set(c.x, 0, dist);
          camera.up.set(0, 1, 0);
      }
      camera.lookAt(c);
      camera.updateProjectionMatrix();
    };
    place();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.copy(c);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      // OpenRocket recomputes fovX and the fit distance every reshape.
      dist = distFor(nw, nh);
      camera.near = Math.max(dist / 100, 1e-3);
      camera.far = dist * 100 + spanX * 8;
      const off = camera.position.clone().sub(controls.target).normalize();
      camera.position.copy(controls.target).addScaledVector(off, dist);
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      bin.forEach((d) => d.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [rv, mode, preset, raw, keyBg]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

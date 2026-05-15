import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RocketView } from "../lib/api";

export function RocketView3D({ rv }: { rv: RocketView }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfef3c7);

    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(1, 2, 3);
    scene.add(dir);

    const rocket = new THREE.Group();

    // Body components: lathe each profile (radius, axial) about the axis.
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf5,
      roughness: 0.6,
      metalness: 0.05,
    });
    for (const prof of rv.lathe) {
      if (prof.points.length < 2) continue;
      const pts = prof.points.map(
        ([ax, r]) => new THREE.Vector2(Math.max(r, 1e-5), ax),
      );
      const geo = new THREE.LatheGeometry(pts, 48);
      const mesh = new THREE.Mesh(geo, bodyMat);
      // LatheGeometry spins about Y; orient the rocket along +X.
      mesh.rotation.z = -Math.PI / 2;
      rocket.add(mesh);
    }

    // Fins: flat trapezoids replicated radially.
    const finMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
    for (const f of rv.fins) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(f.root_chord, 0);
      shape.lineTo(f.sweep + f.tip_chord, f.height);
      shape.lineTo(f.sweep, f.height);
      shape.lineTo(0, 0);
      const geo = new THREE.ShapeGeometry(shape);
      for (let i = 0; i < f.count; i++) {
        const m = new THREE.Mesh(geo, finMat);
        const ang = (i / f.count) * Math.PI * 2;
        // fin lies in the X (axial) / radial plane, offset to body surface
        m.rotation.y = -Math.PI / 2; // map shape-x -> world-x (axial)
        const pivot = new THREE.Group();
        m.position.set(f.axial_start, f.body_radius, 0);
        pivot.add(m);
        pivot.rotation.x = ang;
        rocket.add(pivot);
      }
    }

    // Centre the rocket on its mid-length.
    rocket.position.x = -rv.total_length / 2;
    scene.add(rocket);

    const span = Math.max(rv.total_length, rv.max_radius * 4, 0.1);
    camera.position.set(0, span * 0.5, span * 1.3);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);

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
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [rv]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

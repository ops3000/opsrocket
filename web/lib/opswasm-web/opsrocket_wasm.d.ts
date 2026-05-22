/* tslint:disable */
/* eslint-disable */

export function mcp_analysis(bytes: Uint8Array, mach: number): string;

export function mcp_capabilities(): string;

export function mcp_component_mass(bytes: Uint8Array, comp_id: string): string;

/**
 * Apply a list of edit ops and return the new .ork bytes. Stateless: the
 * caller threads the document through and can re-call mcp_inspect /
 * mcp_stability on the result for a fresh snapshot.
 */
export function mcp_edit_apply(bytes: Uint8Array, ops_json: string): Uint8Array;

export function mcp_extract_or_reference(bytes: Uint8Array, index?: number | null): string;

export function mcp_inspect(bytes: Uint8Array): string;

export function mcp_list_materials(): string;

export function mcp_list_motors(): string;

export function mcp_list_presets(filter_json: string): string;

export function mcp_mass_breakdown(bytes: Uint8Array): string;

export function mcp_new_document(): Uint8Array;

export function mcp_optimize(bytes: Uint8Array, params_json: string): string;

export function mcp_parity(bytes: Uint8Array, index?: number | null): string;

export function mcp_simulate(bytes: Uint8Array, sim_name?: string | null): string;

export function mcp_stability(bytes: Uint8Array): string;

export function rocket_view(bytes: Uint8Array): string;

export function session_add(req: string): string;

export function session_analysis(req: string): string;

export function session_assign_motor(req: string): string;

export function session_clear_motor(req: string): string;

export function session_delete(req: string): string;

export function session_load(bytes: Uint8Array): string;

export function session_motors(): string;

/**
 * Start a fresh blank document (the File ▸ New action).
 */
export function session_new(): string;

export function session_optimize(req: string): string;

export function session_patch(req: string): string;

export function session_patch_sim(req: string): string;

/**
 * Re-apply the most recently undone edit (no-op if none).
 */
export function session_redo(): string;

/**
 * Serialize the open document back to `.ork` bytes (browser download).
 */
export function session_save(): Uint8Array;

export function session_set_ignition(req: string): string;

export function session_simulate(req: string): string;

/**
 * Step back one edit. No-op (returns the current view) when the undo
 * stack is empty, so a stray Ctrl/Cmd-Z never errors.
 */
export function session_undo(): string;

export function session_view(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly mcp_analysis: (a: number, b: number, c: number) => [number, number, number, number];
    readonly mcp_capabilities: () => [number, number, number, number];
    readonly mcp_component_mass: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly mcp_edit_apply: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly mcp_extract_or_reference: (a: number, b: number, c: number) => [number, number, number, number];
    readonly mcp_inspect: (a: number, b: number) => [number, number, number, number];
    readonly mcp_list_materials: () => [number, number, number, number];
    readonly mcp_list_motors: () => [number, number, number, number];
    readonly mcp_list_presets: (a: number, b: number) => [number, number, number, number];
    readonly mcp_mass_breakdown: (a: number, b: number) => [number, number, number, number];
    readonly mcp_new_document: () => [number, number, number, number];
    readonly mcp_optimize: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly mcp_parity: (a: number, b: number, c: number) => [number, number, number, number];
    readonly mcp_simulate: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly mcp_stability: (a: number, b: number) => [number, number, number, number];
    readonly rocket_view: (a: number, b: number) => [number, number, number, number];
    readonly session_add: (a: number, b: number) => [number, number, number, number];
    readonly session_analysis: (a: number, b: number) => [number, number, number, number];
    readonly session_assign_motor: (a: number, b: number) => [number, number, number, number];
    readonly session_clear_motor: (a: number, b: number) => [number, number, number, number];
    readonly session_delete: (a: number, b: number) => [number, number, number, number];
    readonly session_load: (a: number, b: number) => [number, number, number, number];
    readonly session_motors: () => [number, number, number, number];
    readonly session_new: () => [number, number, number, number];
    readonly session_optimize: (a: number, b: number) => [number, number, number, number];
    readonly session_patch: (a: number, b: number) => [number, number, number, number];
    readonly session_patch_sim: (a: number, b: number) => [number, number, number, number];
    readonly session_redo: () => [number, number, number, number];
    readonly session_save: () => [number, number, number, number];
    readonly session_set_ignition: (a: number, b: number) => [number, number, number, number];
    readonly session_simulate: (a: number, b: number) => [number, number, number, number];
    readonly session_undo: () => [number, number, number, number];
    readonly session_view: () => [number, number, number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

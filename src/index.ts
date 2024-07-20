import DiffPatcher from './diff-patcher';
import type { Delta, Options } from './types';
import type { Context, DiffContext, PatchContext } from './contexts';

export function create(options?: Options) {
  return new DiffPatcher(options);
}

let defaultInstance: DiffPatcher;

export function diff(left: unknown, right: unknown) {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.diff(left, right);
}

export function patch(left: unknown, delta: Delta) {
  if (!defaultInstance) {
    defaultInstance = new DiffPatcher();
  }
  return defaultInstance.patch(left, delta);
}

export { DiffPatcher };
export type * from './types';
export type { Context, DiffContext, PatchContext };

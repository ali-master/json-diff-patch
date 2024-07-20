import { Context } from './context';
// Types
import type { Delta } from '../types';

export class PatchContext extends Context<unknown> {
  left: unknown;
  delta: Delta;
  pipe: 'patch';

  nested?: boolean;

  constructor(left: unknown, delta: Delta) {
    super();
    this.left = left;
    this.delta = delta;
    this.pipe = 'patch';
  }
}

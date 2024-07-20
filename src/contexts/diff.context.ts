import { Context } from './context';
// Types
import type { Delta } from "../types";

export class DiffContext extends Context<Delta> {
  left: unknown;
  right: unknown;
  pipe: "diff";

  leftType?: string;
  rightType?: string;
  leftIsArray?: boolean;
  rightIsArray?: boolean;

  constructor(left: unknown, right: unknown) {
    super();
    this.left = left;
    this.right = right;
    this.pipe = "diff";
  }

  setResult(result: Delta) {
    return super.setResult(result);
  }
}

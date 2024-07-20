import Pipe from "./pipe.js";
import Processor from "./processor.js";
import { DiffContext, PatchContext } from "./contexts";
import * as trivial from "./filters/trivial.filter";
import * as nested from "./filters/nested.filter";
import * as dates from "./filters/dates.filter";
// Types
import type { Delta, Options } from "./types";

class DiffPatcher {
  processor: Processor;

  constructor(options?: Options) {
    this.processor = new Processor(options);
    this.processor.pipe(
      new Pipe<DiffContext>("diff")
        .append(
          nested.collectChildrenDiffFilter,
          trivial.diffFilter,
          dates.diffFilter,
          nested.objectsDiffFilter,
        )
        .shouldHaveResult()!,
    );
    this.processor.pipe(
      new Pipe<PatchContext>("patch")
        .append(nested.collectChildrenPatchFilter, trivial.patchFilter, nested.patchFilter)
        .shouldHaveResult()!,
    );
  }

  options(options: Options) {
    return this.processor.options(options);
  }

  diff(left: unknown, right: unknown) {
    return this.processor.process(new DiffContext(left, right));
  }

  patch(left: unknown, delta: Delta) {
    return this.processor.process(new PatchContext(left, delta));
  }
}

export default DiffPatcher;

import type Pipe from "./pipe.js";
import type { Options } from "./types";
import type { Context, DiffContext, PatchContext } from "./contexts";

class Processor {
  selfOptions: Options;
  pipes: {
    diff: Pipe<DiffContext>;
    patch: Pipe<PatchContext>;
  };

  constructor(options?: Options) {
    this.selfOptions = options || {};
    this.pipes = {} as {
      diff: Pipe<DiffContext>;
      patch: Pipe<PatchContext>;
    };
  }

  options(options?: Options) {
    if (options) {
      this.selfOptions = options;
    }
    return this.selfOptions;
  }

  pipe<TContext extends Context<any>>(name: string | Pipe<TContext>, pipeArg?: Pipe<TContext>) {
    let pipe = pipeArg;
    if (typeof name === "string") {
      if (typeof pipe === "undefined") {
        return this.pipes[name as keyof typeof this.pipes]!;
      } else {
        this.pipes[name as keyof typeof this.pipes] = pipe as Pipe<Context<any>>;
      }
    }
    if (name && (name as Pipe<TContext>).name) {
      pipe = name as Pipe<Context<any>>;
      if (pipe.processor === this) {
        return pipe;
      }
      this.pipes[pipe.name as keyof typeof this.pipes] = pipe as Pipe<Context<any>>;
    }
    pipe!.processor = this;
    return pipe!;
  }

  process<TContext extends Context<any>>(
    input: TContext,
    pipe?: Pipe<TContext>,
  ): TContext["result"] | undefined {
    let context = input;
    context.options = this.options();
    let nextPipe: Pipe<TContext> | string | null = pipe || input.pipe || "default";
    let lastPipe;
    while (nextPipe) {
      if (typeof context.nextAfterChildren !== "undefined") {
        // children processed and coming back to parent
        context.next = context.nextAfterChildren;
        context.nextAfterChildren = null;
      }

      if (typeof nextPipe === "string") {
        nextPipe = this.pipe(nextPipe) as Pipe<TContext>;
      }
      nextPipe.process(context);
      lastPipe = nextPipe;
      nextPipe = null;
      if (context) {
        if (context.next) {
          context = context.next;
          nextPipe = context.pipe || lastPipe;
        }
      }
    }

    return context.hasResult ? context.result : undefined;
  }
}

export default Processor;

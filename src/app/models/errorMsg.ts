export class ErrorMsg {
    constructor(
      public className?: string,
      public methodName?: string,
      public errorType?: string,
      public errorMessage?: unknown,
      public title?: string,
      public message?: string,
    ) { }
  }
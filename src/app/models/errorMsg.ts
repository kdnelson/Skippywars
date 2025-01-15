export class ErrorMsg {
    constructor(
      public className?: string,
      public methodName?: string,
      public errorType?: string,
      public errorMessage?: string,
      public title?: string,
      public message?: string,
    ) { }
  }
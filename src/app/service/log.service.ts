import { Injectable } from '@angular/core';
import { ErrorMsg } from '../models/errorMsg';
import { ErrorType } from '../models/errorType';

@Injectable()
export class LogService {
  private className: string = 'LogService';

  public constructor(
    public errorType?: ErrorType
  ) {
  }

  logHandler(errorMsg: ErrorMsg){
    let methodName: string = 'logHandler';

    try {
      if(errorMsg !== null) {
        console.log(errorMsg.className + '.' + errorMsg.methodName + ': ' + errorMsg.errorType + ', ' + errorMsg.errorMessage);
      } else {
        console.log(methodName + ': ' + this.errorType?.nullException + ', ' + this.errorType?.nullMethodParam);
      }
    } catch (errMsg) {
      console.log(errorMsg.className + '.' + methodName + ': ' + this.errorType?.parseException + ', ' + errMsg);
    }
  }
}
import { APIException, Exception, Module, Mutex, NetworkConnectionException } from 'core'

// import { actions as mainActions } from "module/main";
import { createErrorMessage } from 'util/ui/message'

// import { createPromisedModal } from "util/ui/modal";
// import {ErrorCodes} from "type/api";

export enum ErrorCodes {
    OUT_OF_RETRIES = 'OUT_OF_RETRIES',
    CAPTCHA_RELATED_API_FAILED = 'CAPTCHA_RELATED_API_FAILED',
}

export class ErrorHandler extends Module<{}> {
    @Mutex()
  *onError (exception: Exception) {
    if (exception instanceof APIException) {
      if (exception.statusCode === 401 || exception.statusCode === 403) {

        // 401: User should login for current API
        // 403: Account blocked during operation (re-login same account will show forbidden message)
      } else if (exception.statusCode === 404) {
        this.setHistory('/not-found')
      } else if (exception.statusCode === 400) {

        // yield call(createPromisedModal, { title: "发生错误", bodyText: exception.message });
        if (exception.errorCode) {

          // yield* this.errorCodeHandler(exception.errorCode as ErrorCodes);
        }
      } else if (exception.statusCode === 503) {
        this.setHistory('/maintenance')
      } else {
        createErrorMessage(process.env.NODE_ENV === 'production' ? '发生网络错误，请稍后重试' : exception.message)
      }
    } else if (exception instanceof NetworkConnectionException) {
      createErrorMessage('网络连接超时，请稍后重试')
    } else {
      const errorMessage = process.env.NODE_ENV === 'production' ? '发生错误，请稍后重试' : exception.message
      createErrorMessage(errorMessage)
    }
  }

    private *errorCodeHandler (errorCode: ErrorCodes) {
      if (errorCode === ErrorCodes.OUT_OF_RETRIES) {
        history.back()
      }
    }
}

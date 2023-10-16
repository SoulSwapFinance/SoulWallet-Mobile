import { ErrorCode, SoulWalletMobileError } from './SoulWalletMobileError';

export class WebviewError extends SoulWalletMobileError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_ERROR, message);
  }
}

export class WebviewNotReadyError extends SoulWalletMobileError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_NOT_READY_ERROR, message);
  }
}

export class WebviewResponseError extends SoulWalletMobileError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_RESPONSE_ERROR, message);
  }
}

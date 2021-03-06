import { HttpError } from './http-error';
export class AuthenError extends HttpError {
   constructor(error: HttpError) {
      super();
      this.message = error.getMessage();
      this.statusCode = error.getStatusCode();
   }

   getMessage(): string {
      if (this.message.includes('does not exist')) {
         return 'Người này chưa có tài khoản trong hệ thống';
      }
      switch (this.message) {
         case 'Wrong credential':
            return 'Mật khẩu sai';
         default:
            return super.getDefaultMessage();
      }
   }
}

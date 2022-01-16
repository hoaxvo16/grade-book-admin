import { HttpError } from './http-error';
export class UserListError extends HttpError {
   constructor(error: HttpError) {
      super();
      this.message = error.getMessage();
      this.statusCode = error.getStatusCode();
   }

   getMessage(): string {
      if (this.message.includes('existed')) {
         return 'MSSV đã tồn tại';
      }
      switch (this.message) {
         case 'Wrong credential':
            return 'Mật khẩu sai';
         default:
            return super.getDefaultMessage();
      }
   }
}

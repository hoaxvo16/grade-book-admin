import { UserListError } from './../../shared/errors/user-list-error';
import { BaseViewModel } from 'shared/view-models';
import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';
import { makeObservable, observable, action } from 'mobx';
import { User } from 'shared/models';

class UserListViewModel extends BaseViewModel {
   userList: User[] = [];
   dataVersion: number = 0;
   pageNumber: number = 1;
   pageSize: number = 100;

   constructor() {
      super();
      makeObservable(this, {
         dataVersion: observable,
         trigger: action,
      });
   }

   updateUserList(users: User[]) {
      this.userList = this.userList.concat(users);
      this.trigger();
   }

   trigger() {
      this.dataVersion++;
   }

   async toggleLockUser(id: number, value: boolean) {
      this.startLoading();
      const res: HttpError | any = await httpService.sendPut(
         `/AdminApi/user/${id}/lockState`,
         { newLockState: value },
         httpService.getBearerToken()
      );

      if (res instanceof HttpError) {
         console.log('make error');
         this.makeError('Không thực hiện được hành động vui lòng thử lại sau');
      } else {
         await this.getUserList(this.pageNumber, this.pageSize);
      }
      this.stopLoading();
   }

   async getUserList(pageNumber: number, pageSize: number) {
      this.pageSize = pageSize;
      if (pageNumber !== this.pageNumber) {
         this.pageNumber = pageNumber;
      } else {
         this.userList = [];
      }
      const res: HttpError | any = await httpService.sendGet(
         `/AdminApi/user?numberPerPage=${pageSize}&pageNumber=${pageNumber}`,
         httpService.getBearerToken()
      );

      if (res instanceof HttpError) {
         this.makeError('Lỗi khi tải dữ liệu');
      } else {
         this.updateUserList(res.users);
      }
   }

   async changeStudentId(userId: number, studentId: string) {
      this.startLoading();
      const res = await httpService.sendPut(
         `/AdminApi/user/${userId}/studentIdentification`,
         {
            newStudentIdentification: studentId,
         },
         httpService.getBearerToken()
      );
      if (res instanceof HttpError) {
         const error = new UserListError(res);
         this.makeError(error.getMessage());
      } else {
         this.getUserList(this.pageNumber, this.pageSize);
      }
      this.stopLoading();
   }
}

export const userListViewModel = new UserListViewModel();

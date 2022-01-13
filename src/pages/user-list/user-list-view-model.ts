import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';
import { makeObservable, observable, action } from 'mobx';
import { User } from 'shared/models';

class UserListViewModel {
   userList: User[] = [];
   dataVersion: number = 0;
   pageNumber: number = 1;

   constructor() {
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

   async getUserList(pageNumber: number, pageSize: number) {
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
      } else {
         this.updateUserList(res.users);
      }
   }
}

export const userListViewModel = new UserListViewModel();

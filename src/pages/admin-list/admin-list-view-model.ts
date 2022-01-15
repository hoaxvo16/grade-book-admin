import { httpService } from 'shared/services';
import { AdminListError, HttpError } from 'shared/errors';
import { BaseViewModel } from 'shared/view-models';
import { makeObservable, observable, action } from 'mobx';
import { Admin } from 'shared/models';

class AdminListViewModel extends BaseViewModel {
   adminList: Admin[] = [];

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

   updateAdminList(list: Admin[]) {
      this.adminList = this.adminList.concat(list);
      this.trigger();
   }

   async addNewAdmin(
      username: string,
      password: string,
      isSuperAdmin: boolean
   ) {
      this.startLoading();

      const res = await httpService.sendPost(
         '/AdminApi/authentication/register',
         { username, password, isSuperAdmin },
         httpService.getBearerToken()
      );

      if (res instanceof HttpError) {
         const error = new AdminListError(res);
         this.makeError(error.getMessage());
      } else {
         await this.getAdminList(this.pageNumber, this.pageSize);
      }
      this.stopLoading();
   }

   async getAdminList(pageNumber: number, pageSize: number) {
      this.pageSize = pageSize;
      this.startLoading();
      if (pageNumber !== this.pageNumber) {
         this.pageNumber = pageNumber;
      } else {
         this.adminList = [];
      }
      const res: HttpError | any = await httpService.sendGet(
         `/AdminApi/adminAccount?numberPerPage=${pageSize}&pageNumber=${pageNumber}`,
         httpService.getBearerToken()
      );

      if (res instanceof HttpError) {
         this.makeError('Không thể tải dữ liệu');
      } else {
         this.updateAdminList(res.admins);
      }
      this.stopLoading();
   }

   trigger() {
      this.dataVersion++;
   }
}

export const adminListViewModel = new AdminListViewModel();

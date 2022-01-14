import { BaseViewModel } from 'shared/view-models';
import { ClassDetailInfo } from 'shared/models';
import { action, makeObservable, observable } from 'mobx';
import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';

class ClassListViewModel extends BaseViewModel {
   classList: ClassDetailInfo[] = [];
   dataVersion: number = 0;

   pageNumber: number = 1;

   constructor() {
      super();
      makeObservable(this, {
         dataVersion: observable,
         trigger: action,
      });
   }

   updateClassList(classes: ClassDetailInfo[]) {
      this.classList = this.classList.concat(classes);
      this.classList.sort((a, b) => {
         if (a.id > b.id) {
            return 1;
         }
         return -1;
      });
      this.trigger();
   }

   trigger() {
      this.dataVersion++;
   }

   async getClassList(pageNumber: number, pageSize: number) {
      this.startLoading();
      if (pageNumber !== this.pageNumber) {
         this.pageNumber = pageNumber;
      } else {
         this.classList = [];
      }
      const res: HttpError | any = await httpService.sendGet(
         `/AdminApi/class?numberPerPage=${pageSize}&pageNumber=${pageNumber}`,
         httpService.getBearerToken()
      );
      this.stopLoading();
      if (res instanceof HttpError) {
      } else {
         this.updateClassList(res.classes);
      }
   }
   async getSingleClass(classId: number) {
      this.startLoading();
      const res: ClassDetailInfo | HttpError = await httpService.sendGet(
         `/AdminApi/class/${classId}`,
         httpService.getBearerToken()
      );

      this.stopLoading();
      if (res instanceof HttpError) {
         return null;
      } else {
         return res;
      }
   }
}

export const classListViewModel = new ClassListViewModel();

import { ClassDetailInfo } from './../../shared/models/class-detail-info';
import { action, makeObservable, observable } from 'mobx';
import { httpService } from 'shared/services';
import { HttpError } from 'shared/errors';

class ClassListViewModel {
   classList: ClassDetailInfo[] = [];
   dataVersion: number = 0;

   pageNumber: number = 1;

   constructor() {
      makeObservable(this, {
         dataVersion: observable,
         trigger: action,
      });
   }

   updateClassList(classes: ClassDetailInfo[]) {
      this.classList = this.classList.concat(classes);
      this.trigger();
   }

   trigger() {
      this.dataVersion++;
   }

   async getClassList(pageNumber: number, pageSize: number) {
      if (pageNumber !== this.pageNumber) {
         this.pageNumber = pageNumber;
      } else {
         this.classList = [];
      }
      const res: HttpError | any = await httpService.sendGet(
         `/AdminApi/class?numberPerPage=${pageSize}&pageNumber=${pageNumber}`,
         httpService.getBearerToken()
      );

      if (res instanceof HttpError) {
      } else {
         this.updateClassList(res.classes);
      }
   }
}

export const classListViewModel = new ClassListViewModel();

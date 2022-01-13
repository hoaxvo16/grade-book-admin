import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TOKEN_KEY } from 'shared/constants';
import { HttpError } from 'shared/errors';
import { httpService, storageService } from 'shared/services';
import { UserStore } from 'shared/types';
import { userViewModel } from 'shared/view-models';
import { ErrorContainer } from './Error';

export const Authentication = observer(({ children }: any) => {
   const [isFinish, setIsFinish] = useState(false);
   const [isError, setIsError] = useState(false);
   const history = useHistory();
   useEffect(() => {
      const tryGetUser = async () => {
         userViewModel.startLoading();
         const token = storageService.getLocalStorage(TOKEN_KEY);

         if (token) {
            const response: UserStore | HttpError = await httpService.sendGet(
               '/User',
               httpService.getBearerToken()
            );
            if (response instanceof HttpError) {
               if (response.getStatusCode() === 401) {
                  storageService.clearUser();
                  setIsFinish(true);
               } else {
                  setIsError(true);
               }
            } else {
               userViewModel.updateUser(response);
               setIsFinish(true);
            }
         } else {
            setIsFinish(true);
         }
         userViewModel.stopLoading();
      };
      tryGetUser();
   }, [history]);

   const container = isError ? <ErrorContainer /> : <></>;

   return <>{isFinish ? children : container}</>;
});

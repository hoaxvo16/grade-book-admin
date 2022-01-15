import { Admin } from 'shared/models';
export type UserAuthen = {
   username?: string;
   password: string;
};

export type UserResponse = {
   admin: Admin;
   token: string;
};

export type UserStore = {
   defaultProfilePictureHex: string;
   email: string;
   firstName: string;
   lastName: string;
   profilePictureUrl: string;
   displayName: string;
   isPasswordNotSet: boolean;
   studentIdentification: string;
};

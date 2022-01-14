export class User {
   id: number = 0;
   role: 'TEACHER' | 'STUDENT' | null = null;
   email: string = '';
   firstName: string = '';
   lastName: string = '';
   displayName: string = '';
   studentIdentification: string | number | null = null;
   profilePictureUrl: string = '';
   defaultProfilePictureHex: string = '';
   isPasswordNotSet: boolean = false;
   isLocked: boolean = false;
   isEmailConfirmed: boolean = true;

   static map(user: User) {
      const temp = new User();
      temp.defaultProfilePictureHex = user.defaultProfilePictureHex;
      temp.displayName = user.displayName;
      temp.profilePictureUrl = user.profilePictureUrl;
      temp.firstName = user.firstName;
      temp.lastName = user.lastName;
      temp.email = user.email;
      temp.studentIdentification = user.studentIdentification;
      temp.role = user.role;
      temp.isPasswordNotSet = user.isPasswordNotSet;
      temp.isLocked = user.isLocked;
      temp.isEmailConfirmed = user.isEmailConfirmed;
      temp.id = user.id;
      return temp;
   }
}

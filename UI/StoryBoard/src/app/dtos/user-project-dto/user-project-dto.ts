export class UserProjectDto {
    id : number = 0;
    idUser : number = 0;
    idProject :number = 0;
    userType : string = "";
    availabilityTime : number = 0;

    static createFromFormValues(formValues: any): UserProjectDto {
        const userproject = new UserProjectDto();
        userproject.idUser = formValues.idUser;
        userproject.idProject = formValues.idProject;
        userproject.userType = formValues.userType;
        userproject.availabilityTime = formValues.availabilityTime;
        return userproject;
    }
}
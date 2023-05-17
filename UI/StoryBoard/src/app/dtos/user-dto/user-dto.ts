export class UserDto {
    id : number = 0;
    name : string = "";
    login : string = "";
    password : string = "";
    active : boolean = true;
    adm : boolean = true;

    static createFromFormValues(formValues: any): UserDto {
        const user = new UserDto();
        user.name = formValues.name;
        user.login = formValues.login;
        user.password = formValues.password;
        user.active = true;
        user.adm = false;
        return user;
    }
}
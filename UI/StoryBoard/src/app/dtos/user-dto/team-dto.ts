export class TeamDto {
    id : number = 0;
    userEmail : string = "";
    idProject : number = 0;
    userType : string = "";
    availabilityTime : number = 0;

    static createFromFormValues(formValues: any): TeamDto {
        const team = new TeamDto();
        team.userEmail = formValues.userEmail;
        team.idProject = formValues.idProject;
        team.userType = formValues.userType;
        team.availabilityTime = formValues.availabilityTime;
        return team;
    }
}
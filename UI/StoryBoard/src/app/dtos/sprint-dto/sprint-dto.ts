export class SprintDto {
    id : number = 0;
    name : string = "";
    description : string = "";
    creationDate : Date = new Date;
    initionDate : Date = new Date;
    endDate : Date = new Date;
    idProject: number = 0;

    static createFromFormValues(formValues: any): SprintDto {
        const sprint = new SprintDto();
        sprint.name = formValues.name;
        sprint.description = formValues.description;
        sprint.creationDate = formValues.creationDate;
        sprint.initionDate = formValues.initionDate;
        sprint.endDate = formValues.endDate;
        sprint.idProject = formValues.idProject;
        return sprint;
    }
}
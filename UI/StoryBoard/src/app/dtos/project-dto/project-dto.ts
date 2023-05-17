export class ProjectDto {
    id : number = 0;
    name : string = "";
    urlImage : string = "";
    creationDate : Date = new Date;
    description : string = "";

    static createFromFormValues(formValues: any): ProjectDto {
        const project = new ProjectDto();
        project.name = formValues.name;
        project.urlImage = formValues.urlImage;
        project.creationDate = new Date;
        project.description = formValues.description;
        return project;
    }
}
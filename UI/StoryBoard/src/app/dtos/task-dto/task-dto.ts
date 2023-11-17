export class TaskDto {
    id : number = 0;
    name : string = "";
    description : string = "";
    creationDate : Date = new Date;
    endDate : Date = new Date;
    durationTime : number = 0;
    status : string = "";
    idStory: number = 0;

    static createFromFormValues(formValues: any): TaskDto {
        const task = new TaskDto();
        task.id = formValues.id;
        task.name = formValues.name;
        task.description = formValues.description;
        task.creationDate = formValues.creationDate;
        // task.endDate = formValues.endDate;
        task.durationTime = formValues.durationTime;
        task.status = formValues.status;
        task.idStory = formValues.idStory;
        return task;
    }
}
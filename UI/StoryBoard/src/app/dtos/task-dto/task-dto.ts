export class TasktDto {
    id : number = 0;
    name : string = "";
    description : string = "";
    creationDate : Date = new Date;
    initionDate : Date = new Date;
    endDate : Date = new Date;
    DurationTime : number = 0;
    Status : string = "";
    idStory: number = 0;

    static createFromFormValues(formValues: any): TasktDto {
        const task = new TasktDto();
        task.name = formValues.name;
        task.description = formValues.description;
        task.creationDate = formValues.creationDate;
        task.initionDate = formValues.initionDate;
        task.endDate = formValues.endDate;
        task.DurationTime = formValues.DurationTime;
        task.Status = formValues.Status;
        task.idStory = formValues.idStory;
        return task;
    }
}
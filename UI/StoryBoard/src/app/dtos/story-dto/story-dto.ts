export class StoryDto {
    id : number = 0;
    name : string = "";
    description : string = "";
    creationDate : Date = new Date;
    idSprint: number = 0;

    static createFromFormValues(formValues: any): StoryDto {
        const story = new StoryDto();
        story.name = formValues.name;
        story.description = formValues.description;
        story.creationDate = formValues.creationDate;
        story.idSprint = formValues.idSprint;
        return story;
    }
}
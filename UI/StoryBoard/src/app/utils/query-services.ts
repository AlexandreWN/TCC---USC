import axios from 'axios';
import { UserDto } from '../dtos/user-dto/user-dto';
import { ProjectDto } from '../dtos/project-dto/project-dto';
import { UserProjectDto } from '../dtos/user-project-dto/user-project-dto';
import { SprintDto } from '../dtos/sprint-dto/sprint-dto';
import { StoryDto } from '../dtos/story-dto/story-dto';
import { TaskDto } from '../dtos/task-dto/task-dto';

export const MainApiBaseRoute ='https://localhost:7086';

export const EndpointUrl = {
  userProject: {
    getAllByUserId: (id: number, userType: string) => `${MainApiBaseRoute}/UserProject/getUserProjectsLikeUserId/${id}/${userType}`,
    register: () => `${MainApiBaseRoute}/UserProject/register`,
    //update: (id:  number)  =>  `${MainApiBaseRoute}/User/Update/${id}`
  },
  project: {
    getById: (id: number) => `${MainApiBaseRoute}/Project/getProjectLikeId/${id}`,
    register: () => `${MainApiBaseRoute}/Project/register`,
  },
  sprint: {
    register: () => `${MainApiBaseRoute}/Sprint/register`,
    getSprintLikeProjectId: (id:  number) =>  `${MainApiBaseRoute}/Sprint/getSprintLikeProjectId/${id}`
  },
  story: {
    register: () => `${MainApiBaseRoute}/Story/register`,
    getStoryBySprintId: (id: number) => `${MainApiBaseRoute}/Story/getStoryBySprintId/${id}`
  },

  task: {
    register: () => `${MainApiBaseRoute}/Task/register`,
    getTaskByStoryId: (id: number) => `${MainApiBaseRoute}/Task/getTaskByStoryId/${id}`,
    update: () => `${MainApiBaseRoute}/Task/updateTask`
  },

  user: {
    login: () => `${MainApiBaseRoute}/User/login`,
    register: () => `${MainApiBaseRoute}/User/register`,
  },
}

export const AxiosEndpoint = {
  userProject: {
    getAllByUserId:async (id : number, userType: string): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.userProject.getAllByUserId(id, userType));
      return response.data;
    },
    register:async (userProject: UserProjectDto) => {
      const requestBody = {
        idUser: userProject.idUser,
        idProject: userProject.idProject,
        userType: userProject.userType,
        availabilityTime: userProject.availabilityTime
      };
      let response = await axios.post(EndpointUrl.userProject.register(), requestBody);
      return response.data;
    }
  },

  project: {
    getById:async (id : number): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.project.getById(id));
      return response.data;
    },
    register:async (project: ProjectDto) => {
      const requestBody = {
        name: project.name,
        urlImage: project.urlImage,
        creationDate: project.creationDate,
        description: project.description
      };
      let response = await axios.post(EndpointUrl.project.register(), requestBody);
      return response.data;
    }
  },

  sprint: {
    getSprintLikeProjectId:async (id: number): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.sprint.getSprintLikeProjectId(id));
      return response.data;
    },
    register:async (sprint: SprintDto) => {
      const requestBody = {
        name : sprint.name,
        description : sprint.description,
        creationDate : sprint.creationDate,
        initionDate : sprint.initionDate,
        endDate : sprint.endDate,
        idProject: sprint.idProject
      };
      let response = await axios.post(EndpointUrl.sprint.register(), requestBody);
      return response.data;
    }
  },

  story: {
    getStoryBySprintId:async (id: number): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.story.getStoryBySprintId(id));
      return response.data;
    },
    register:async (story: StoryDto) => {
      const requestBody = {
        name : story.name,
        description : story.description,
        creationDate : story.creationDate,
        idSprint: story.idSprint
      };
      let response = await axios.post(EndpointUrl.story.register(), requestBody);
      return response.data;
    }
  },

  task: {
    getTaskByStoryId:async (id: number): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.task.getTaskByStoryId(id));
      return response.data;
    },
    register:async (task: TaskDto) => {
      const requestBody = {
        name : task.name,
        description : task.description,
        creationDate : task.creationDate,
        durationTime : task.durationTime,
        status : task.status,
        idStory: task.idStory
      };
      let response = await axios.post(EndpointUrl.task.register(), requestBody);
      return response.data;
    },
    update:async (obj: TaskDto): Promise<Array<any>> => {
      let response = await axios.put(EndpointUrl.task.update(), obj);
      return response.data;
    }
  },

  user: {
    login:async (login: string, password: string): Promise<Array<any>> => {
      const requestBody = {
        login: login,
        password: password
      };
      let response = await axios.post(EndpointUrl.user.login(), requestBody);
      return response.data;
    },
    register:async (user: UserDto) => {
      const requestBody = {
        name: user.name,
        login: user.password,
        password: user.password,
        active: true,
        adm: false
      };
      let response = await axios.post(EndpointUrl.user.register(), requestBody);
      return response.data;
    }
  }
}
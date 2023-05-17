import axios from 'axios';
import { UserDto } from '../dtos/user-dto/user-dto';
import { ProjectDto } from '../dtos/project-dto/project-dto';
import { UserProjectDto } from '../dtos/user-project-dto/user-project-dto';

export const MainApiBaseRoute ='https://localhost:7147';

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
  user: {
    login: () => `${MainApiBaseRoute}/User/login`,
    register: () => `${MainApiBaseRoute}/User/register`,
  }
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
  user: {
    login: async (login: string, password: string): Promise<Array<any>> => {
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
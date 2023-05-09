import axios from 'axios';
import { async } from 'rxjs';

export const MainApiBaseRoute ='https://localhost:7147';

export const EndpointUrl = {
  userProject: {
    getAllByUserId: (id: number, userType: string) => `${MainApiBaseRoute}/UserProjectProject/getUserProjectsLikeUserId/${id}/${userType}`,
    
    //update: (id:  number)  =>  `${MainApiBaseRoute}/User/Update/${id}`
  },
  project: {
    getById: (id: number) => `${MainApiBaseRoute}/Project/getProjectLikeId/${id}`,
  }
}

export const AxiosEndpoint = {
  userProject: {
    getAllByUserId:async (id : number, userType: string): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.userProject.getAllByUserId(id, userType));
      return response.data;
    }
  },
  project: {
    getById:async (id : number): Promise<Array<any>> => {
      let response = await axios.get(EndpointUrl.project.getById(id));
      return response.data;
    }
  }
}
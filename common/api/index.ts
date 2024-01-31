import axios from 'axios';
import { Configuration, LoginApi } from './../../httpClient';

const axiosInstance = axios.create({
  baseURL: 'https://cocreateapi.azurewebsites.net/api',
});

const config = new Configuration({
  basePath: 'https://cocreateapi.azurewebsites.net/api',
  baseOptions: {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});


// export const Login = new LoginApi(config, "https://cocreateapi.azurewebsites.net/api", axiosInstance);
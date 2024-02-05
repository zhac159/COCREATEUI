import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as SecureStore from 'expo-secure-store';

// export const AXIOS_INSTANCE = Axios.create({
//   baseURL: "https://cocreateapi.azurewebsites.net",
// });

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://192.168.1.92:5000",
});

AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  
  // Get the token from SecureStore
  const token = await SecureStore.getItemAsync('userToken');
  
  // If the token exists, add it to the Authorization header
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  
  return request;
});

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config }).then(
    ({ data }: { data: ApiResponse<T> }) => {
      console.log("Response", JSON.stringify(data, null, 2));
      if (!data.success) {
        throw new Error(data.error || "Unknown error");
      }
      return data.data as T;
    }
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by Vue Query");
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}

import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: 'https://cocreateapi.azurewebsites.net' });

AXIOS_INSTANCE.interceptors.request.use((request) => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});


export interface ApiResponse<T> {
  Success: boolean;
  Data: T | null;
  Error: string | null;
}



export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config }).then(
    ({ data }: { data: ApiResponse<T> }) => {
      if (!data.Success) {
        throw new Error(data.Error || 'Unknown error');
      }
      return data.Data as T;
    },
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by Vue Query');
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
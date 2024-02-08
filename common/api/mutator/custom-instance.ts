import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

// export const AXIOS_INSTANCE = Axios.create({
//   baseURL: "https://cocreateapi.azurewebsites.net",
// });

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://192.168.1.92:5000",
});

AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));

  const token = await SecureStore.getItemAsync("userToken");

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

export interface ResponseErrorType {
  code: string | undefined;
  message: string;
}

class CustomError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}


export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    validateStatus: function (status) {
      return status < 500;
    },
  }).then(
    ({ data, status }: { data: ApiResponse<T>, status: number }) => {
      console.log("Response", JSON.stringify(data, null, 2));
      if (!data.success) {
        throw new CustomError(data.error || "Unknown error", status.toString());
      }
      return data.data as T;
    }
  ).catch((error: AxiosError) => {
    // Ensure the error is of type ResponseErrorType
    const responseError: ResponseErrorType = {
      code: 'code' in error ? error.code : error.response?.status.toString(),
      message: error.message || "Unknown error"
    };
    throw responseError;
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by Vue Query");
  };

  return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}

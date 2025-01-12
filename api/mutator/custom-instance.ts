import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import BackEndErrors from "../../common/constants/backEndErrors";
import SecureStoreKeys from "../../common/constants/secureStoreKeys";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));

  const token = await SecureStore.getItemAsync(SecureStoreKeys.USER_TOKEN);

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
  code: string;
  message: BackEndErrors;
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
  })
    .then(({ data, status }: { data: ApiResponse<T>; status: number }) => {
      console.log("Response", JSON.stringify(data, null, 2));
      if (!data.success) {
        throw new CustomError(data.error || "Unknown error", status.toString());
      }
      return data.data as T;
    })
    .catch((error: AxiosError) => {
      console.log("Error", error.message);

      const responseError: ResponseErrorType = {
        code: error.code || "500",
        message: BackEndErrors[error.message as keyof typeof BackEndErrors],
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

export type ErrorType<ErrorData> = ResponseErrorType;

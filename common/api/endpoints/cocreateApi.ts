/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * CoCreateAPI
 * OpenAPI spec version: v1
 */
import {
  useMutation,
  useQuery
} from 'react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult
} from 'react-query'
import type {
  AssetDTO,
  LoginResponseDTO,
  PortofolioContentDTO,
  PostApiAssetBody,
  PostApiPortofolioContentBody,
  PutApiAssetBody,
  PutApiAssetParams,
  PutApiPortofolioContentBody,
  PutApiPortofolioContentParams,
  SkillDTO,
  SkillUpdateDTO,
  UserCreateDTO,
  UserDTO,
  UserLocationDTO,
  UserLocationUpdateDTO,
  UserLoginDTO,
  UserUpdateDTO
} from '../model'
import { customInstance } from '../mutator/custom-instance';
import type { ErrorType } from '../mutator/custom-instance';
import { customFormData } from '../mutator/custom-form-data';



export const postApiAsset = (
    postApiAssetBody: PostApiAssetBody,
 ) => {
      
      const formData = customFormData(postApiAssetBody)
      return customInstance<AssetDTO>(
      {url: `/api/Asset`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData
    },
      );
    }
  


export const getPostApiAssetMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAsset>>, TError,{data: PostApiAssetBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAsset>>, TError,{data: PostApiAssetBody}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAsset>>, {data: PostApiAssetBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiAsset(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostApiAssetMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAsset>>>
    export type PostApiAssetMutationBody = PostApiAssetBody
    export type PostApiAssetMutationError = ErrorType<unknown>

    export const usePostApiAsset = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAsset>>, TError,{data: PostApiAssetBody}, TContext>, }
) => {

      const mutationOptions = getPostApiAssetMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const putApiAsset = (
    putApiAssetBody: PutApiAssetBody,
    params?: PutApiAssetParams,
 ) => {
      
      const formData = customFormData(putApiAssetBody)
      return customInstance<AssetDTO>(
      {url: `/api/Asset`, method: 'PUT',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData,
        params
    },
      );
    }
  


export const getPutApiAssetMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiAsset>>, TError,{data: PutApiAssetBody;params?: PutApiAssetParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiAsset>>, TError,{data: PutApiAssetBody;params?: PutApiAssetParams}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiAsset>>, {data: PutApiAssetBody;params?: PutApiAssetParams}> = (props) => {
          const {data,params} = props ?? {};

          return  putApiAsset(data,params,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutApiAssetMutationResult = NonNullable<Awaited<ReturnType<typeof putApiAsset>>>
    export type PutApiAssetMutationBody = PutApiAssetBody
    export type PutApiAssetMutationError = ErrorType<unknown>

    export const usePutApiAsset = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiAsset>>, TError,{data: PutApiAssetBody;params?: PutApiAssetParams}, TContext>, }
) => {

      const mutationOptions = getPutApiAssetMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const deleteApiAssetId = (
    id: number,
 ) => {
      
      
      return customInstance<Boolean>(
      {url: `/api/Asset/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiAssetIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiAssetId>>, TError,{id: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiAssetId>>, TError,{id: number}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiAssetId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiAssetId(id,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type DeleteApiAssetIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiAssetId>>>
    
    export type DeleteApiAssetIdMutationError = ErrorType<unknown>

    export const useDeleteApiAssetId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiAssetId>>, TError,{id: number}, TContext>, }
) => {

      const mutationOptions = getDeleteApiAssetIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const postApiLogin = (
    userLoginDTO: UserLoginDTO,
 ) => {
      
      
      return customInstance<LoginResponseDTO>(
      {url: `/api/Login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: userLoginDTO
    },
      );
    }
  


export const getPostApiLoginMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiLogin>>, TError,{data: UserLoginDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiLogin>>, TError,{data: UserLoginDTO}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiLogin>>, {data: UserLoginDTO}> = (props) => {
          const {data} = props ?? {};

          return  postApiLogin(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostApiLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiLogin>>>
    export type PostApiLoginMutationBody = UserLoginDTO
    export type PostApiLoginMutationError = ErrorType<unknown>

    export const usePostApiLogin = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiLogin>>, TError,{data: UserLoginDTO}, TContext>, }
) => {

      const mutationOptions = getPostApiLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const postApiLoginRegister = (
    userCreateDTO: UserCreateDTO,
 ) => {
      
      
      return customInstance<LoginResponseDTO>(
      {url: `/api/Login/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: userCreateDTO
    },
      );
    }
  


export const getPostApiLoginRegisterMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiLoginRegister>>, TError,{data: UserCreateDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiLoginRegister>>, TError,{data: UserCreateDTO}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiLoginRegister>>, {data: UserCreateDTO}> = (props) => {
          const {data} = props ?? {};

          return  postApiLoginRegister(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostApiLoginRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof postApiLoginRegister>>>
    export type PostApiLoginRegisterMutationBody = UserCreateDTO
    export type PostApiLoginRegisterMutationError = ErrorType<unknown>

    export const usePostApiLoginRegister = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiLoginRegister>>, TError,{data: UserCreateDTO}, TContext>, }
) => {

      const mutationOptions = getPostApiLoginRegisterMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const postApiPortofolioContent = (
    postApiPortofolioContentBody: PostApiPortofolioContentBody,
 ) => {
      
      const formData = customFormData(postApiPortofolioContentBody)
      return customInstance<PortofolioContentDTO>(
      {url: `/api/PortofolioContent`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData
    },
      );
    }
  


export const getPostApiPortofolioContentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiPortofolioContent>>, TError,{data: PostApiPortofolioContentBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiPortofolioContent>>, TError,{data: PostApiPortofolioContentBody}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiPortofolioContent>>, {data: PostApiPortofolioContentBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiPortofolioContent(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PostApiPortofolioContentMutationResult = NonNullable<Awaited<ReturnType<typeof postApiPortofolioContent>>>
    export type PostApiPortofolioContentMutationBody = PostApiPortofolioContentBody
    export type PostApiPortofolioContentMutationError = ErrorType<unknown>

    export const usePostApiPortofolioContent = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiPortofolioContent>>, TError,{data: PostApiPortofolioContentBody}, TContext>, }
) => {

      const mutationOptions = getPostApiPortofolioContentMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const putApiPortofolioContent = (
    putApiPortofolioContentBody: PutApiPortofolioContentBody,
    params?: PutApiPortofolioContentParams,
 ) => {
      
      const formData = customFormData(putApiPortofolioContentBody)
      return customInstance<PortofolioContentDTO>(
      {url: `/api/PortofolioContent`, method: 'PUT',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData,
        params
    },
      );
    }
  


export const getPutApiPortofolioContentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiPortofolioContent>>, TError,{data: PutApiPortofolioContentBody;params?: PutApiPortofolioContentParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiPortofolioContent>>, TError,{data: PutApiPortofolioContentBody;params?: PutApiPortofolioContentParams}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiPortofolioContent>>, {data: PutApiPortofolioContentBody;params?: PutApiPortofolioContentParams}> = (props) => {
          const {data,params} = props ?? {};

          return  putApiPortofolioContent(data,params,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutApiPortofolioContentMutationResult = NonNullable<Awaited<ReturnType<typeof putApiPortofolioContent>>>
    export type PutApiPortofolioContentMutationBody = PutApiPortofolioContentBody
    export type PutApiPortofolioContentMutationError = ErrorType<unknown>

    export const usePutApiPortofolioContent = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiPortofolioContent>>, TError,{data: PutApiPortofolioContentBody;params?: PutApiPortofolioContentParams}, TContext>, }
) => {

      const mutationOptions = getPutApiPortofolioContentMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const deleteApiPortofolioContentId = (
    id: number,
 ) => {
      
      
      return customInstance<Boolean>(
      {url: `/api/PortofolioContent/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteApiPortofolioContentIdMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiPortofolioContentId>>, TError,{id: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteApiPortofolioContentId>>, TError,{id: number}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiPortofolioContentId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteApiPortofolioContentId(id,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type DeleteApiPortofolioContentIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiPortofolioContentId>>>
    
    export type DeleteApiPortofolioContentIdMutationError = ErrorType<unknown>

    export const useDeleteApiPortofolioContentId = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteApiPortofolioContentId>>, TError,{id: number}, TContext>, }
) => {

      const mutationOptions = getDeleteApiPortofolioContentIdMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const getApiUserUserId = (
    userId: number,
 signal?: AbortSignal
) => {
      
      
      return customInstance<UserDTO>(
      {url: `/api/User/${userId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetApiUserUserIdQueryKey = (userId: number,) => {
    return [`/api/User/${userId}`] as const;
    }

    
export const getGetApiUserUserIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiUserUserId>>, TError = ErrorType<unknown>>(userId: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getApiUserUserId>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUserUserIdQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUserUserId>>> = ({ signal }) => getApiUserUserId(userId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiUserUserId>>, TError, TData> & { queryKey: QueryKey }
}

export type GetApiUserUserIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUserUserId>>>
export type GetApiUserUserIdQueryError = ErrorType<unknown>

export const useGetApiUserUserId = <TData = Awaited<ReturnType<typeof getApiUserUserId>>, TError = ErrorType<unknown>>(
 userId: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getApiUserUserId>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetApiUserUserIdQueryOptions(userId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const putApiUser = (
    userUpdateDTO: UserUpdateDTO,
 ) => {
      
      
      return customInstance<UserDTO>(
      {url: `/api/User`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: userUpdateDTO
    },
      );
    }
  


export const getPutApiUserMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUser>>, TError,{data: UserUpdateDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiUser>>, TError,{data: UserUpdateDTO}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiUser>>, {data: UserUpdateDTO}> = (props) => {
          const {data} = props ?? {};

          return  putApiUser(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutApiUserMutationResult = NonNullable<Awaited<ReturnType<typeof putApiUser>>>
    export type PutApiUserMutationBody = UserUpdateDTO
    export type PutApiUserMutationError = ErrorType<unknown>

    export const usePutApiUser = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUser>>, TError,{data: UserUpdateDTO}, TContext>, }
) => {

      const mutationOptions = getPutApiUserMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const putApiUserSkills = (
    skillUpdateDTO: SkillUpdateDTO[],
 ) => {
      
      
      return customInstance<SkillDTO>(
      {url: `/api/User/skills`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: skillUpdateDTO
    },
      );
    }
  


export const getPutApiUserSkillsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUserSkills>>, TError,{data: SkillUpdateDTO[]}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiUserSkills>>, TError,{data: SkillUpdateDTO[]}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiUserSkills>>, {data: SkillUpdateDTO[]}> = (props) => {
          const {data} = props ?? {};

          return  putApiUserSkills(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutApiUserSkillsMutationResult = NonNullable<Awaited<ReturnType<typeof putApiUserSkills>>>
    export type PutApiUserSkillsMutationBody = SkillUpdateDTO[]
    export type PutApiUserSkillsMutationError = ErrorType<unknown>

    export const usePutApiUserSkills = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUserSkills>>, TError,{data: SkillUpdateDTO[]}, TContext>, }
) => {

      const mutationOptions = getPutApiUserSkillsMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const putApiUserLocation = (
    userLocationUpdateDTO: UserLocationUpdateDTO,
 ) => {
      
      
      return customInstance<UserLocationDTO>(
      {url: `/api/User/location`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: userLocationUpdateDTO
    },
      );
    }
  


export const getPutApiUserLocationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUserLocation>>, TError,{data: UserLocationUpdateDTO}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putApiUserLocation>>, TError,{data: UserLocationUpdateDTO}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiUserLocation>>, {data: UserLocationUpdateDTO}> = (props) => {
          const {data} = props ?? {};

          return  putApiUserLocation(data,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type PutApiUserLocationMutationResult = NonNullable<Awaited<ReturnType<typeof putApiUserLocation>>>
    export type PutApiUserLocationMutationBody = UserLocationUpdateDTO
    export type PutApiUserLocationMutationError = ErrorType<unknown>

    export const usePutApiUserLocation = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putApiUserLocation>>, TError,{data: UserLocationUpdateDTO}, TContext>, }
) => {

      const mutationOptions = getPutApiUserLocationMutationOptions(options);

      return useMutation(mutationOptions);
    }
    

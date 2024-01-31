// import { ZodSchema, z } from "zod";

// export const setAuthorizationHeader = (token?: string) =>
//   token
//     ? {
//         Authorization: `Bearer ${token}`,
//       }
//     : undefined;

// export type RequestReturnType<T, U> = U extends undefined ? T : U;

// export const apiDomain = "https://cocreateapi.azurewebsites.net/api";

// export const generateUrl = (
//   endpoint: string,
//   queryStringParams?: Record<string, string>
// ) => {
//   const url = new URL(apiDomain, endpoint);
//   if (queryStringParams) {
//     Object.entries(queryStringParams).forEach(([key, value]) => {
//       url.searchParams.append(key, value);
//     });
//   }
//   return url.toString();
// };

// const ApiResponseSchema = z.object({
//   success: z.boolean(),
//   data: z.unknown(), // We'll validate this field with the provided Zod schema
//   error: z.string().nullable(),
// });

// async function parseResponse<T>(response: Response, zodSchema: ZodSchema<T>) {
//   const responseData = await response.json();

//   const parsedResponse = ApiResponseSchema.parse(responseData);

//   if (!parsedResponse.success) {
//     throw new Error(parsedResponse.error || "Unknown error");
//   }

//   const data = zodSchema.parse(parsedResponse.data);

//   return data;
// }

// export const apiRequest = async <T, U = T>({
//   endpoint,
//   body,
//   options,
//   token,
//   queryStringParams,
//   zodSchema,
// }: {
//   endpoint: string;
//   body?: U;
//   options?: RequestInit;
//   token?: string;
//   queryStringParams?: Record<string, string>;
//   zodSchema: ZodSchema<T>;
// }) => {
//   const { headers, method, ...remainingOptions } = options || {};

//   const response = await fetch(generateUrl(endpoint, queryStringParams), {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...headers,
//       ...setAuthorizationHeader(token),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//     ...remainingOptions,
//   });

//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   const data = parseResponse(response, zodSchema);

//   return data;
// };

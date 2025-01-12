import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "split",
      target: "api/endpoints/cocreateApi.ts",
      schemas: "api/model",
      client: "react-query",
      allParamsOptional: false,
      optionsParamRequired: false,
      override: {
        mutator: {
          path: "./api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        formData: {
          path: './api/mutator/custom-form-data.ts',
          name: 'customFormData',
        },
        operations: {
          cocreateApi: {
            query: {
              useQuery: true,
              useSuspenseQuery: true,
              useSuspenseInfiniteQuery: true,
              useInfinite: true,
              useInfiniteQueryParam: "limit",
            },
          },
        },
      },
    },
    input: {
      target: "./swagger.json",
    },
  },
  zod: {
    output: {
      client: 'zod',
      mode: 'single',
      target: './api/zod',
    },
    input: {
      target: './swagger.json',
    },
  },
});
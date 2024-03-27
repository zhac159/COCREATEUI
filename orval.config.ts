import { faker } from "@faker-js/faker";
import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "split",
      target: "common/api/endpoints/cocreateApi.ts",
      schemas: "common/api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "./common/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        formData: {
          path: './common/api/mutator/custom-form-data.ts',
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
});

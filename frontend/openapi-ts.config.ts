import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi.json",
  output: "./src/client",
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "../api/axiosInstance.ts",
      bundle: false,
    },
    {
      name: "@hey-api/sdk",
      asClass: true,
      operations: {
        strategy: "byTags",
        methodName: (name: string) => {
          let processed = name
          const tags = ["login", "users", "utils", "items", "private"]
          for (const tag of tags) {
            if (processed.toLowerCase().startsWith(tag.toLowerCase())) {
              processed = processed.slice(tag.length)
              break
            }
          }
          return processed.charAt(0).toLowerCase() + processed.slice(1)
        },
        containerName: (name: string) => `${name}Service`,
      },
    },
    {
      name: "@hey-api/schemas",
      type: "json",
    },
  ],
})

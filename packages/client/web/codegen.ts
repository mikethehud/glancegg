import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: '../../../schema/*.graphqls',
  documents: ['./lib/graphql/queries/*.graphql', './lib/graphql/mutations/*.graphql'],
  generates: {
    './lib/graphql/generated/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}
export default config
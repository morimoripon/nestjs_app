import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['app/**/*.{ts,tsx}'],
  generates: {
    './graphql/generated/': {
      preset: 'client'
    }
  }
}

export default config

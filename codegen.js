module.exports = {
    overwrite: true,
    schema: './graphql/schema.js',
    watch: true,
    documents: ['./client/src/graphql-api/*.graphql'],
    generates: {
        './client/src/graphql-api/index.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: true,
                withHooks: true,
                withHOC: false,
                withComponent: false,
                apolloReactHooksImportFrom: '@apollo/client'
            }
        },
        './graphql/intro-schema.json': {
            plugins: [
                'introspection'
            ]
        }
    }
}
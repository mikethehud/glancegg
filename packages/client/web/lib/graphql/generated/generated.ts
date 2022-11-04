import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LogInInput = {
  userEmail: Scalars['String'];
  userPassword: Scalars['String'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  authToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: LogInResponse;
  signUp: User;
};


export type MutationLogInArgs = {
  input: LogInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authToken: Scalars['String'];
  organization: Organization;
};

export type SignUpInput = {
  organizationName: Scalars['String'];
  userEmail: Scalars['String'];
  userName: Scalars['String'];
  userPassword: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LogInMutationVariables = Exact<{
  input: LogInInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'LogInResponse', authToken: string, user: { __typename?: 'User', id: string, email: string } } };

export type GetAuthTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthTokenQuery = { __typename?: 'Query', authToken: string };

export type GetOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', name: string } };


export const LogInDocument = gql`
    mutation LogIn($input: LogInInput!) {
  logIn(input: $input) {
    user {
      id
      email
    }
    authToken
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const GetAuthTokenDocument = gql`
    query GetAuthToken {
  authToken
}
    `;

/**
 * __useGetAuthTokenQuery__
 *
 * To run a query within a React component, call `useGetAuthTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthTokenQuery, GetAuthTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthTokenQuery, GetAuthTokenQueryVariables>(GetAuthTokenDocument, options);
      }
export function useGetAuthTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthTokenQuery, GetAuthTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthTokenQuery, GetAuthTokenQueryVariables>(GetAuthTokenDocument, options);
        }
export type GetAuthTokenQueryHookResult = ReturnType<typeof useGetAuthTokenQuery>;
export type GetAuthTokenLazyQueryHookResult = ReturnType<typeof useGetAuthTokenLazyQuery>;
export type GetAuthTokenQueryResult = Apollo.QueryResult<GetAuthTokenQuery, GetAuthTokenQueryVariables>;
export const GetOrganizationDocument = gql`
    query GetOrganization {
  organization {
    name
  }
}
    `;

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
      }
export function useGetOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>;
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>;
export type GetOrganizationQueryResult = Apollo.QueryResult<GetOrganizationQuery, GetOrganizationQueryVariables>;
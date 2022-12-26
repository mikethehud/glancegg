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

export type CreateOrganizationAndJoinInput = {
  name: Scalars['String'];
};

export type LogInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganizationAndJoin: User;
  deleteOrganization?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  leaveOrganization?: Maybe<Scalars['Boolean']>;
  logIn: Scalars['String'];
  logOut?: Maybe<Scalars['Boolean']>;
  removeUserFromOrganization: Organization;
  signUpWithOrg: Scalars['String'];
  signUpWithoutOrg: Scalars['String'];
  updateUserPermissions: User;
};


export type MutationCreateOrganizationAndJoinArgs = {
  input: CreateOrganizationAndJoinInput;
};


export type MutationLogInArgs = {
  input: LogInInput;
};


export type MutationRemoveUserFromOrganizationArgs = {
  userID: Scalars['ID'];
};


export type MutationSignUpWithOrgArgs = {
  input: SignUpWithOrgInput;
};


export type MutationSignUpWithoutOrgArgs = {
  input: SignUpWithoutOrgInput;
};


export type MutationUpdateUserPermissionsArgs = {
  input: UpdateUserPermissionsInput;
  userID: Scalars['ID'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
};

export type OrganizationInfo = {
  __typename?: 'OrganizationInfo';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authToken: Scalars['String'];
  getUsersReportingTo?: Maybe<Array<User>>;
  organization?: Maybe<Organization>;
  organizationInfo: OrganizationInfo;
  user: User;
};


export type QueryOrganizationInfoArgs = {
  id: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignUpWithOrgInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  organizationID: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpWithoutOrgInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  organizationName: Scalars['String'];
  password: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateUserPermissionsInput = {
  reportsTo?: InputMaybe<Scalars['ID']>;
  role?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  organization?: Maybe<Organization>;
  reportsTo?: Maybe<Scalars['ID']>;
  role: Role;
};

export type BaseUserDataFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null };

export type OrgWithMembersFragment = { __typename?: 'Organization', id: string, name: string, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> };

export type CreateOrganizationAndJoinMutationVariables = Exact<{
  input: CreateOrganizationAndJoinInput;
}>;


export type CreateOrganizationAndJoinMutation = { __typename?: 'Mutation', createOrganizationAndJoin: { __typename?: 'User', id: string, role: Role, organization?: { __typename?: 'Organization', id: string, name: string, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null } };

export type DeleteOrganizationMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: boolean | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: boolean | null };

export type LeaveOrganizationMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveOrganizationMutation = { __typename?: 'Mutation', leaveOrganization?: boolean | null };

export type LogInMutationVariables = Exact<{
  input: LogInInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: string };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut?: boolean | null };

export type RemoveUserFromOrganizationMutationVariables = Exact<{
  userID: Scalars['ID'];
}>;


export type RemoveUserFromOrganizationMutation = { __typename?: 'Mutation', removeUserFromOrganization: { __typename?: 'Organization', id: string, name: string, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } };

export type SignUpWithoutOrgMutationVariables = Exact<{
  input: SignUpWithoutOrgInput;
}>;


export type SignUpWithoutOrgMutation = { __typename?: 'Mutation', signUpWithoutOrg: string };

export type SignUpWithOrgMutationVariables = Exact<{
  input: SignUpWithOrgInput;
}>;


export type SignUpWithOrgMutation = { __typename?: 'Mutation', signUpWithOrg: string };

export type UpdateUserPermissionsMutationVariables = Exact<{
  userID: Scalars['ID'];
  input: UpdateUserPermissionsInput;
}>;


export type UpdateUserPermissionsMutation = { __typename?: 'Mutation', updateUserPermissions: { __typename?: 'User', id: string, role: Role, reportsTo?: string | null } };

export type GetAuthTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthTokenQuery = { __typename?: 'Query', authToken: string };

export type GetOrganizationAndMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationAndMembersQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: string, name: string, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null };

export type GetOrganizationInfoQueryVariables = Exact<{
  orgID: Scalars['String'];
}>;


export type GetOrganizationInfoQuery = { __typename?: 'Query', organizationInfo: { __typename?: 'OrganizationInfo', id: string, name: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null, organization?: { __typename?: 'Organization', id: string, name: string, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null } };

export const BaseUserDataFragmentDoc = gql`
    fragment BaseUserData on User {
  id
  firstName
  lastName
  email
  role
  reportsTo
}
    `;
export const OrgWithMembersFragmentDoc = gql`
    fragment OrgWithMembers on Organization {
  id
  name
  members {
    ...BaseUserData
  }
}
    ${BaseUserDataFragmentDoc}`;
export const CreateOrganizationAndJoinDocument = gql`
    mutation CreateOrganizationAndJoin($input: CreateOrganizationAndJoinInput!) {
  createOrganizationAndJoin(input: $input) {
    id
    role
    organization {
      ...OrgWithMembers
    }
  }
}
    ${OrgWithMembersFragmentDoc}`;
export type CreateOrganizationAndJoinMutationFn = Apollo.MutationFunction<CreateOrganizationAndJoinMutation, CreateOrganizationAndJoinMutationVariables>;

/**
 * __useCreateOrganizationAndJoinMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationAndJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationAndJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationAndJoinMutation, { data, loading, error }] = useCreateOrganizationAndJoinMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationAndJoinMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationAndJoinMutation, CreateOrganizationAndJoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationAndJoinMutation, CreateOrganizationAndJoinMutationVariables>(CreateOrganizationAndJoinDocument, options);
      }
export type CreateOrganizationAndJoinMutationHookResult = ReturnType<typeof useCreateOrganizationAndJoinMutation>;
export type CreateOrganizationAndJoinMutationResult = Apollo.MutationResult<CreateOrganizationAndJoinMutation>;
export type CreateOrganizationAndJoinMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationAndJoinMutation, CreateOrganizationAndJoinMutationVariables>;
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization {
  deleteOrganization
}
    `;
export type DeleteOrganizationMutationFn = Apollo.MutationFunction<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;

/**
 * __useDeleteOrganizationMutation__
 *
 * To run a mutation, you first call `useDeleteOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrganizationMutation, { data, loading, error }] = useDeleteOrganizationMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, options);
      }
export type DeleteOrganizationMutationHookResult = ReturnType<typeof useDeleteOrganizationMutation>;
export type DeleteOrganizationMutationResult = Apollo.MutationResult<DeleteOrganizationMutation>;
export type DeleteOrganizationMutationOptions = Apollo.BaseMutationOptions<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LeaveOrganizationDocument = gql`
    mutation LeaveOrganization {
  leaveOrganization
}
    `;
export type LeaveOrganizationMutationFn = Apollo.MutationFunction<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>;

/**
 * __useLeaveOrganizationMutation__
 *
 * To run a mutation, you first call `useLeaveOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveOrganizationMutation, { data, loading, error }] = useLeaveOrganizationMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>(LeaveOrganizationDocument, options);
      }
export type LeaveOrganizationMutationHookResult = ReturnType<typeof useLeaveOrganizationMutation>;
export type LeaveOrganizationMutationResult = Apollo.MutationResult<LeaveOrganizationMutation>;
export type LeaveOrganizationMutationOptions = Apollo.BaseMutationOptions<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LogInInput!) {
  logIn(input: $input)
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
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const RemoveUserFromOrganizationDocument = gql`
    mutation RemoveUserFromOrganization($userID: ID!) {
  removeUserFromOrganization(userID: $userID) {
    ...OrgWithMembers
  }
}
    ${OrgWithMembersFragmentDoc}`;
export type RemoveUserFromOrganizationMutationFn = Apollo.MutationFunction<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>;

/**
 * __useRemoveUserFromOrganizationMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromOrganizationMutation, { data, loading, error }] = useRemoveUserFromOrganizationMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveUserFromOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>(RemoveUserFromOrganizationDocument, options);
      }
export type RemoveUserFromOrganizationMutationHookResult = ReturnType<typeof useRemoveUserFromOrganizationMutation>;
export type RemoveUserFromOrganizationMutationResult = Apollo.MutationResult<RemoveUserFromOrganizationMutation>;
export type RemoveUserFromOrganizationMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>;
export const SignUpWithoutOrgDocument = gql`
    mutation SignUpWithoutOrg($input: SignUpWithoutOrgInput!) {
  signUpWithoutOrg(input: $input)
}
    `;
export type SignUpWithoutOrgMutationFn = Apollo.MutationFunction<SignUpWithoutOrgMutation, SignUpWithoutOrgMutationVariables>;

/**
 * __useSignUpWithoutOrgMutation__
 *
 * To run a mutation, you first call `useSignUpWithoutOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithoutOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithoutOrgMutation, { data, loading, error }] = useSignUpWithoutOrgMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpWithoutOrgMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithoutOrgMutation, SignUpWithoutOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpWithoutOrgMutation, SignUpWithoutOrgMutationVariables>(SignUpWithoutOrgDocument, options);
      }
export type SignUpWithoutOrgMutationHookResult = ReturnType<typeof useSignUpWithoutOrgMutation>;
export type SignUpWithoutOrgMutationResult = Apollo.MutationResult<SignUpWithoutOrgMutation>;
export type SignUpWithoutOrgMutationOptions = Apollo.BaseMutationOptions<SignUpWithoutOrgMutation, SignUpWithoutOrgMutationVariables>;
export const SignUpWithOrgDocument = gql`
    mutation SignUpWithOrg($input: SignUpWithOrgInput!) {
  signUpWithOrg(input: $input)
}
    `;
export type SignUpWithOrgMutationFn = Apollo.MutationFunction<SignUpWithOrgMutation, SignUpWithOrgMutationVariables>;

/**
 * __useSignUpWithOrgMutation__
 *
 * To run a mutation, you first call `useSignUpWithOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithOrgMutation, { data, loading, error }] = useSignUpWithOrgMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpWithOrgMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithOrgMutation, SignUpWithOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpWithOrgMutation, SignUpWithOrgMutationVariables>(SignUpWithOrgDocument, options);
      }
export type SignUpWithOrgMutationHookResult = ReturnType<typeof useSignUpWithOrgMutation>;
export type SignUpWithOrgMutationResult = Apollo.MutationResult<SignUpWithOrgMutation>;
export type SignUpWithOrgMutationOptions = Apollo.BaseMutationOptions<SignUpWithOrgMutation, SignUpWithOrgMutationVariables>;
export const UpdateUserPermissionsDocument = gql`
    mutation UpdateUserPermissions($userID: ID!, $input: UpdateUserPermissionsInput!) {
  updateUserPermissions(userID: $userID, input: $input) {
    id
    role
    reportsTo
  }
}
    `;
export type UpdateUserPermissionsMutationFn = Apollo.MutationFunction<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>;

/**
 * __useUpdateUserPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateUserPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPermissionsMutation, { data, loading, error }] = useUpdateUserPermissionsMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>(UpdateUserPermissionsDocument, options);
      }
export type UpdateUserPermissionsMutationHookResult = ReturnType<typeof useUpdateUserPermissionsMutation>;
export type UpdateUserPermissionsMutationResult = Apollo.MutationResult<UpdateUserPermissionsMutation>;
export type UpdateUserPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateUserPermissionsMutation, UpdateUserPermissionsMutationVariables>;
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
export const GetOrganizationAndMembersDocument = gql`
    query GetOrganizationAndMembers {
  organization {
    ...OrgWithMembers
  }
}
    ${OrgWithMembersFragmentDoc}`;

/**
 * __useGetOrganizationAndMembersQuery__
 *
 * To run a query within a React component, call `useGetOrganizationAndMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationAndMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationAndMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationAndMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationAndMembersQuery, GetOrganizationAndMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationAndMembersQuery, GetOrganizationAndMembersQueryVariables>(GetOrganizationAndMembersDocument, options);
      }
export function useGetOrganizationAndMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationAndMembersQuery, GetOrganizationAndMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationAndMembersQuery, GetOrganizationAndMembersQueryVariables>(GetOrganizationAndMembersDocument, options);
        }
export type GetOrganizationAndMembersQueryHookResult = ReturnType<typeof useGetOrganizationAndMembersQuery>;
export type GetOrganizationAndMembersLazyQueryHookResult = ReturnType<typeof useGetOrganizationAndMembersLazyQuery>;
export type GetOrganizationAndMembersQueryResult = Apollo.QueryResult<GetOrganizationAndMembersQuery, GetOrganizationAndMembersQueryVariables>;
export const GetOrganizationInfoDocument = gql`
    query GetOrganizationInfo($orgID: String!) {
  organizationInfo(id: $orgID) {
    id
    name
  }
}
    `;

/**
 * __useGetOrganizationInfoQuery__
 *
 * To run a query within a React component, call `useGetOrganizationInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationInfoQuery({
 *   variables: {
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useGetOrganizationInfoQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationInfoQuery, GetOrganizationInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationInfoQuery, GetOrganizationInfoQueryVariables>(GetOrganizationInfoDocument, options);
      }
export function useGetOrganizationInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationInfoQuery, GetOrganizationInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationInfoQuery, GetOrganizationInfoQueryVariables>(GetOrganizationInfoDocument, options);
        }
export type GetOrganizationInfoQueryHookResult = ReturnType<typeof useGetOrganizationInfoQuery>;
export type GetOrganizationInfoLazyQueryHookResult = ReturnType<typeof useGetOrganizationInfoLazyQuery>;
export type GetOrganizationInfoQueryResult = Apollo.QueryResult<GetOrganizationInfoQuery, GetOrganizationInfoQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user {
    ...BaseUserData
    organization {
      ...OrgWithMembers
    }
  }
}
    ${BaseUserDataFragmentDoc}
${OrgWithMembersFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
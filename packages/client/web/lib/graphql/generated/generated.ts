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
  Time: any;
};

export type CheckIn = {
  __typename?: 'CheckIn';
  completedAt?: Maybe<Scalars['Time']>;
  createdAt: Scalars['Time'];
  expired: Scalars['Boolean'];
  expiresAt: Scalars['Time'];
  id: Scalars['ID'];
  questions: Array<Question>;
  review?: Maybe<Scalars['String']>;
  reviewedAt?: Maybe<Scalars['Time']>;
  reviewer: User;
  user: User;
};

export type CreateCheckInInput = {
  userID: Scalars['ID'];
};

export type CreateOrganizationAndJoinInput = {
  name: Scalars['String'];
  timezone: Scalars['String'];
};

export type LogInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCheckIn: Scalars['String'];
  createOrganizationAndJoin: User;
  createShoutOut: Scalars['ID'];
  deleteOrganization?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  joinOrganization: Scalars['String'];
  leaveOrganization?: Maybe<Scalars['Boolean']>;
  logIn: Scalars['String'];
  logOut?: Maybe<Scalars['Boolean']>;
  removeUserFromOrganization: Organization;
  signUpWithOrg: Scalars['String'];
  signUpWithoutOrg: Scalars['String'];
  submitCheckInResponses: CheckIn;
  submitCheckInReview: CheckIn;
  updateOrgSettings: Organization;
  updateReportsTo: User;
  updateRole: User;
};


export type MutationCreateCheckInArgs = {
  input: CreateCheckInInput;
};


export type MutationCreateOrganizationAndJoinArgs = {
  input: CreateOrganizationAndJoinInput;
};


export type MutationCreateShoutOutArgs = {
  input: ShoutOutInput;
};


export type MutationJoinOrganizationArgs = {
  organizationID: Scalars['ID'];
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


export type MutationSubmitCheckInResponsesArgs = {
  input: SubmitCheckInResponsesInput;
};


export type MutationSubmitCheckInReviewArgs = {
  input: SubmitCheckInReviewInput;
};


export type MutationUpdateOrgSettingsArgs = {
  input: OrgSettingsInput;
};


export type MutationUpdateReportsToArgs = {
  reportsTo?: InputMaybe<Scalars['ID']>;
  userID: Scalars['ID'];
};


export type MutationUpdateRoleArgs = {
  role: Role;
  userID: Scalars['ID'];
};

export type OrgSettingsInput = {
  checkInWeekday: Scalars['Int'];
  timezone: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  checkInWeekday: Scalars['Int'];
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
  timezone: Scalars['String'];
};

export type OrganizationInfo = {
  __typename?: 'OrganizationInfo';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authToken: Scalars['String'];
  checkInByID: CheckIn;
  checkIns?: Maybe<Array<CheckIn>>;
  checkInsByReviewer?: Maybe<Array<CheckIn>>;
  getUsersReportingTo?: Maybe<Array<User>>;
  organization?: Maybe<Organization>;
  organizationInfo: OrganizationInfo;
  shoutOuts?: Maybe<Array<ShoutOut>>;
  shoutOutsByCheckInID?: Maybe<Array<ShoutOut>>;
  user: User;
};


export type QueryCheckInByIdArgs = {
  checkInID: Scalars['ID'];
};


export type QueryOrganizationInfoArgs = {
  id: Scalars['String'];
};


export type QueryShoutOutsByCheckInIdArgs = {
  checkInID: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID'];
  position: Scalars['Int'];
  questionType: Scalars['String'];
  responseType: ResponseType;
  responses?: Maybe<Array<Response>>;
  text: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  id: Scalars['ID'];
  position: Scalars['Int'];
  response: Scalars['String'];
};

export type ResponseInput = {
  position: Scalars['Int'];
  questionID: Scalars['ID'];
  response: Scalars['String'];
};

export enum ResponseType {
  Scale = 'SCALE',
  Task = 'TASK',
  Text = 'TEXT'
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type ShoutOut = {
  __typename?: 'ShoutOut';
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  receivers: Array<User>;
  shoutOut: Scalars['String'];
  user: User;
};

export type ShoutOutInput = {
  checkInID?: InputMaybe<Scalars['String']>;
  receiverIDs: Array<Scalars['ID']>;
  shoutOut: Scalars['String'];
};

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
  organizationTimezone: Scalars['String'];
  password: Scalars['String'];
};

export type SubmitCheckInResponsesInput = {
  checkInID: Scalars['ID'];
  responses: Array<ResponseInput>;
};

export type SubmitCheckInReviewInput = {
  checkInID: Scalars['ID'];
  review: Scalars['String'];
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

export type BaseCheckInDataFragment = { __typename?: 'CheckIn', id: string, createdAt: any, completedAt?: any | null, reviewedAt?: any | null, expiresAt: any, expired: boolean, reviewer: { __typename?: 'User', id: string, firstName: string, lastName: string } };

export type BaseQuestionDataFragment = { __typename?: 'Question', id: string, text: string, questionType: string, responseType: ResponseType };

export type BaseUserDataFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null };

export type OrgWithMembersFragment = { __typename?: 'Organization', id: string, name: string, timezone: string, checkInWeekday: number, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> };

export type CreateOrganizationAndJoinMutationVariables = Exact<{
  input: CreateOrganizationAndJoinInput;
}>;


export type CreateOrganizationAndJoinMutation = { __typename?: 'Mutation', createOrganizationAndJoin: { __typename?: 'User', id: string, role: Role, organization?: { __typename?: 'Organization', id: string, name: string, timezone: string, checkInWeekday: number, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null } };

export type CreateShoutOutMutationVariables = Exact<{
  input: ShoutOutInput;
}>;


export type CreateShoutOutMutation = { __typename?: 'Mutation', createShoutOut: string };

export type DeleteOrganizationMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: boolean | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: boolean | null };

export type JoinOrganizationMutationVariables = Exact<{
  orgID: Scalars['ID'];
}>;


export type JoinOrganizationMutation = { __typename?: 'Mutation', joinOrganization: string };

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


export type RemoveUserFromOrganizationMutation = { __typename?: 'Mutation', removeUserFromOrganization: { __typename?: 'Organization', id: string, name: string, timezone: string, checkInWeekday: number, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } };

export type SignUpWithoutOrgMutationVariables = Exact<{
  input: SignUpWithoutOrgInput;
}>;


export type SignUpWithoutOrgMutation = { __typename?: 'Mutation', signUpWithoutOrg: string };

export type SignUpWithOrgMutationVariables = Exact<{
  input: SignUpWithOrgInput;
}>;


export type SignUpWithOrgMutation = { __typename?: 'Mutation', signUpWithOrg: string };

export type SubmitCheckInResponsesMutationVariables = Exact<{
  input: SubmitCheckInResponsesInput;
}>;


export type SubmitCheckInResponsesMutation = { __typename?: 'Mutation', submitCheckInResponses: { __typename?: 'CheckIn', id: string, completedAt?: any | null } };

export type SubmitCheckInReviewMutationVariables = Exact<{
  input: SubmitCheckInReviewInput;
}>;


export type SubmitCheckInReviewMutation = { __typename?: 'Mutation', submitCheckInReview: { __typename?: 'CheckIn', id: string, reviewedAt?: any | null, review?: string | null } };

export type UpdateOrgSettingsMutationVariables = Exact<{
  input: OrgSettingsInput;
}>;


export type UpdateOrgSettingsMutation = { __typename?: 'Mutation', updateOrgSettings: { __typename?: 'Organization', id: string, timezone: string, checkInWeekday: number } };

export type UpdateReportsToMutationVariables = Exact<{
  userID: Scalars['ID'];
  reportsTo?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateReportsToMutation = { __typename?: 'Mutation', updateReportsTo: { __typename?: 'User', id: string, reportsTo?: string | null } };

export type UpdateRoleMutationVariables = Exact<{
  userID: Scalars['ID'];
  role: Role;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'User', id: string, role: Role } };

export type GetAuthTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthTokenQuery = { __typename?: 'Query', authToken: string };

export type GetCheckInByIdQueryVariables = Exact<{
  checkInID: Scalars['ID'];
}>;


export type GetCheckInByIdQuery = { __typename?: 'Query', checkInByID: { __typename?: 'CheckIn', id: string, createdAt: any, completedAt?: any | null, reviewedAt?: any | null, expiresAt: any, expired: boolean, questions: Array<{ __typename?: 'Question', id: string, text: string, questionType: string, responseType: ResponseType }>, reviewer: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export type GetCheckInByIdWithResponsesQueryVariables = Exact<{
  checkInID: Scalars['ID'];
}>;


export type GetCheckInByIdWithResponsesQuery = { __typename?: 'Query', checkInByID: { __typename?: 'CheckIn', review?: string | null, id: string, createdAt: any, completedAt?: any | null, reviewedAt?: any | null, expiresAt: any, expired: boolean, user: { __typename?: 'User', id: string }, questions: Array<{ __typename?: 'Question', id: string, text: string, questionType: string, responseType: ResponseType, responses?: Array<{ __typename: 'Response', id: string, response: string }> | null }>, reviewer: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export type GetCheckInsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInsQuery = { __typename?: 'Query', checkIns?: Array<{ __typename?: 'CheckIn', id: string, createdAt: any, completedAt?: any | null, reviewedAt?: any | null, expiresAt: any, expired: boolean }> | null };

export type GetCheckInsByReviewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInsByReviewerQuery = { __typename?: 'Query', checkInsByReviewer?: Array<{ __typename?: 'CheckIn', id: string, createdAt: any, completedAt?: any | null, reviewedAt?: any | null, expiresAt: any, expired: boolean, user: { __typename?: 'User', firstName: string, lastName: string } }> | null };

export type GetOrganizationAndMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationAndMembersQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: string, name: string, timezone: string, checkInWeekday: number, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null };

export type GetOrganizationInfoQueryVariables = Exact<{
  orgID: Scalars['String'];
}>;


export type GetOrganizationInfoQuery = { __typename?: 'Query', organizationInfo: { __typename?: 'OrganizationInfo', id: string, name: string } };

export type GetShoutOutsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShoutOutsQuery = { __typename?: 'Query', shoutOuts?: Array<{ __typename?: 'ShoutOut', id: string, shoutOut: string, createdAt: any, user: { __typename?: 'User', firstName: string, lastName: string }, receivers: Array<{ __typename?: 'User', firstName: string, lastName: string }> }> | null };

export type GetShoutOutsByCheckInIdQueryVariables = Exact<{
  checkInID: Scalars['ID'];
}>;


export type GetShoutOutsByCheckInIdQuery = { __typename?: 'Query', shoutOutsByCheckInID?: Array<{ __typename?: 'ShoutOut', id: string, shoutOut: string, createdAt: any, user: { __typename?: 'User', firstName: string, lastName: string }, receivers: Array<{ __typename?: 'User', firstName: string, lastName: string }> }> | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null, organization?: { __typename?: 'Organization', id: string, name: string, timezone: string, checkInWeekday: number, members: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: Role, reportsTo?: string | null }> } | null } };

export const BaseCheckInDataFragmentDoc = gql`
    fragment BaseCheckInData on CheckIn {
  id
  createdAt
  completedAt
  reviewedAt
  expiresAt
  expired
  reviewer {
    id
    firstName
    lastName
  }
}
    `;
export const BaseQuestionDataFragmentDoc = gql`
    fragment BaseQuestionData on Question {
  id
  text
  questionType
  responseType
}
    `;
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
  timezone
  checkInWeekday
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
export const CreateShoutOutDocument = gql`
    mutation CreateShoutOut($input: ShoutOutInput!) {
  createShoutOut(input: $input)
}
    `;
export type CreateShoutOutMutationFn = Apollo.MutationFunction<CreateShoutOutMutation, CreateShoutOutMutationVariables>;

/**
 * __useCreateShoutOutMutation__
 *
 * To run a mutation, you first call `useCreateShoutOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShoutOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShoutOutMutation, { data, loading, error }] = useCreateShoutOutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateShoutOutMutation(baseOptions?: Apollo.MutationHookOptions<CreateShoutOutMutation, CreateShoutOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShoutOutMutation, CreateShoutOutMutationVariables>(CreateShoutOutDocument, options);
      }
export type CreateShoutOutMutationHookResult = ReturnType<typeof useCreateShoutOutMutation>;
export type CreateShoutOutMutationResult = Apollo.MutationResult<CreateShoutOutMutation>;
export type CreateShoutOutMutationOptions = Apollo.BaseMutationOptions<CreateShoutOutMutation, CreateShoutOutMutationVariables>;
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
export const JoinOrganizationDocument = gql`
    mutation JoinOrganization($orgID: ID!) {
  joinOrganization(organizationID: $orgID)
}
    `;
export type JoinOrganizationMutationFn = Apollo.MutationFunction<JoinOrganizationMutation, JoinOrganizationMutationVariables>;

/**
 * __useJoinOrganizationMutation__
 *
 * To run a mutation, you first call `useJoinOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinOrganizationMutation, { data, loading, error }] = useJoinOrganizationMutation({
 *   variables: {
 *      orgID: // value for 'orgID'
 *   },
 * });
 */
export function useJoinOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<JoinOrganizationMutation, JoinOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinOrganizationMutation, JoinOrganizationMutationVariables>(JoinOrganizationDocument, options);
      }
export type JoinOrganizationMutationHookResult = ReturnType<typeof useJoinOrganizationMutation>;
export type JoinOrganizationMutationResult = Apollo.MutationResult<JoinOrganizationMutation>;
export type JoinOrganizationMutationOptions = Apollo.BaseMutationOptions<JoinOrganizationMutation, JoinOrganizationMutationVariables>;
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
export const SubmitCheckInResponsesDocument = gql`
    mutation SubmitCheckInResponses($input: SubmitCheckInResponsesInput!) {
  submitCheckInResponses(input: $input) {
    id
    completedAt
  }
}
    `;
export type SubmitCheckInResponsesMutationFn = Apollo.MutationFunction<SubmitCheckInResponsesMutation, SubmitCheckInResponsesMutationVariables>;

/**
 * __useSubmitCheckInResponsesMutation__
 *
 * To run a mutation, you first call `useSubmitCheckInResponsesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitCheckInResponsesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitCheckInResponsesMutation, { data, loading, error }] = useSubmitCheckInResponsesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitCheckInResponsesMutation(baseOptions?: Apollo.MutationHookOptions<SubmitCheckInResponsesMutation, SubmitCheckInResponsesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitCheckInResponsesMutation, SubmitCheckInResponsesMutationVariables>(SubmitCheckInResponsesDocument, options);
      }
export type SubmitCheckInResponsesMutationHookResult = ReturnType<typeof useSubmitCheckInResponsesMutation>;
export type SubmitCheckInResponsesMutationResult = Apollo.MutationResult<SubmitCheckInResponsesMutation>;
export type SubmitCheckInResponsesMutationOptions = Apollo.BaseMutationOptions<SubmitCheckInResponsesMutation, SubmitCheckInResponsesMutationVariables>;
export const SubmitCheckInReviewDocument = gql`
    mutation SubmitCheckInReview($input: SubmitCheckInReviewInput!) {
  submitCheckInReview(input: $input) {
    id
    reviewedAt
    review
  }
}
    `;
export type SubmitCheckInReviewMutationFn = Apollo.MutationFunction<SubmitCheckInReviewMutation, SubmitCheckInReviewMutationVariables>;

/**
 * __useSubmitCheckInReviewMutation__
 *
 * To run a mutation, you first call `useSubmitCheckInReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitCheckInReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitCheckInReviewMutation, { data, loading, error }] = useSubmitCheckInReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitCheckInReviewMutation(baseOptions?: Apollo.MutationHookOptions<SubmitCheckInReviewMutation, SubmitCheckInReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitCheckInReviewMutation, SubmitCheckInReviewMutationVariables>(SubmitCheckInReviewDocument, options);
      }
export type SubmitCheckInReviewMutationHookResult = ReturnType<typeof useSubmitCheckInReviewMutation>;
export type SubmitCheckInReviewMutationResult = Apollo.MutationResult<SubmitCheckInReviewMutation>;
export type SubmitCheckInReviewMutationOptions = Apollo.BaseMutationOptions<SubmitCheckInReviewMutation, SubmitCheckInReviewMutationVariables>;
export const UpdateOrgSettingsDocument = gql`
    mutation UpdateOrgSettings($input: OrgSettingsInput!) {
  updateOrgSettings(input: $input) {
    id
    timezone
    checkInWeekday
  }
}
    `;
export type UpdateOrgSettingsMutationFn = Apollo.MutationFunction<UpdateOrgSettingsMutation, UpdateOrgSettingsMutationVariables>;

/**
 * __useUpdateOrgSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateOrgSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgSettingsMutation, { data, loading, error }] = useUpdateOrgSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrgSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgSettingsMutation, UpdateOrgSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrgSettingsMutation, UpdateOrgSettingsMutationVariables>(UpdateOrgSettingsDocument, options);
      }
export type UpdateOrgSettingsMutationHookResult = ReturnType<typeof useUpdateOrgSettingsMutation>;
export type UpdateOrgSettingsMutationResult = Apollo.MutationResult<UpdateOrgSettingsMutation>;
export type UpdateOrgSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateOrgSettingsMutation, UpdateOrgSettingsMutationVariables>;
export const UpdateReportsToDocument = gql`
    mutation UpdateReportsTo($userID: ID!, $reportsTo: ID) {
  updateReportsTo(userID: $userID, reportsTo: $reportsTo) {
    id
    reportsTo
  }
}
    `;
export type UpdateReportsToMutationFn = Apollo.MutationFunction<UpdateReportsToMutation, UpdateReportsToMutationVariables>;

/**
 * __useUpdateReportsToMutation__
 *
 * To run a mutation, you first call `useUpdateReportsToMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportsToMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportsToMutation, { data, loading, error }] = useUpdateReportsToMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      reportsTo: // value for 'reportsTo'
 *   },
 * });
 */
export function useUpdateReportsToMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportsToMutation, UpdateReportsToMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReportsToMutation, UpdateReportsToMutationVariables>(UpdateReportsToDocument, options);
      }
export type UpdateReportsToMutationHookResult = ReturnType<typeof useUpdateReportsToMutation>;
export type UpdateReportsToMutationResult = Apollo.MutationResult<UpdateReportsToMutation>;
export type UpdateReportsToMutationOptions = Apollo.BaseMutationOptions<UpdateReportsToMutation, UpdateReportsToMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($userID: ID!, $role: Role!) {
  updateRole(userID: $userID, role: $role) {
    id
    role
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
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
export const GetCheckInByIdDocument = gql`
    query GetCheckInByID($checkInID: ID!) {
  checkInByID(checkInID: $checkInID) {
    ...BaseCheckInData
    questions {
      ...BaseQuestionData
    }
  }
}
    ${BaseCheckInDataFragmentDoc}
${BaseQuestionDataFragmentDoc}`;

/**
 * __useGetCheckInByIdQuery__
 *
 * To run a query within a React component, call `useGetCheckInByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInByIdQuery({
 *   variables: {
 *      checkInID: // value for 'checkInID'
 *   },
 * });
 */
export function useGetCheckInByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>(GetCheckInByIdDocument, options);
      }
export function useGetCheckInByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>(GetCheckInByIdDocument, options);
        }
export type GetCheckInByIdQueryHookResult = ReturnType<typeof useGetCheckInByIdQuery>;
export type GetCheckInByIdLazyQueryHookResult = ReturnType<typeof useGetCheckInByIdLazyQuery>;
export type GetCheckInByIdQueryResult = Apollo.QueryResult<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>;
export const GetCheckInByIdWithResponsesDocument = gql`
    query GetCheckInByIDWithResponses($checkInID: ID!) {
  checkInByID(checkInID: $checkInID) {
    ...BaseCheckInData
    user {
      id
    }
    review
    questions {
      ...BaseQuestionData
      responses {
        __typename
        id
        response
      }
    }
  }
}
    ${BaseCheckInDataFragmentDoc}
${BaseQuestionDataFragmentDoc}`;

/**
 * __useGetCheckInByIdWithResponsesQuery__
 *
 * To run a query within a React component, call `useGetCheckInByIdWithResponsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInByIdWithResponsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInByIdWithResponsesQuery({
 *   variables: {
 *      checkInID: // value for 'checkInID'
 *   },
 * });
 */
export function useGetCheckInByIdWithResponsesQuery(baseOptions: Apollo.QueryHookOptions<GetCheckInByIdWithResponsesQuery, GetCheckInByIdWithResponsesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInByIdWithResponsesQuery, GetCheckInByIdWithResponsesQueryVariables>(GetCheckInByIdWithResponsesDocument, options);
      }
export function useGetCheckInByIdWithResponsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInByIdWithResponsesQuery, GetCheckInByIdWithResponsesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInByIdWithResponsesQuery, GetCheckInByIdWithResponsesQueryVariables>(GetCheckInByIdWithResponsesDocument, options);
        }
export type GetCheckInByIdWithResponsesQueryHookResult = ReturnType<typeof useGetCheckInByIdWithResponsesQuery>;
export type GetCheckInByIdWithResponsesLazyQueryHookResult = ReturnType<typeof useGetCheckInByIdWithResponsesLazyQuery>;
export type GetCheckInByIdWithResponsesQueryResult = Apollo.QueryResult<GetCheckInByIdWithResponsesQuery, GetCheckInByIdWithResponsesQueryVariables>;
export const GetCheckInsDocument = gql`
    query GetCheckIns {
  checkIns {
    id
    createdAt
    completedAt
    reviewedAt
    expiresAt
    expired
  }
}
    `;

/**
 * __useGetCheckInsQuery__
 *
 * To run a query within a React component, call `useGetCheckInsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCheckInsQuery(baseOptions?: Apollo.QueryHookOptions<GetCheckInsQuery, GetCheckInsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInsQuery, GetCheckInsQueryVariables>(GetCheckInsDocument, options);
      }
export function useGetCheckInsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInsQuery, GetCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInsQuery, GetCheckInsQueryVariables>(GetCheckInsDocument, options);
        }
export type GetCheckInsQueryHookResult = ReturnType<typeof useGetCheckInsQuery>;
export type GetCheckInsLazyQueryHookResult = ReturnType<typeof useGetCheckInsLazyQuery>;
export type GetCheckInsQueryResult = Apollo.QueryResult<GetCheckInsQuery, GetCheckInsQueryVariables>;
export const GetCheckInsByReviewerDocument = gql`
    query GetCheckInsByReviewer {
  checkInsByReviewer {
    id
    createdAt
    completedAt
    reviewedAt
    expiresAt
    expired
    user {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetCheckInsByReviewerQuery__
 *
 * To run a query within a React component, call `useGetCheckInsByReviewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInsByReviewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInsByReviewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCheckInsByReviewerQuery(baseOptions?: Apollo.QueryHookOptions<GetCheckInsByReviewerQuery, GetCheckInsByReviewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInsByReviewerQuery, GetCheckInsByReviewerQueryVariables>(GetCheckInsByReviewerDocument, options);
      }
export function useGetCheckInsByReviewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInsByReviewerQuery, GetCheckInsByReviewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInsByReviewerQuery, GetCheckInsByReviewerQueryVariables>(GetCheckInsByReviewerDocument, options);
        }
export type GetCheckInsByReviewerQueryHookResult = ReturnType<typeof useGetCheckInsByReviewerQuery>;
export type GetCheckInsByReviewerLazyQueryHookResult = ReturnType<typeof useGetCheckInsByReviewerLazyQuery>;
export type GetCheckInsByReviewerQueryResult = Apollo.QueryResult<GetCheckInsByReviewerQuery, GetCheckInsByReviewerQueryVariables>;
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
export const GetShoutOutsDocument = gql`
    query GetShoutOuts {
  shoutOuts {
    id
    user {
      firstName
      lastName
    }
    receivers {
      firstName
      lastName
    }
    shoutOut
    createdAt
  }
}
    `;

/**
 * __useGetShoutOutsQuery__
 *
 * To run a query within a React component, call `useGetShoutOutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoutOutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoutOutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShoutOutsQuery(baseOptions?: Apollo.QueryHookOptions<GetShoutOutsQuery, GetShoutOutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShoutOutsQuery, GetShoutOutsQueryVariables>(GetShoutOutsDocument, options);
      }
export function useGetShoutOutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoutOutsQuery, GetShoutOutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShoutOutsQuery, GetShoutOutsQueryVariables>(GetShoutOutsDocument, options);
        }
export type GetShoutOutsQueryHookResult = ReturnType<typeof useGetShoutOutsQuery>;
export type GetShoutOutsLazyQueryHookResult = ReturnType<typeof useGetShoutOutsLazyQuery>;
export type GetShoutOutsQueryResult = Apollo.QueryResult<GetShoutOutsQuery, GetShoutOutsQueryVariables>;
export const GetShoutOutsByCheckInIdDocument = gql`
    query GetShoutOutsByCheckInID($checkInID: ID!) {
  shoutOutsByCheckInID(checkInID: $checkInID) {
    id
    user {
      firstName
      lastName
    }
    receivers {
      firstName
      lastName
    }
    shoutOut
    createdAt
  }
}
    `;

/**
 * __useGetShoutOutsByCheckInIdQuery__
 *
 * To run a query within a React component, call `useGetShoutOutsByCheckInIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoutOutsByCheckInIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoutOutsByCheckInIdQuery({
 *   variables: {
 *      checkInID: // value for 'checkInID'
 *   },
 * });
 */
export function useGetShoutOutsByCheckInIdQuery(baseOptions: Apollo.QueryHookOptions<GetShoutOutsByCheckInIdQuery, GetShoutOutsByCheckInIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShoutOutsByCheckInIdQuery, GetShoutOutsByCheckInIdQueryVariables>(GetShoutOutsByCheckInIdDocument, options);
      }
export function useGetShoutOutsByCheckInIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoutOutsByCheckInIdQuery, GetShoutOutsByCheckInIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShoutOutsByCheckInIdQuery, GetShoutOutsByCheckInIdQueryVariables>(GetShoutOutsByCheckInIdDocument, options);
        }
export type GetShoutOutsByCheckInIdQueryHookResult = ReturnType<typeof useGetShoutOutsByCheckInIdQuery>;
export type GetShoutOutsByCheckInIdLazyQueryHookResult = ReturnType<typeof useGetShoutOutsByCheckInIdLazyQuery>;
export type GetShoutOutsByCheckInIdQueryResult = Apollo.QueryResult<GetShoutOutsByCheckInIdQuery, GetShoutOutsByCheckInIdQueryVariables>;
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
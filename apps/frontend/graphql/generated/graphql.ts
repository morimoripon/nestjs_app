/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateItemInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CurrentUserResponse = {
  __typename?: 'CurrentUserResponse';
  bannedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  introduction?: Maybe<Scalars['String']['output']>;
  lineNotifySetAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payoutableAmount: Scalars['Float']['output'];
  phoneNumberSetAt?: Maybe<Scalars['DateTime']['output']>;
  secretBannedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GenerateImageUrlInput = {
  fileType: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type GetItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetItemResponse = {
  __typename?: 'GetItemResponse';
  amount?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Scalars['Boolean']['output'];
  generateIdDocumentImageUrl: Scalars['String']['output'];
  generateUserImageUrl: Scalars['String']['output'];
  loginAdmin: UserLoginResponse;
  loginUser: UserLoginResponse;
  signUpUser: UserSignUpResponse;
  updateAuth: Scalars['Boolean']['output'];
  updateItem: Scalars['Boolean']['output'];
  userUpdatePassword: Scalars['Boolean']['output'];
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationGenerateIdDocumentImageUrlArgs = {
  data: GenerateImageUrlInput;
};


export type MutationGenerateUserImageUrlArgs = {
  data: GenerateImageUrlInput;
};


export type MutationLoginAdminArgs = {
  data: UserLoginInput;
};


export type MutationLoginUserArgs = {
  data: UserLoginInput;
};


export type MutationSignUpUserArgs = {
  data: UserSignUpInput;
};


export type MutationUpdateAuthArgs = {
  data: UserUpdateInput;
};


export type MutationUpdateItemArgs = {
  data: UpdateItemInput;
};


export type MutationUserUpdatePasswordArgs = {
  data: UpdateUserPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: CurrentUserResponse;
  getItems: Array<GetItemResponse>;
  getMyItems: Array<GetItemResponse>;
  users: Array<UserResponse>;
};


export type QueryGetItemsArgs = {
  data: GetItemInput;
};

export type UpdateItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  password: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  errorMessage?: Maybe<Scalars['String']['output']>;
  jwtToken: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String']['output'];
  items?: Maybe<Array<GetItemResponse>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UserSignUpInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignUpResponse = {
  __typename?: 'UserSignUpResponse';
  errorMessage?: Maybe<Scalars['String']['output']>;
  jwtToken: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lineNotifyAccessToken?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserResponse', name?: string | null, items?: Array<{ __typename?: 'GetItemResponse', id?: string | null, name?: string | null, description?: string | null }> | null }> };


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
"use client";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";
import initializeApollo from "../../lib/initializeApollo";

const client = initializeApollo();

const WithApollo = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithApollo;

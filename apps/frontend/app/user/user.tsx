"use client";

import { UserResponse } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import initializeApollo from "../lib/initializeApollo";

const ALL_USERS = gql(`query GetUser {
  users {
    name
    items {
      id
      name
      description
    }
  }
}`);

/* export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  console.log('apolloClient', apolloClient)

  const { data } = await apolloClient.query({
    query: ALL_USERS
  });

  return {
    props: {
      data
    },
    revalidate: 1
  }
} */

type Props = {
  data: any
}

const User = () => {
  const { data, loading, error } = useQuery(ALL_USERS);
  if (loading) {
    return <div>読み込み中</div>;
  }
  console.log('data', data)
  return (
    <div>
      {error && <p>{error.message}</p>}
      <ul>
        {data && data.users.map((v: UserResponse, i: number) => (
          <li key={String(i)}>
            <p>{v.name}</p>
            {v.items?.map(item => <p key={item.id}>{item.name}</p>)}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;

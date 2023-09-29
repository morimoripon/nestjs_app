"use client";

import { GetItemResponse } from "@/graphql/generated/graphql";
import { useQuery, gql } from "@apollo/client";
import ItemCard from "./ItemCard";

const ALL_ITEMS = gql(`query GetItems($data: GetItemInput!) {
  getItems(data: $data) {
    id
    name
    amount
    imageUrl
  }
}`);

const ItemList = () => {
  const { data, loading, error } = useQuery(ALL_ITEMS, {
    variables: { data: {} }
  });
  if (loading) {
    return <div>読み込み中</div>;
  }
  console.log('data', data)
  return (
    <div>
      {error && <p>{error.message}</p>}
      <ul className="flex flex-wrap justify-between">
        {data && data.getItems.map((v: GetItemResponse) => (
          <li key={v.id} className="w-4/12 mb-6">
            <div className="pr-3">
              <ItemCard imageUrl={v.imageUrl} id={v.id} name={v.name} amount={v.amount}/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

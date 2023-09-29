"use client";

import { GetItemResponse } from "@/graphql/generated/graphql";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

type Props = Pick<GetItemResponse, 'id'>

const ITEM = gql(`query GetItemById($id: String!) {
  getItemById(id: $id) {
    id
    name
    description
    amount
    imageUrl
  }
}`);

const ItemDetail = ({ id }: Props) => {
  const { data, loading, error } = useQuery(ITEM, {
    variables: { id }
  });
  if (loading) {
    return <div>読み込み中</div>;
  }
  const { imageUrl, name, description, amount } = data.getItemById;
  console.log('data', data)
  return (
    <div>
      {error && <p>{error.message}</p>}
      <div className="flex w-full pt-8">
        <div className="w-1/2 h-96 mr-8 relative">
          <Image className="w-full" objectFit="contain" layout="fill" src={imageUrl} alt={name || 'altです'} />
        </div>
        <div className="w-1/2">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">{name}</h2>
          <p className="mb-6 text-2xl font-mediun text-gray-700 dark:text-gray-700">{amount}円</p>
          <Link href='/' className="mb-6 block w-full text-white bg-red-600 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-xl px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-800">購入手続きへ進む</Link>
          <p className="">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

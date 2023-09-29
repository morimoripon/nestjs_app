import Image from "next/image";
import { GetItemResponse } from "@/graphql/generated/graphql";
import Link from "next/link";

type Props = Pick<GetItemResponse, 'id' | 'imageUrl' | 'name' | 'amount'>

const ItemCard = ({ id, imageUrl, name, amount }: Props) => {
  return (
    <Link href={`/item/${id}`}>
      <div className="max-w-sm w-full h-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="relative h-56">
            {imageUrl && <Image className="rounded-t-lg" objectFit="cover" layout="fill" src={imageUrl} alt={name || 'altです'} />}
          </div>
          <div className="pt-4 px-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">{name}</h5>
            <p className="mb-3 text-2xl font-bold text-red-600 dark:text-red-600">{amount}円</p>
          </div>
      </div>
    </Link>
  );
};

export default ItemCard;




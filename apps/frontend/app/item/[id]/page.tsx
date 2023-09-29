import { GetItemResponse } from "@/graphql/generated/graphql";
import BodyOffset from "../../components/common/BodyOffset";
import WithApollo from "../../components/lib/WithApollo";
import ItemDetail from "./components/ItemDetail";

type Props = {
  params: Pick<GetItemResponse, 'id'>
}

const ItemPage = ({ params }: Props) => {
  const { id } = params;
  return (
    <WithApollo>
      <BodyOffset>
        <ItemDetail id={id} />
      </BodyOffset>
    </WithApollo>
  )
}


export default ItemPage

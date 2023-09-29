import ItemList from "./components/ItemList"
import BodyOffset from "./components/common/BodyOffset"
import WithApollo from "./components/lib/WithApollo"

export default function Home() {
  return (
    <WithApollo>
      <BodyOffset>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white pt-3 pb-4">おすすめの商品</h2>
        <ItemList/>
      </BodyOffset>
    </WithApollo>
  )
}

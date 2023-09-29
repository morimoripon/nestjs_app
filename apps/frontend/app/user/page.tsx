import BodyOffset from "../components/common/BodyOffset";
import WithApollo from "../components/lib/WithApollo"
import User from "./user";

const UserPage = () => {
  return (
    <>
      <WithApollo>
        <BodyOffset>
          <h2>User Page</h2>
          <User/>
        </BodyOffset>
      </WithApollo>
    </>
  )
}


export default UserPage

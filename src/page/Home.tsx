import { Navigate } from "react-router-dom";
import getAccessToken from "../util/getAccessToken";

const Home = () => {

    if (!getAccessToken()) {
        return <Navigate to="/signin" replace={true} />;
    }
    return <Navigate to="/todo" replace={true} />;
}

export default Home;
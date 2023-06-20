import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";

const Home = () => {
    const { isToken } = useToken();

    if (!isToken()) {
        return <Navigate to="/signin" replace={true} />;
    }
    return <Navigate to="/todo" replace={true} />;
}

export default Home;
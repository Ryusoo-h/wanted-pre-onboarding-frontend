import { Navigate } from "react-router-dom";

const Home = () => {

    if (!localStorage.getItem("access_token")) {
        return <Navigate to="/signin" replace={true} />;
    }
    return <Navigate to="/todo" replace={true} />;
}

export default Home;
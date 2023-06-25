
import Envelop from '../components/auth/Envelop';
import AuthForm from '../components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import Card from "../components/common/Card";
import * as S from "./SignUp.style";
import { useToken } from "../hooks/useToken";
import useSignUp from '../hooks/auth/useSignUp';

type SignUpProps = {
    showCompletedBadge: (isComplete:boolean) => void,
}
const SignUp = ({ showCompletedBadge }:SignUpProps) => {
    const { getToken } = useToken();
    const [ submitAlert, submitSignUp ] = useSignUp(showCompletedBadge);

    if (getToken()) {
        return <Navigate to="/todo" replace={true} />;
    }
    return (
        <Envelop>
            <Card degree={-2} translateX={10} translateY={-7}>
                <>
                    <S.Welcome className="font-net">Welcome!</S.Welcome>
                    <AuthForm dataTestid="signup-button" color="#EBFBE8" onFormSubmit={submitSignUp} submitAlert={submitAlert}>회원가입</AuthForm>
                </>
            </Card>
        </Envelop>
    );
};

export default SignUp;
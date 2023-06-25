
import AuthForm from '../components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import Envelop from '../components/auth/Envelop';
import * as S from './SignIn.style';
import { useToken } from '../hooks/useToken';
import useSignIn from '../hooks/auth/useSignIn';

type SingInProps = {
    isCompleteSingUp: boolean,
    hideCompletedBadge: (isComplete:boolean) => void;
}

const SignIn = ({ isCompleteSingUp, hideCompletedBadge }:SingInProps) => {
    const { isToken, login } = useToken();
    const [ submitAlert, submitSignIn ] = useSignIn(hideCompletedBadge, login);

    if (isToken()) {
        return <Navigate to="/todo" replace={true} />;
    }
    return (
        <Envelop>
            <>
                {isCompleteSingUp &&
                    <S.Badge src={`${process.env.PUBLIC_URL}/img/completeSignUp.svg`} alt="complete-Sign-Up-badge" />
                }
                <AuthForm dataTestid="signin-button" onFormSubmit={submitSignIn} submitAlert={submitAlert}>로그인</AuthForm>
                <S.LinkToSignUp to="/signup" className="font-net">회원가입</S.LinkToSignUp>
            </>
        </Envelop>
    );
};

export default SignIn;
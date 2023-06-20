
import AuthForm from '../components/common/AuthForm';
import { Navigate, useNavigate } from 'react-router-dom';
import Envelop from '../components/common/Envelop';
import { useState } from 'react';
import postSignIn from '../apis/auth/postSignIn';
import getAccessToken from '../util/getAccessToken';
import * as S from './SignIn.style';

type SingInProps = {
    isCompleteSingUp: boolean,
    setIsCompleteSingUp: (isComplete:boolean) => void;
}

const SignIn = ({ isCompleteSingUp, setIsCompleteSingUp }:SingInProps) => {
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const onFormSubmit = (email:string, password:string) => {
        postSignIn(email, password)
        .then( response => {
            if (response.statusCode === 200 && response.access_token) {
                localStorage.setItem("access_token", response.access_token);
                navigate('/');
                setIsCompleteSingUp(false);
            } else {
                switch (response.statusCode) {
                    case 401:
                        setMessage("비밀번호가 올바르지 않습니다.")
                        break;
                    case 404:
                        if (response.message) {
                            setMessage(response.message);
                        }
                        break;
                    default:
                        setMessage("로그인에 실패했습니다.");
                        console.log('✅postSignIn API 에러: ', response);
                }
            }
        }).catch( e => {
            console.log("✅로그인 에러: ", e.message);
        });
    };

    if (getAccessToken()) {
        return <Navigate to="/todo" replace={true} />;
    }
    return (
        <Envelop>
            <>
            {isCompleteSingUp &&
                <S.Badge src={`${process.env.PUBLIC_URL}/img/completeSignUp.svg`} alt="complete-Sign-Up-badge" />
            }
            <AuthForm dataTestid="signin-button" onFormSubmit={onFormSubmit} message={message}>로그인</AuthForm>
            <S.LinkToSignUp to="/signup" className="font-net">회원가입</S.LinkToSignUp>
            </>
        </Envelop>
    );
};

export default SignIn;

import styled from 'styled-components';
import AuthForm from '../components/common/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import Envelop from '../components/common/Envelop';
import { useState } from 'react';
import postSignIn from '../apis/auth/postSignIn';

const LinkToSignUp = styled(Link)`
    padding: 12px;
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: #A6A6A6;
    text-align: center;
`;

const Badge = styled.img`
    position: absolute;
    top: 180px;
    left: 30px;
    animation-duration: 0.5s;
    animation-name: smaller;
    transition-timing-function: ease-out;
    @keyframes smaller {
        from {
            transform: rotate(-4deg) scale(1.1);
        }
        to {
            transform: scale(1);
        }
    }
`;

type SingInProps = {
    isCompleteSingUp: boolean,
    setIsCompleteSingUp: (isComplete:boolean) => void;
}

const SignIn = ({ isCompleteSingUp, setIsCompleteSingUp }:SingInProps) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const onFormSubmit = (email:string, password:string) => {
        postSignIn(email, password)
        .then( response => {
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.access_token);
                navigate('/');
                setIsCompleteSingUp(false);
                return;
            }
            switch (response.statusCode) {
                case 401:
                    setMessage("비밀번호가 올바르지 않습니다.")
                    break;
                case 404:
                    setMessage(response.message);
                    break;
                default:
                    console.log('✅postSignIn API 에러: ', response);
            }
        }).catch( e => {
            console.log('✅로그인 에러:', e.message);
        });
    };

    return (
        <Envelop>
            <>
            {isCompleteSingUp &&
                <Badge src={`${process.env.PUBLIC_URL}/img/completeSignUp.svg`} alt="complete-Sign-Up-badge" />
            }
            <AuthForm dataTestid="signin-button" onFormSubmit={onFormSubmit} message={message}>로그인</AuthForm>
            <LinkToSignUp to="/signup" className="font-net">회원가입</LinkToSignUp>
            </>
        </Envelop>
    );
};

export default SignIn;
import styled from "styled-components";
import Envelop from "../components/common/Envelop";
import AuthForm from "../components/common/AuthForm";
import { Navigate, useNavigate } from 'react-router-dom';
import postSignUp from "../apis/auth/postSignUp";
import { useState } from "react";
import getAccessToken from "../util/getAccessToken";

const Card = styled.div`
    position: relative;
    width: 620px;
    height: 430px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(110, 106, 150, 0.4);
    transform: translate(10%, -7%) rotate(-2deg);
    animation-duration: 0.7s;
    animation-name: smaller;
    transition-timing-function: ease-in-out;
    @keyframes smaller {
        from {
            transform: translate(20%, -10%) rotate(-4deg) scale(1.05);
        }
        to {
            transform: translate(10%, -7%) rotate(-2deg);
        }
    }
`;

const CardWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 336px;
    transform: translate(-50%, -50%) rotate(2deg);
`;

const Welcome = styled.h2`
    text-align: center;
    font-size: 30px;
    color: #FF7373;
`;

type SignUpProps = {
    setIsCompleteSingUp: (isComplete:boolean) => void,
}
const SignUp = ({ setIsCompleteSingUp }:SignUpProps) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const onFormSubmit = (email:string, password:string) => {
        postSignUp(email, password)
        .then(response => {
            switch (response.statusCode) {
                case 201:
                    navigate('/signin');
                    setIsCompleteSingUp(true);
                    break;
                case 400:
                    setMessage(response.message);
                    break;
                default:
                    console.log('✅postSignUp API 에러: ', response);
            }
        }).catch(e => {
            console.log('✅회원가입 에러:', e.message);
        })
    };

    if (getAccessToken()) {
        return <Navigate to="/todo" replace={true} />;
    }
    return (
        <Envelop>
            <Card>
                <CardWrapper>
                    <Welcome className="font-net">Welcome!</Welcome>
                    <AuthForm dataTestid="signup-button" color="#EBFBE8" onFormSubmit={onFormSubmit} message={message}>회원가입</AuthForm>
                </CardWrapper>
            </Card>
        </Envelop>
    );
};

export default SignUp;
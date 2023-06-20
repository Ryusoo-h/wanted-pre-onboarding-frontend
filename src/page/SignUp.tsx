
import Envelop from "../components/common/Envelop";
import AuthForm from "../components/common/AuthForm";
import { Navigate, useNavigate } from 'react-router-dom';
import postSignUp from "../apis/auth/postSignUp";
import { useState } from "react";
import Card from "../components/common/Card";
import * as S from "./SignUp.style";
import { useToken } from "../hooks/useToken";

type SignUpProps = {
    setIsCompleteSingUp: (isComplete:boolean) => void,
}
const SignUp = ({ setIsCompleteSingUp }:SignUpProps) => {
    const [message, setMessage] = useState<string>('');
    const { getToken } = useToken();
    
    const navigate = useNavigate();

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
                    console.log("✅postSignUp API 에러: ", response);
            }
        }).catch(e => {
            console.log("✅회원가입 에러: ", e.message);
        })
    };

    if (getToken()) {
        return <Navigate to="/todo" replace={true} />;
    }
    return (
        <Envelop>
            <Card degree={-2} translateX={10} translateY={-7}>
                <>
                    <S.Welcome className="font-net">Welcome!</S.Welcome>
                    <AuthForm dataTestid="signup-button" color="#EBFBE8" onFormSubmit={onFormSubmit} message={message}>회원가입</AuthForm>
                </>
            </Card>
        </Envelop>
    );
};

export default SignUp;
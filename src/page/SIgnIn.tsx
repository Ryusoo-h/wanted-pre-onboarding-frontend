
import styled from 'styled-components';
import AuthForm from '../components/common/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import Envelop from '../components/common/Envelop';

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

    const onSubmit = () => {
        if (true) { // TODO : 로그인 성공하면
            navigate('/');
            setIsCompleteSingUp(false);
        }
    };

    return (
        <Envelop>
            <>
            {isCompleteSingUp &&
                <Badge src={`${process.env.PUBLIC_URL}/img/completeSignUp.svg`} alt="complete-Sign-Up-badge" />
            }
            <AuthForm dataTestid="signup-button" onSubmit={onSubmit}>로그인</AuthForm>
            <LinkToSignUp to="/signup" className="font-net">회원가입</LinkToSignUp>
            </>
        </Envelop>
    );
};

export default SignIn;
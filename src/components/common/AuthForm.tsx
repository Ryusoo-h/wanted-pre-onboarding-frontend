import styled, { css } from "styled-components";
import Button from "./Button";
import { useState, useEffect } from 'react';


const Form = styled.form`
    margin: 40px auto 10px;
    width: 336px;
`;

const AuthFormWrapper = styled.div`
    display: grid;
    grid-template: repeat(2, 46px) / 100px 236px;
    align-items: stretch;
    border-top: solid 2px var(--light-green);
    label {
        font-size: 20px;
        border-bottom: solid 2px var(--light-green);
        border-right: solid 2px var(--light-green);
        line-height: 46px;
        padding: 0 10px;
    }
    input {
        height: 100%;
        font-size: 20px;
        border: none;
        border-bottom: solid 2px var(--light-green);
        background-color: unset;
        padding: 0 10px;
        &:focus {
            background-color: #fff;
            ${props => props.color &&
                css`
                background-color: ${props.color};
            `}
            outline: none;
        }
    }
`;

const AlertWrapper = styled.div`
    margin: 40px 0 10px;
`;
const Alert = styled.p`
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    color: #33333;
    &.is-valid {
        color: var(--green);
    }
`;

type AuthFormProps = {
    dataTestid: string;
    children: string;
    color?: string;
    onSubmit: () => void;
}

const AuthForm = ({ dataTestid, children, onSubmit, ...rest }:AuthFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isAllValid, setIsAllValid] = useState<boolean>(false);
    // TODO : 이메일과 비밀번호 모두 검증 완료되면 true

    useEffect(() => {
        setIsAllValid(isEmailValid && isPasswordValid);
    }, [isEmailValid, isPasswordValid])
    // TODO : 검증 되지않은 이유를 유저에게 알려주기

    const onChangeEmailInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(value.includes('@'));
    }
    const onChangePasswordInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setIsPasswordValid(value.length >= 8);
    }

    return(
        <Form>
            <AuthFormWrapper color={rest.color}>
                <label htmlFor="email">이메일</label>
                <input data-testid="email-input" type="text" id="email" className="font-basic" autoFocus={true} 
                    value={email} onChange={(e) => {onChangeEmailInput(e)}}
                />
                <label htmlFor="password">비밀번호</label>
                <input data-testid="password-input" type="password" id="password" className="font-basic" 
                    value={password}  onChange={(e) => {onChangePasswordInput(e)}}
                />
            </AuthFormWrapper>
                <AlertWrapper>
                    <Alert className={isEmailValid ? "is-valid" : ""}>
                        {isEmailValid ? '✅' : '⬜'} 이메일 양식을 지켜주세요
                    </Alert>
                    <Alert className={isPasswordValid ? "is-valid" : ""}>
                        {isPasswordValid ? '✅' : '⬜'} 비밀번호는 8자 이상 입력해주세요
                    </Alert>
                </AlertWrapper>
                <Button dataTestid={dataTestid} disabled={!isAllValid} onSubmit={onSubmit}><>{children}</></Button>
        </Form>
    );
};

export default AuthForm;
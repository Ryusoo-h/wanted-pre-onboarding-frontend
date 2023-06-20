
import { useState, useEffect } from 'react';
import * as S from './AthForm.style';

type AuthFormProps = {
    dataTestid: string,
    children: string,
    onFormSubmit: (email:string, password:string) => void,
    message: string,
    color?: string,
}

const AuthForm = ({ dataTestid, children, onFormSubmit, message, ...rest }:AuthFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [isAllValid, setIsAllValid] = useState<boolean>(false);

    useEffect(() => {
        setIsAllValid(isEmailValid && isPasswordValid);
    }, [isEmailValid, isPasswordValid])

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
        <S.Form>
            <S.AuthFormWrapper color={rest.color}>
                <label htmlFor="email">이메일</label>
                <input data-testid="email-input" type="text" id="email" className="font-basic" autoFocus={true} 
                    value={email} onChange={(e) => {onChangeEmailInput(e)}}
                />
                <label htmlFor="new-password">비밀번호</label>
                <input data-testid="password-input" type="password" id="new-password" className="font-basic" 
                    value={password}  onChange={(e) => {onChangePasswordInput(e)}}
                />
            </S.AuthFormWrapper>
                <S.AlertWrapper>
                    <S.Alert className="red">{message}</S.Alert>
                    <S.Alert className={isEmailValid ? "is-valid" : ""}>
                        {isEmailValid ? '✅' : '⬜'} 이메일 양식을 지켜주세요
                    </S.Alert>
                    <S.Alert className={isPasswordValid ? "is-valid" : ""}>
                        {isPasswordValid ? '✅' : '⬜'} 비밀번호는 8자 이상 입력해주세요
                    </S.Alert>
                </S.AlertWrapper>
                <S.SubmitButton
                    data-testid={dataTestid}
                    className="font-net"
                    disabled={!isAllValid}
                    onClick={(e) => {
                        e.preventDefault();
                        onFormSubmit(email, password);
                    }}
                >
                    <>{children}</>
                </S.SubmitButton>
        </S.Form>
    );
};

export default AuthForm;
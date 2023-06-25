

import { useState } from 'react';
import useIsAllValid from '../../hooks/auth/useIsAllValid';
import * as S from './AthForm.style';
import AuthInput from './AuthInput';
import { inputInfoType } from '../../types/auth';

type AuthFormProps = {
    dataTestid: string,
    children: string,
    onFormSubmit: (email:string, password:string) => void,
    submitAlert: string,
    color?: string,
}

const AuthForm = ({ dataTestid, children, onFormSubmit, submitAlert, ...rest }:AuthFormProps) => {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ isEmailValid, setIsEmailValid ] = useState<boolean>(false);
    const [ isPasswordValid, setIsPasswordValid ] = useState<boolean>(false);
    const [ isAllValid ] = useIsAllValid([isEmailValid, isPasswordValid]);

    type inputInfosType = {
        email: inputInfoType,
        password: inputInfoType
    };
    
    const inputInfos:inputInfosType = {
        email: {
            id: "email",
            label: "이메일",
            type: "text",
            dataTestid: "email-input",
            value: email,
            onChange: (value) => {
                setEmail(value);
                setIsEmailValid(value.includes('@'));
            }
        },
        password: {
            id: "password",
            label: "비밀번호",
            type: "password",
            dataTestid: "password-input",
            value: password,
            onChange: (value) => {
                setPassword(value);
                setIsPasswordValid(value.length >= 8);
            }
        },
    };
    return(
        <S.Form>
            <S.AuthFormWrapper color={rest.color}>
                <AuthInput inputInfo={inputInfos.email} />
                <AuthInput inputInfo={inputInfos.password} />
            </S.AuthFormWrapper>
                <S.AlertWrapper>
                    <S.Alert className="red">{submitAlert}</S.Alert>
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
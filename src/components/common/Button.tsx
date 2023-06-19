
import styled, { css } from "styled-components";

const ButtonEl = styled.button`
    padding: 12px 0;
    border-radius: 4px;
    width: 100%;
    font-size: 24px;
    line-height: 24px;
    background-color: var(--green);
    color: #fff;
    pointer-event: none;
    ${props =>
        props.disabled &&
        css`
            background-color: #EFEFEF;
            color: #CDCDCD;
    `}
`;

type ButtonProps = {
    children: JSX.Element,
    dataTestid?: string,
    disabled?: boolean,
    onFormSubmit?: (email:string, password:string) => void,
    email?:string,
    password?:string
}

const Button = ({ children, ...rest }:ButtonProps) => {

    return(
        <ButtonEl
            data-testid={rest.dataTestid} 
            className="font-net" 
            disabled={rest.disabled}
            onClick={(e) => {
                e.preventDefault();
                rest.onFormSubmit && rest.email && rest.password && rest.onFormSubmit(rest.email, rest.password);
            }}
        >
            { children }
        </ButtonEl>
    );
};

export default Button;
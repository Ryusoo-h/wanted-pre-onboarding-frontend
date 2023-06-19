import styled, { css } from "styled-components";

const ButtonEl = styled.button`
    padding: 12px 0;
    border-radius: 4px;
    width: 100%;
    font-size: 24px;
    line-height: 24px;
    background-color: var(--green);
    color: #fff;
    ${props =>
        props.disabled &&
        css`
            background-color: #EFEFEF;
            color: #CDCDCD;
    `}
`;

type ButtonProps = {
    children: JSX.Element;
    disabled?: boolean;
    dataTestid?: string;
    onSubmit?: () => void;
}

const Button = ({ children, ...rest }:ButtonProps) => {

    return(
        <ButtonEl 
            data-testid={rest.dataTestid} 
            className="font-net" 
            disabled={rest.disabled} 
            onClick={() => {rest.onSubmit && rest.onSubmit();}}
        >
            { children }
        </ButtonEl>
    );
};

export default Button;
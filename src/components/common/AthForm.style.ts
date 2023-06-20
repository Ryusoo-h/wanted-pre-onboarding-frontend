
import styled, { css } from "styled-components";

export const Form = styled.form`
    margin: 40px auto 10px;
    width: 336px;
`;

export const AuthFormWrapper = styled.div`
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

export const AlertWrapper = styled.div`
    margin: 14px 0 10px;
`;
export const Alert = styled.p`
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    color: #33333;
    &.is-valid {
        color: var(--green);
    }
    &.red {
        text-align: center;
        color: #FF6868;
        margin-bottom: 10px;
    }
`;
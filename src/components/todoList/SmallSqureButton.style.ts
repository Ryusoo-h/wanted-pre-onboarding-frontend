import styled, { css } from "styled-components";

export const ButtonEl = styled('button')<{color:string, hoverColor:string}>`
    width: 34px;
    height: 34px;
    padding: 4px;
    background-color: ${props => props.color};
    border-radius: 4px;
    &:hover {
        background-color: ${props => props.hoverColor};
    }
    ${props => 
        props.disabled &&
        css`
        background-color: #EFEFEF;
        color: #CDCDCD;
        &:hover {
            background-color: #EFEFEF;
            color: #CDCDCD;
        }
    `}
`;
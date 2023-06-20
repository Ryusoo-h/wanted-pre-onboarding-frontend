
import styled, { css } from "styled-components";

export const ButtonEl = styled.button`
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
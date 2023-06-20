
import styled from "styled-components";
import { Link } from "react-router-dom";

export const NotFoundWrapper = styled.div`
    text-align: center;
    h1 {
        color: #FC7171;
        font-size: 42px;
    }
    p {
        font-size: 20px;
    }
`;

export const LinkButton = styled(Link)`
    padding: 12px 24px;
    border-radius: 4px;
    width: 100%;
    font-size: 24px;
    line-height: 24px;
    background-color: var(--green);
    color: #fff;
    pointer-event: none;
    &:hover {
        background-color: #00cec1;
    }
`;
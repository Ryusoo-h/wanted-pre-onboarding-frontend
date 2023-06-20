
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkToSignUp = styled(Link)`
    padding: 12px;
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: #A6A6A6;
    text-align: center;
`;

export const Badge = styled.img`
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

import styled, { css } from 'styled-components';

export const BackgroundImage = styled('div')<{path:string}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-image: url(${props => props.path});
    background-position: center;
    background-size: 1920px 980px;
    background-repeat: no-repeat;
    animation-duration: 2.5s;
    animation-name: zoom-out;
    transition-timing-function: ease-out;
    @keyframes zoom-out {
        from {
            opacity: 0;
            background-size: 2016px 1029px;
        }
        to {
            opacity: 1;
            background-size: 1920px 980px;
        }
    }
`;

export const MemoPad = styled.img`
    margin-top: -36px;
    width: 430px;
    height: 756px;
`;

export const Alert = styled.p`
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 338px;
    text-align: center;
    color: #FF6868;
`;

export const RightButtonsWrapper = styled.div`
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: -32px;
    transform: translateX(100%);
    height: 720px;
    padding: 20px 0 125px;
`;

export const RightButton = styled.button`
    width: 66px;
    height: 66px;
    border-radius: 33px;
    box-shadow: 0px 2px 8px rgba(110, 106, 150, 0.24);
    transition: all 0.2s ease-in;
    background: rgba(255, 255, 255, 0.5);
    &:hover {
        box-shadow: 0px 2px 12px rgba(110, 106, 150, 0.50);
    }
`;

export const SortButton = styled(RightButton)<{isLatestSort:boolean}>`
    ${props => props.isLatestSort &&
        css`
        background-color: #fff;
    `}
`

export const LogoutButton = styled(RightButton)`
    background-color: #7B81A1;
    &:hover {
        background-color: #5162B9;
    }
`;
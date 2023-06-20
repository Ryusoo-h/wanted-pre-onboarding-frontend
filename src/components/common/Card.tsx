import { useRef } from "react";
import styled from "styled-components";

const CardBox = styled('div')<{degree:number, translateX:number, translateY:number}>`
    position: relative;
    width: 620px;
    height: 430px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(110, 106, 150, 0.4);
    transform: translate(${props=> props.translateX}%, ${props=> props.translateY}%) rotate(${props=> props.degree}deg);
    animation-duration: 0.7s;
    animation-name: smaller;
    transition-timing-function: ease-in-out;
    @keyframes smaller {
        from {
            transform: translate(${props=> props.translateX + 10}%, ${props=> props.translateY - 3}%) rotate(${props=> props.degree - 3}deg) scale(1.05);
        }
        to {
            transform: translate(${props=> props.translateX}%, ${props=> props.translateY}%) rotate(${props=> props.degree}deg);
        }
    }
`;
const CardWrapper = styled('div')<{degree: number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 336px;
    transform: translate(-50%, -50%) rotate(${props=> props.degree * -1 || 1}deg);
`;

type CardProps = {
    children: JSX.Element,
    degree?: number,
    translateX?: number,
    translateY?: number,
}

const Card = ({ children, ...rest }:CardProps) => {
    const degreeDefault = useRef<number>(-1);
    const translateX = useRef<number>(0);
    const translateY = useRef<number>(0);

    return (
        <CardBox 
            degree={rest.degree || degreeDefault.current}
            translateX={rest.translateX || translateX.current}
            translateY={rest.translateY || translateY.current}
        >
            <CardWrapper degree={rest.degree || degreeDefault.current}>
                { children }
            </CardWrapper>
        </CardBox>
    );
};

export default Card;
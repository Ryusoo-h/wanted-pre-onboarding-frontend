import { useRef } from "react";
import * as S from './Card.style';

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
        <S.CardBox 
            degree={rest.degree || degreeDefault.current}
            translateX={rest.translateX || translateX.current}
            translateY={rest.translateY || translateY.current}
        >
            <S.CardWrapper degree={rest.degree || degreeDefault.current}>
                { children }
            </S.CardWrapper>
        </S.CardBox>
    );
};

export default Card;
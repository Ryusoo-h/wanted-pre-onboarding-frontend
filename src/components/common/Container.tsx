
import * as S from './Container.style';

type ContainerType = {
    children: JSX.Element;
}

const Container = ({ children }:ContainerType) => {

    return (
        <S.ContainerWrapper>
            {children}
        </S.ContainerWrapper>
    );
}

export default Container;
import styled from "styled-components";

const ContainerWrapper = styled.section`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

type ContainerType = {
    children: JSX.Element;
}

const Container = ({ children }:ContainerType) => {

    return (
        <ContainerWrapper>
            {children}
        </ContainerWrapper>
    );
}

export default Container;
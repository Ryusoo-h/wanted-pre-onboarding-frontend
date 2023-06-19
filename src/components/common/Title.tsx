
import styled from "styled-components";

const TitleEl = styled.h1`
    margin: 0 auto;
    font-size: 32px;
    text-align: center;
    color: var(--green);
`;

const Title = () => {

    return <TitleEl className="font-net green">TODO LIST</TitleEl>;
}

export default Title;
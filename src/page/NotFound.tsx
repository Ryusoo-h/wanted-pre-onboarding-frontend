
import Container from "../components/common/Container";
import Card from "../components/common/Card";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
    text-align: center;
    h1 {
        color: #FC7171;
        font-size: 42px;
    }
    p {
        font-size: 20px;
    }
`;

const LinkButton = styled(Link)`
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

const NotFound = () => {
    return (
        <Container>
            <Card>
                <NotFoundWrapper>
                    <h1 className="font-net">404</h1>
                    <p>잘못된 경로입니다</p>
                    <LinkButton to="/todo" className="font-net">TODO LIST로 돌아가기</LinkButton>
                </NotFoundWrapper>
            </Card>
        </Container>
    );
};

export default NotFound;

import Container from "../components/common/Container";
import Card from "../components/common/Card";
import * as S from "./NotFound.style";

const NotFound = () => {
    return (
        <Container>
            <Card>
                <S.NotFoundWrapper>
                    <h1 className="font-net">404</h1>
                    <p>잘못된 경로입니다</p>
                    <S.LinkButton to="/todo" className="font-net">TODO LIST로 돌아가기</S.LinkButton>
                </S.NotFoundWrapper>
            </Card>
        </Container>
    );
};

export default NotFound;
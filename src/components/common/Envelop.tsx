
import Container from "./Container";
import Title from "./Title";
import * as S from './Envelop.style';

type EnvelopProps = {
    children: JSX.Element,
}

const Envelop = ({ children }:EnvelopProps) => {

    return (
        <Container>
            <S.EnvelopBox>
                <S.EnvelopWrapper>
                    <img id='envelop-top' src={`${process.env.PUBLIC_URL}/img/envelop.svg`} alt="envelop-top" />
                    
                    <S.SignInWrapper className="flex">
                        <Title />
                        <S.SubText className="font-net"><span>for</span> You</S.SubText>
                        {children}
                    </S.SignInWrapper>
                </S.EnvelopWrapper>
            </S.EnvelopBox>
        </Container>
    );
}

export default Envelop;
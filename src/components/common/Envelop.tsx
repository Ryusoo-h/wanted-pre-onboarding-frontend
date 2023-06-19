import styled from "styled-components";
import Container from "./Container";
import Title from "./Title";

const EnvelopBox = styled.section`
    width: 580px;
    height: 780px;
    padding-top: 210px;
    background: #FFFBF8;
    box-shadow: 0px 2px 15px rgba(110, 106, 150, 0.4);
    #envelop-top {
        max-width: 600px;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
    }
`;
const EnvelopWrapper = styled.div`
    margin: 40px auto;
    width: 336px;
`;

type EnvelopProps = {
    children: JSX.Element,
}

const SignInWrapper = styled.div`
    flex-direction: column;
    align-items: center;
`;
const SubText = styled.p`
    display: inline-block;
    font-size: 28px;
    color: #758281;
    transform: translateX(70%);
    span {
        font-size: 22px;
    }
`;
const Envelop = ({ children }:EnvelopProps) => {

    return (
        <Container>
            <EnvelopBox>
                <EnvelopWrapper>
                    <img id='envelop-top' src={`${process.env.PUBLIC_URL}/img/envelop.svg`} alt="envelop-top" />
                    
                    <SignInWrapper className="flex">
                        <Title />
                        <SubText className="font-net"><span>for</span> You</SubText>
                        {children}
                    </SignInWrapper>
                </EnvelopWrapper>
            </EnvelopBox>
        </Container>
    );
}

export default Envelop;
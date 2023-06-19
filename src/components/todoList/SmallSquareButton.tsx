import styled from "styled-components";

const ButtonEl = styled('button')<{color:string, hoverColor:string}>`
    width: 34px;
    height: 34px;
    padding: 4px;
    background-color: ${props => props.color};
    border-radius: 4px;
    &:hover {
        background-color: ${props => props.hoverColor};
    }
`;

type ButtonProps = {
    color: string,
    hoverColor: string,
    onClickButton: () => void,
    children: JSX.Element,
    dataTestid?: string,
}

const SmallSquareButton = ({ color, hoverColor, onClickButton, children, ...rest }:ButtonProps) => {
    
    return (
        <ButtonEl color={color} hoverColor={hoverColor} onClick={onClickButton} data-testid={rest.dataTestid}>
            {children}
        </ButtonEl>
    );
}

export default SmallSquareButton;
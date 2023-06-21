import * as S from './SmallSqureButton.style';

type ButtonProps = {
    color: string,
    hoverColor: string,
    onClickButton: () => void,
    children: JSX.Element,
    dataTestid?: string,
    disabled?: boolean,
}

const SmallSquareButton = ({ color, hoverColor, onClickButton, children, ...rest }:ButtonProps) => {
    
    return (
        <S.ButtonEl color={color} hoverColor={hoverColor} onClick={onClickButton} data-testid={rest.dataTestid} disabled={rest.disabled} >
            {children}
        </S.ButtonEl>
    );
}

export default SmallSquareButton;
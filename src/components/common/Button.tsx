
import * as S from './Button.style';

type ButtonProps = {
    children: JSX.Element,
    dataTestid?: string,
    disabled?: boolean,
    onFormSubmit?: (email:string, password:string) => void,
    email?:string,
    password?:string
}

const Button = ({ children, ...rest }:ButtonProps) => {

    return(
        <S.ButtonEl
            data-testid={rest.dataTestid} 
            className="font-net" 
            disabled={rest.disabled}
            onClick={(e) => {
                e.preventDefault();
                rest.onFormSubmit && rest.email && rest.password && rest.onFormSubmit(rest.email, rest.password);
            }}
        >
            { children }
        </S.ButtonEl>
    );
};

export default Button;
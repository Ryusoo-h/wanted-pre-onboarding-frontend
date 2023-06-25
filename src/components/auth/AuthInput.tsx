
import { inputInfoType } from "../../types/auth";

type AuthInputProps = {
    inputInfo: inputInfoType,
}

const AuthInput = ({ inputInfo }:AuthInputProps) => {
    
    return (
        <>
            <label htmlFor={inputInfo.id}>{inputInfo.label}</label>
            <input
                data-testid={inputInfo.dataTestid}
                type={inputInfo.type}
                id={inputInfo.id}
                className="font-basic"
                autoFocus={true}
                value={inputInfo.value}
                onChange={(e) => {inputInfo.onChange(e.target.value)}}
            />
        </>
    );
};

export default AuthInput;
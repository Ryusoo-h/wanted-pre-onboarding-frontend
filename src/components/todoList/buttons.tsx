import SmallSquareButton from "./SmallSquareButton";

type EachButtonProps = {
    dataTestid: string,
    onClickButton: () => void,
}

export const CheckButton = ({ dataTestid, onClickButton }:EachButtonProps) => {
    
    return (
        <SmallSquareButton 
            color="#91DBE0" 
            hoverColor="#14DDD1"
            onClickButton={onClickButton} 
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-check.svg`} alt="check-icon" />
        </SmallSquareButton>
    );
}

export const CancelButton = ({ dataTestid, onClickButton }:EachButtonProps) => {

    return (
        <SmallSquareButton
            color="#DDD"
            hoverColor="#AAA"
            onClickButton={onClickButton}
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-cancel.svg`} alt="cancel-icon" />
        </SmallSquareButton>
    );
}


export const ModifyButton = ({ dataTestid, onClickButton }:EachButtonProps) => {
    
    return (
        <SmallSquareButton
            color="#91DBE0"
            hoverColor="#14DDD1"
            onClickButton={onClickButton}
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-edit.svg`} alt="edit-icon" />
        </SmallSquareButton>
    );
}


export const DeleteButton = ({ dataTestid, onClickButton }:EachButtonProps) => {
    
    return (
        <SmallSquareButton
            color="#FFA5A5"
            hoverColor="#FF7B7B"
            onClickButton={onClickButton}
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-delete.svg`} alt="delete-icon" />
        </SmallSquareButton>
    );
}


import SmallSquareButton from "./SmallSquareButton";

type EachButtonProps = {
    dataTestid: string,
    onClickButton: () => void,
    disabled?: boolean,
}

// 수정 모드 - 수정 확정 버튼
export const CheckButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {
    
    return (
        <SmallSquareButton 
            color="#91DBE0" 
            hoverColor="#14DDD1"
            onClickButton={onClickButton} 
            dataTestid={dataTestid}
            disabled={rest.disabled}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-check.svg`} alt="check-icon" />
        </SmallSquareButton>
    );
}

// 수정 모드 - 수정 취소 버튼
export const CancelButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {

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


// 기본 투두 리스트 - 수정 버튼
export const ModifyButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {
    
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

// 기본 투두 리스트 - 삭제 버튼
export const DeleteButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {
    
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

// 삭제 모드 - 삭제 취소 버튼
export const DeleteCancelButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {

    return (
        <SmallSquareButton
            color="#C3C3C3"
            hoverColor="#9B9B9B"
            onClickButton={onClickButton}
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-cancel.svg`} alt="cancel-icon" />
        </SmallSquareButton>
    );
}

// 삭제 모드 - 삭제 확정 버튼
export const DeleteConfirmButton = ({ dataTestid, onClickButton, ...rest }:EachButtonProps) => {
    
    return (
        <SmallSquareButton
            color="#FC7171"
            hoverColor="#FF4141"
            onClickButton={onClickButton}
            dataTestid={dataTestid}
        >
            <img src={`${process.env.PUBLIC_URL}/img/icon/ic-check.svg`} alt="delete-icon" />
        </SmallSquareButton>
    );
}


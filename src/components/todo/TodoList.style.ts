
import styled, { css } from "styled-components";

export const TodoWrapper = styled.div`
    width: 338px;
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
`;

export const CheckWrapper = styled.div`
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    padding: 8px 5px 8px 2px;
    width: 37px;
    border-right: solid 3px var(--light-green);
`;
export const ButtonWrapper = styled.div`
    flex-shrink: 0;
    flex-grow: 0;
    width: 93px;
    padding: 8px;
    border-left: solid 3px var(--light-green);
    align-items: center;
`;

export const TodoBoxCommonStyle = styled('div')<{isModifingTodo:boolean}>`
    position: relative;
    z-index: 3;
    width: 100%;
    align-items: stretch;
    font-size: 20px;
    border-bottom: solid 3px var(--light-green);
    ${props => (props.isModifingTodo) &&
        css`
            z-index: 1;
            pointer-events: none;
    `}
    .text {
        align-items: center;
        flex-grow: 1;
    }
`;

export const TodoTopBox = styled(TodoBoxCommonStyle)<{isModifingTodo:boolean}>`
    margin-top: 20px;
    height: 54px;
    background-color: #FFFBF8;
    border-top: solid 3px var(--light-green);
    .text {
        padding: 11px 8px;
        font-size: 24px;
        color: #4D837F;
    }
`;

export const TodoListUl = styled.ul`
    max-height: 375px;
    width: 370px;
    padding: 16px;
    transform: translate(-16px, -16px);
    position: relative;
    z-index:2;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const TodoAddBox = styled(TodoBoxCommonStyle)<{isAddingNewTodo:boolean, isModifingTodo:boolean}>`
    height: 52px;
    background-color: #fff;
    border-top: solid 1px var(--light-green);
    transform: translateY(-32px);
    transition: box-shadow 0.2s ease-in-out;
    ${props => props.isAddingNewTodo &&
        css`
            z-index: 4;
            box-shadow: 0px 2px 12px rgba(110, 106, 150, 0.5);
    `}
    ${props => (props.isModifingTodo) &&
        css`
            filter: opacity(0.4);
    `}
    .text {
        input {
            width: 100%;
            padding: 10px 8px 6px;
            display: inline-block;
            line-height: 140%;
            word-spacing: -2px;
            font-size: 20px;
            border: none;
            outline: none;
        }
    }
`;

export const AddTodoInput = styled.input`
    &::placeholder {
        color: var(--light-green);
    }
`;
export const AddButton = styled.button`
    padding: 4px;
    width: 74px;
    border-radius: 4px;
    background-color: #91DBE0;
    color: #fff;
    font-size: 20px;
    &:hover {
        background-color: #14DDD1;
    }
    ${props =>
        props.disabled &&
        css`
            background-color: #EFEFEF;
            color: #CDCDCD;
            &:hover {
                background-color: #EFEFEF;
                color: #CDCDCD;
            }
    `}
`;

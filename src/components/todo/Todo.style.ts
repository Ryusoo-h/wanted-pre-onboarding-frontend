
import styled, { css } from 'styled-components';

export const TodoLi = styled('li')<{checked:boolean, isAddingNewTodo:boolean, isModifingTodo:boolean, isModify:boolean, isDelete:boolean}>`
    border-bottom: solid 1px var(--light-green);
    box-sizing: border-box;
    min-height: 50px;
    align-items: stretch;
    font-size: 20px;
    transition: opacity 0.2s ease-in-out;
    ${props => props.checked &&
        css`
            background-color: #EBFBE8;
    `}
    ${props => (props.isAddingNewTodo || props.isModifingTodo) &&
        css`
            filter: opacity(0.4);
            pointer-events: none;
    `}
    ${props => (props.isModify || props.isDelete) && 
        css`
            background-color: #fff;
            filter: opacity(1);
            pointer-events: auto;
            box-shadow: 0px 2px 12px rgba(110, 106, 150, 0.5);
            position: relative;
            z-index: 2;
    `}
    ${props => props.isDelete &&
        css`
            box-shadow: 0px 2px 16px rgba(255, 36, 36, 0.69);
            border-top: solid 3px #FC7171;
            border-bottom: solid 1px #ddd;
            transform: translateY(-2px);
            span {
                border: none;
                &:not(:last-child) {
                    border-right: solid 3px #ddd;
                }
            }
    `}
`;

export const CheckBoxWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    align-items: stretch;
    padding: 8px 4px;
    width: 37px;
    border-right: solid 3px var(--light-green);
`;
export const CheckBox = styled('input')<{path:string}>`
    width: 26px;
    height: 100%;
    position: relative;
    &:checked::after {
        content: '';
        display: block;
        width: 26px;
        height: 26px;
        background-image: url(${props => props.path});
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const TextWrapper = styled.span`
    align-items: center;
    flex-grow: 1;
    .text {
        width: 100%;
        padding: 10px 8px 6px;
        display: inline-block;
        line-height: 140%;
        word-spacing: -2px;
        font-size: 20px;
        border: none;
        outline: none;
        word-break: break-all;
    }
`;

export const ButtonWrapper = styled.span`
    flex-shrink: 0;
    flex-grow: 0;
    padding: 0 8px;
    border-left: solid 3px var(--light-green);
    align-items: center;
    gap: 6px;
`;

export const BinIcon = styled.img`
    width: 26px;
    height: 30px;
`;
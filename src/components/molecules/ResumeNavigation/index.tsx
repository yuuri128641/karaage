import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { mediaQuery } from "@/styles/const/size"

type ResumeNavigationProps = {
    jobIndex: number
    maxJobLength: number
    setJob: any
};

const ButtonWrap = styled.div`
    display: flex;
    gap: 40px;
`

const ReturnButton = styled.button<{isActive: boolean}>`
    display: inline-flex;
    border: 0;
    background-color: transparent;
    padding: 0;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    color: ${colorPalette.blue400};
    visibility: ${({ isActive }) =>  isActive ? "visible" : "hidden" }; 
    pointer-events: ${({ isActive }) =>  isActive ? "auto" : "none" };
    cursor: ${({ isActive }) =>  isActive ? "pointer" : "auto" };
    &::before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 10px 5px 0;
        border-color: transparent ${colorPalette.blue400} transparent transparent;
    }
    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
    }
`

const NextButton = styled.button<{isActive: boolean}>`
    display: inline-flex;
    border: 0;
    background-color: transparent;
    padding: 0;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    color: ${colorPalette.blue400};
    visibility: ${({ isActive }) =>  isActive ? "visible" : "hidden" }; 
    pointer-events: ${({ isActive }) =>  isActive ? "auto" : "none" };
    cursor: ${({ isActive }) =>  isActive ? "pointer" : "auto" };
    &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 10px;
        border-color: transparent transparent transparent ${colorPalette.blue400};
    }
    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
    }
`

export const ResumeNavigation: React.FC<ResumeNavigationProps> = ({ jobIndex, maxJobLength, setJob }) => {
    const [isReturnButtonActive, setIsReturnButtonActive] = useState(false)
    const [isNextButtonActive, setIsNextButtonActive] = useState(false)

    // 戻るボタンクリック時
    const returnJobIndex = () => {
        if(jobIndex !== 0) {
            const index = jobIndex - 1
            setJob(index)
        }
    }

    // 次へボタンクリック時
    const nextJobIndex = () => {
        if(jobIndex !== maxJobLength) {
            const index = jobIndex + 1
            setJob(index)
        }
    }

    useEffect(() => {
        // 初期状態のボタンの設定
        if(jobIndex === 0) {
            setIsReturnButtonActive(false)
            setIsNextButtonActive(true)
        } else if(jobIndex === maxJobLength) {
            setIsReturnButtonActive(true)
            setIsNextButtonActive(false)
        } else {
            setIsReturnButtonActive(true)
            setIsNextButtonActive(true)
        }
    }, [jobIndex, maxJobLength])

    return (
        <ButtonWrap>
            <ReturnButton 
                onClick={returnJobIndex}
                isActive={isReturnButtonActive}
                type="button"
            >
                RETURN
            </ReturnButton>
            <NextButton 
                onClick={nextJobIndex}
                isActive={isNextButtonActive}
                type="button"
            >
                NEXT
            </NextButton>
        </ButtonWrap>
    );
}

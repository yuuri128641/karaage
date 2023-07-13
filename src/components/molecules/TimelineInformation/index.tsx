import React, { useState } from "react"
import styled from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { mediaQuery } from "@/styles/const/size"

const Information = styled.div<{isOpen: boolean}>`
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid ${colorPalette.lightGray600};
    box-sizing: border-box;
    padding: 12px;
    max-width: calc(100% - 40px);
    width: ${({ isOpen }) =>  isOpen ? "auto" : "58px"};
    display: inline-flex;
    border-radius: ${({ isOpen }) =>  isOpen ? "0" : "9999px"};
`

const InformationText = styled.div<{isOpen: boolean}>`
    font-size: 12px;
    line-height: 1.6;
    visibility: ${({ isOpen }) =>  isOpen ? "visible": "hidden"};
    position: ${({ isOpen }) =>  isOpen ? "relative" : "absolute"};
`

const InformationButton = styled.button<{isOpen: boolean}>`
    border: none;
    background-color: transparent;
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    transform:  ${({ isOpen }) =>  isOpen ? "rotate(45deg)" : "rotate(90deg)" };

    &::before,
    &::after {
        content: "";
        width: 100%;
        height: 4px;
        background-color: ${colorPalette.lightGray600};
        position: absolute;
        display: block;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    
    &::before {
        transform: rotate(90deg);
    }

    &::after {
        transform: rotate(0);
    }

    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
    }
`

const InformationTagWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`

const InformationTagDev = styled.div`
    background-color: ${colorPalette.blue200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagDes = styled.div`
    background-color: ${colorPalette.jobDes200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagDir = styled.div`
    background-color: ${colorPalette.jobDir200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagAll = styled.div`
    background-color: ${colorPalette.jobAll200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagOther = styled.div`
    background-color: ${colorPalette.jobOther200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

export const TimelineInformation: React.FC = () => {
    const [navigation, setNavigation] = useState(true)
    const toggleNavigation = () => setNavigation(!navigation)

    return (
        <Information isOpen={navigation}>
            <InformationText isOpen={navigation}>
                職務経歴書は右上のボタンで開閉できます。<br/>
                各タイムラインをクリックすることで詳細な職務経歴の閲覧が可能です。
                <InformationTagWrap>
                    <InformationTagDev>開発</InformationTagDev>
                    <InformationTagDes>デザイン</InformationTagDes>
                    <InformationTagDir>企画</InformationTagDir>
                    <InformationTagAll>全工程</InformationTagAll>
                    <InformationTagOther>その他</InformationTagOther>
                </InformationTagWrap>
            </InformationText>
            <InformationButton
                isOpen={navigation}
                onClick={toggleNavigation}
                type="button"
            />
        </Information>
    );
};
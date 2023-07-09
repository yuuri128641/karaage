import React from "react"
import styled from "styled-components";
import { mediaQuery } from "@/styles/const/size"

type SampleTitleProps = {
    title: string; // タイトルテキスト
    className?: string;
};

const StyledSampleTitle = styled.h3`
    display: flex;
    align-items: center;
    font-size: 60px;
    font-weight: 700;
    background-color: red;
    ${mediaQuery.pc} {
        font-size: 60px;
        background-color: blue;
    }

    &::before,
    &::after {
        display: block;
        width: 100%;
        max-width: 50%;
        height: 1px;
        content: "";
    }

    &::before {
        flex: 1;
        margin-right: 42px;
    }

    &::after {
        flex: 1;
        margin-left: 42px;
    }
`;

export const SampleLabel: React.FC<SampleTitleProps> = ({ title, className }) => {
    return <StyledSampleTitle className={className}>{title}</StyledSampleTitle>;
};
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
    background-color: #999;
    ${mediaQuery.lg} {
        font-size: 60px;
        background-color: #666;
        color: #fff;
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

export const SampleTitle: React.FC<SampleTitleProps> = ({ title, className }) => {
    return <StyledSampleTitle as="div" className={className}>{title}</StyledSampleTitle>;
};
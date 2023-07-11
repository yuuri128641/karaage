import React from "react"
import styled from "styled-components";
import { mediaQuery } from "@/styles/const/size"

type TitleProps = {
    title: string
    className?: string
    variant?: "div" | "h1" | "h2" | "h3" | "h4" | "h5"
};

const StyledPageTitle = styled.div`
    font-size: 60px;
    letter-spacing: 0.2em;
`

export const PageTitle: React.FC<TitleProps> = ({ title, className, variant = "div" }) => {
    return <StyledPageTitle as={variant} className={className}>{title}</StyledPageTitle>;
};
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { colorPalette } from "@/styles/const/color"
import { mediaQuery } from "@/styles/const/size"

const HeaderStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    ${mediaQuery.underPc} {
        height: 100%;
    }
`

const Title = styled.h1`
    font-size: 20px;
    letter-spacing: 0.4em;
    background-color: ${colorPalette.blue400};
    padding: 0 20px;
    height: 60px;
    color: ${colorPalette.white};
    gap: 20px;
    display: flex;
    align-items: center;
    ${mediaQuery.underPc} {
        font-size: 14px;
        gap: 4px;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
    }
`;

const TitleName = styled.span`
    display: inline;
    ${mediaQuery.underPc} {
        display: block;
    }
`

const Button = styled.button<{isOpen: boolean }>`
    width: 80px;
    height: 80px;
    top: 0;
    border: 0;
    right: 20px;
    position: fixed;
    z-index: 1200;
    background-color: transparent;
    padding: 0;
    ${mediaQuery.pc} {
        display: none;
    }
`;

const ButtonLine = styled.span<{isOpen: boolean }>`
    width: 100%;
    height: 4px;
    background-color: ${colorPalette.blue400};
    position: absolute;
    right: 0;
    margin: auto;
    transition: all 0.3s ease;
    &:nth-child(1) {
        top: ${({ isOpen }) =>  isOpen ? "20px" : "0" }; 
        bottom: ${({ isOpen }) =>  isOpen ? "auto" : "0" }; 
        transform: ${({ isOpen }) =>  isOpen ? "rotate(0)" : "rotate(45deg)" }; 
    }
    &:nth-child(2) {
        top: 0;
        bottom: 0;
        width: ${({ isOpen }) =>  isOpen ? "80" : "100" }%; 
        height: ${({ isOpen }) =>  isOpen ? "4" : "0" }px; 
    }
    &:nth-child(3) {
        width: ${({ isOpen }) =>  isOpen ? "60" : "100" }%; 
        bottom: ${({ isOpen }) =>  isOpen ? "20px" : "0" };
        top: ${({ isOpen }) =>  isOpen ? "auto" : "0" };  
        transform: ${({ isOpen }) =>  isOpen ? "rotate(0)" : "rotate(-45deg)" }; 
    }
`

const LinkWrap = styled.div<{isOpen: boolean }>`
    display: flex;
    gap: 20px;
    padding-top: 8px;
    font-size: 16px;
    letter-spacing: 0.4em;
    flex-flow: column;
    padding: 0 20px;
    ${mediaQuery.pc} {
        padding-top: 20px;
    }
    ${mediaQuery.underPc} {
        height: 100%;
        box-sizing: border-box;
        right: ${({ isOpen }) =>  isOpen ? "-220px" : 0 }; 
        position: fixed;
        width: 220px;
        text-align: right;
        top: 0;
        padding-top: 120px;
        background-color: rgba(255, 255, 255, 0.7);
        transition: all 0.3s ease;
    }
`;

const LinkItem = styled.div`
    & a {
        color: ${colorPalette.blue400};
        text-decoration: none;
        ${mediaQuery.pc} {
            &:hover {
                opacity: 0.7;
            }
        }
    }
`;

export const Header: React.FC = () => {
    const [open, setOpen] = useState(true)
    const toggleTimeline = () => setOpen(!open)
    return (
        <HeaderStyle>
            <Title><TitleName>annris</TitleName>PORTFOLIO</Title>
            <Button
                onClick={toggleTimeline}
                isOpen={open}
            >
                <ButtonLine isOpen={open} />
                <ButtonLine isOpen={open} />
                <ButtonLine isOpen={open} />
            </Button>
            <LinkWrap isOpen={open}>
                <LinkItem>
                    <Link href="/profile">PROFILE</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="">RESUME</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="">WORKS</Link>
                </LinkItem>
                <LinkItem>
                    <a 
                        href="https://github.com/yuuri128641"
                        target="_blank" 
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </LinkItem>
            </LinkWrap>
        </HeaderStyle>
    );
}

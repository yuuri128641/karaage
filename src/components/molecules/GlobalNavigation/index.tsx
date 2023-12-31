import React, { useState } from "react";
import styled from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { mediaQuery } from "@/styles/const/size"

type GlobalNavigationProps = {
    setJob: any
    setContent: any
    toggleTimeline: any
    setOpen: any
    maxJobLength: number
};

const Title = styled.h1`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    font-size: 20px;
    letter-spacing: 0.4em;
    background-color: ${colorPalette.blue400};
    padding: 0 20px;
    height: 60px;
    color: ${colorPalette.white};
    gap: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    ${mediaQuery.underPc} {
        font-size: 14px;
        gap: 4px;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
    }
    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
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
    box-shadow: 2px 2px 0px 2px ${colorPalette.white};

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
    position: fixed;
    z-index: 400;
    background-color: rgba(255, 255, 255, 0.9);
    height: 100%;
    ${mediaQuery.pc} {
        padding-top: 20px;
        top: 60px;
    }

    ${mediaQuery.underPc} {
        z-index: 1000;
        box-sizing: border-box;
        right: ${({ isOpen }) =>  isOpen ? "-220px" : 0 }; 
        width: 220px;
        text-align: right;
        top: 0;
        padding-top: 120px;
        transition: all 0.3s ease;
    }
`;

const LinkItem = styled.div`
    color: ${colorPalette.blue400};
    cursor: pointer;
    letter-spacing: 0.4em;

    & a {
        color: ${colorPalette.blue400};
        text-decoration: none;
    }

    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
    }
`;

const LoginLink = styled.button`
    margin-top: 20px;
    color: ${colorPalette.blue400};
    border: 1px solid ${colorPalette.blue400};
    padding: 4px calc(12px - 0.4em) 4px 12px;
    background-color: ${colorPalette.white};
    font-size: 16px;
    letter-spacing: 0.4em;
    display: inline-flex;
    width: fit-content;
    justify-content: center;
    ${mediaQuery.pc} {
        &:hover {
            opacity: 0.7;
        }
    }
    ${mediaQuery.underPc} {
        width: 100%;
    }
`

export const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ setJob, setContent, setOpen, maxJobLength }) => {
    const [menuOpen, setMenuOpen] = useState(true)
    const toggleMenu = () => setMenuOpen(!menuOpen)
    return (
        <>
            <Title
                onClick={() => {
                    setJob()
                    setContent()
                    setMenuOpen(true)
                    setOpen(true)
                }}
            >
                <TitleName>annris</TitleName>
                PORTFOLIO
            </Title>
            <Button
                onClick={toggleMenu}
                isOpen={menuOpen}
                type="button"
            >
                <ButtonLine isOpen={menuOpen} />
                <ButtonLine isOpen={menuOpen} />
                <ButtonLine isOpen={menuOpen} />
            </Button>
            <LinkWrap isOpen={menuOpen}>
                <LinkItem
                    onClick={() => {
                        setJob()
                        setContent("profile")
                        toggleMenu()
                        setOpen(false)
                    }}
                >
                    PROFILE
                </LinkItem>
                <LinkItem
                    onClick={() => {
                        setJob()
                        setContent("resume")
                        toggleMenu()
                        setOpen(false)
                    }}
                >
                    RESUME
                </LinkItem>
                <LinkItem
                    onClick={() => {
                        setJob(maxJobLength)
                        setContent("jobHistory")
                        toggleMenu()
                        setOpen(true)
                    }}
                >
                    JOB TIMELINE
                </LinkItem>
                {/* <LinkItem
                    onClick={() => {
                        setJob()
                        setContent("works")
                        toggleTimeline()
                    }}
                >
                    WORKS
                </LinkItem> */}
                <LinkItem>
                    <a 
                        href="https://github.com/yuuri128641"
                        target="_blank" 
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </LinkItem>
                <LoginLink
                    type="button"
                    onClick={() => {
                        setJob()
                        setContent("login")
                        toggleMenu()
                        setOpen(false)
                    }}
                >
                    LOGIN
                </LoginLink>
            </LinkWrap>
        </>
    );
}

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { colorPalette } from "@/styles/const/color"
import { mediaQuery } from "@/styles/const/size"

const HeaderStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
`

const Title = styled.h1`
    font-size: 20px;
    letter-spacing: 0.4em;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    color: ${colorPalette.blue400};
`;

const LinkWrap = styled.div`
    display: flex;
    gap: 20px;
    padding-top: 8px;
    font-size: 16px;
    letter-spacing: 0.4em;
    flex-flow: column;
    margin-left: 20px;
    margin-top: 20px;
`;

const LinkItem = styled.div`
    & a {
        color: ${colorPalette.blue400};
        text-decoration: none;
        ${mediaQuery.lg} {
            &:hover {
                opacity: 0.7;
            }
        }
    }
`;

export const Header: React.FC = () => {
    return (
        <HeaderStyle>
            <Title>YUURI SUZUKI  PORTFOLIO</Title>
            <LinkWrap>
                <LinkItem><Link href="">PROFILE</Link></LinkItem>
                <LinkItem><Link href="">RESUME</Link></LinkItem>
                <LinkItem><Link href="">WORKS</Link></LinkItem>
                <LinkItem><Link href="">GitHub</Link></LinkItem>
            </LinkWrap>
        </HeaderStyle>
    );
}

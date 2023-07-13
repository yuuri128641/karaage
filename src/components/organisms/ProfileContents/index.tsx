import React from "react";
import styled from "styled-components";
import { Profile } from "@/models"
import { PageTitle } from "@/components/atoms/PageTitle"
import { colorPalette } from "@/styles/const/color"

type Props = {
    profile: Profile
    login: boolean
};

const Wrap = styled.div`
    margin-top: 40px;
`

const Section = styled.section`
    margin-top: 80px;
    &:first-child {
        margin-top: 0;
    }
`

const ContentWrap = styled.div`
    margin-top: 40px;
    &:first-child {
        margin-top: 0;
    }
`

const ContentTitle = styled.h3`
    font-size: 24px;
`

const NormalText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-top: 16px;
`

const LoginText = styled.span`
    color: ${colorPalette.blue500};
    margin-left: 20px;
`

export const ProfileContents: React.FC<Props>= ({ profile, login }) => {
    return (
        <>
            <PageTitle title="PROFILE" />
            <Wrap>
                <Section>
                    <ContentWrap>
                        <ContentTitle>
                            {profile.openName}
                            {login &&
                                <>
                                    <LoginText>
                                        {profile.closeName}
                                    </LoginText>
                                </>
                            }
                        </ContentTitle>
                        <NormalText>{profile.profileText}</NormalText>
                    </ContentWrap>
                    <ContentWrap>
                        <ContentTitle>LIKE</ContentTitle>
                        <NormalText>
                            {profile.hobby}
                        </NormalText>
                    </ContentWrap>
                </Section>
            </Wrap>
        </>
    );
}

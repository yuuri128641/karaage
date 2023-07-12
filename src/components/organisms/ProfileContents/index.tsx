import React from "react";
import styled from "styled-components";
import { Profile } from "@/models"
import { PageTitle } from "@/components/atoms/PageTitle"

type Props = {
    profile: Profile
};

const Wrap = styled.div`
    padding-top: 40px;
`

const Section = styled.section`
    margin-top: 80px;
    &:first-child {
        margin-top: 0;
    }
`

const ContentWrap = styled.div`
    margin-top: 40px;
`

const ContentTitle = styled.h3`
    font-size: 24px;
`

const NormalText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    max-width: 720px;
    margin-top: 16px;
`

export const ProfileContents: React.FC<Props>= ({ profile }) => {
    return (
        <>
            <PageTitle title="PROFILE" />
            <Wrap>
                <Section>
                    <ContentWrap>
                        <ContentTitle>{profile.openName}</ContentTitle>
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

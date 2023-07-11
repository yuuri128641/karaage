import React from "react";
import styled, {keyframes} from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { Profile } from "@/models"
import { PageTitle } from "@/components/atoms/PageTitle"
import { SkillList } from "@/components/molecule/SkillList"

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

const CompanyList = styled.ul`
    list-style: none;
    margin-top: 16px;
`

const CompanyItem = styled.li`
    display: flex;
    gap: 20px;
    margin-top: 12px;
    font-size: 14px;
    &:first-child {
        margin-top: 0;
    }
`

const CompanyDate = styled.span`
    width: 200px;
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
                <Section>
                    <ContentWrap>
                        <ContentTitle>OVERVIEW</ContentTitle>
                        <CompanyList>
                            {profile.companyHistory.map(({date, openCompany, outline}, index) => (
                                <CompanyItem key={index}>
                                    <CompanyDate>{date}</CompanyDate>
                                    <span>{openCompany}{outline && `（${outline}）`}</span>
                                </CompanyItem>
                            ))}
                        </CompanyList>
                    </ContentWrap>
                </Section>
                <Section>
                    <ContentWrap>
                        <ContentTitle>DEVELOPMENT SKILL</ContentTitle>
                        <SkillList skillList={profile.devSkill} />
                    </ContentWrap>
                    <ContentWrap>
                        <ContentTitle>OTHER DEVELOPMENT SKILL</ContentTitle>
                        <SkillList skillList={profile.otherDevSkill} />
                    </ContentWrap>
                    <ContentWrap>
                        <ContentTitle>DESIGN SKILL</ContentTitle>
                        <SkillList skillList={profile.designSkill} />
                    </ContentWrap>
                    <ContentWrap>
                        <ContentTitle>OTHER CREATIVE SKILL</ContentTitle>
                        <SkillList skillList={profile.videoSkill} />
                    </ContentWrap>
                    <ContentWrap>
                        <ContentTitle>ALL OTHER SKILL</ContentTitle>
                        <SkillList skillList={profile.otherSkill} />
                    </ContentWrap>
                </Section>
            </Wrap>
        </>
    );
}

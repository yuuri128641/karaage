import React from "react";
import styled from "styled-components";
import { Profile } from "@/models"
import { PageTitle } from "@/components/atoms/PageTitle"
import { SkillList } from "@/components/molecules/SkillList"
import { mediaQuery } from "@/styles/const/size"
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

const CompanyList = styled.ul`
    list-style: none;
    margin-top: 16px;
    ${mediaQuery.underPc} {
        margin-top: 20px;
    }
`

const CompanyItem = styled.li`
    display: flex;
    gap: 20px;
    margin-top: 12px;
    font-size: 14px;
    &:first-child {
        margin-top: 0;
    }
    ${mediaQuery.underPc} {
        flex-flow: column;
        gap: 4px;
    }
`

const CompanyDate = styled.span`
    width: 200px;
`

const LoginText = styled.span`
    color: ${colorPalette.blue500};
`

const NoteText = styled.p`
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-top: 16px;
`

export const ResumeContents: React.FC<Props>= ({ profile, login }) => {
    return (
        <>
            <PageTitle title="RESUME" />
            <Wrap>
                <Section>
                    <ContentWrap>
                        <ContentTitle>OVERVIEW</ContentTitle>
                        <CompanyList>
                            {profile.companyHistory.map(({date, openCompany, certifiedCompany, outline}, index) => (
                                <CompanyItem key={index}>
                                    <CompanyDate>{date}</CompanyDate>
                                    <span>
                                        {login ? <LoginText>{certifiedCompany}</LoginText> : openCompany}
                                        {outline && `（${outline}）`}
                                    </span>
                                </CompanyItem>
                            ))}
                        </CompanyList>
                        <NoteText>
                            {profile.companyHistoryNote}
                        </NoteText>
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

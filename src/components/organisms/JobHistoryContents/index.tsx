import React from "react";
import styled from "styled-components";
import { JobHistoryFormat } from "@/models"
import { ResumeNavigation } from "@/components/molecule/ResumeNavigation"
import { createHistoryDate } from "@/utils/createHistoryDate";

type Props = {
    jobDateItem: JobHistoryFormat
    setJob: any
    maxJobLength: number
    jobIndex: number
};

const Wrap = styled.div`
    position: relative;
`

const Section = styled.section`
    margin-top: 40px;
    &:first-child {
        margin-top: 0;
    }
`

const DateText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    margin-top: 16px;
`

const SectionTitle = styled.h3`
    font-size: 28px;
    line-height: 1.6;
`

const ContentWrap = styled.div`
    margin-top: 40px;
    &:first-child {
        margin-top: 0;
    }
`

const ContentTitle = styled.h3`
    font-size: 20px;
    line-height: 1.6;
`

const ContentSubTitle = styled.h4`
    font-size: 16px;
    line-height: 1.6;
`

const AchievementWrap = styled.div`
    margin-top: 32px;
    &:first-child {
        margin-top: 16px;
    }
`

const NormalText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-top: 16px;
    &:first-child {
        margin-top: 0;
    }
`

const AchievementText = styled.p`
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    margin-top: 8px;
    &:first-child {
        margin-top: 0;
    }
`

const NavigationWrap = styled.div`
    //margin-top: 20px;
    //position: absolute;
    //right: 0;
`

export const JobHistoryContents: React.FC<Props>= ({ jobDateItem, setJob, maxJobLength, jobIndex }) => {
    return (
        <>
            <Wrap>
                <Section>
                    <NavigationWrap>
                        <ResumeNavigation
                            jobIndex={jobIndex}
                            maxJobLength={maxJobLength}
                            setJob={setJob}
                        />
                    </NavigationWrap>
                    <DateText>{createHistoryDate(jobDateItem.startDate)} 〜 {createHistoryDate(jobDateItem.endDate)}</DateText>
                    <SectionTitle>{jobDateItem.title}</SectionTitle>
                </Section>
                <Section>
                    {jobDateItem.inChangeOf &&
                        <ContentWrap>
                            <ContentTitle>担当フェーズ</ContentTitle>
                            <NormalText>{jobDateItem.inChangeOf}</NormalText>
                        </ContentWrap>
                    }
                    {jobDateItem.role &&
                        <ContentWrap>
                            <ContentTitle>役割</ContentTitle>
                            <NormalText>{jobDateItem.role}</NormalText>
                        </ContentWrap>
                    }
                    {jobDateItem.technology &&
                        <ContentWrap>
                            <ContentTitle>利用技術</ContentTitle>
                            <NormalText>{jobDateItem.technology}</NormalText>
                        </ContentWrap>
                    }
                    {jobDateItem.structure &&
                        <ContentWrap>
                            <ContentTitle>体制</ContentTitle>
                            <NormalText>{jobDateItem.structure}</NormalText>
                        </ContentWrap>
                    }
                    {jobDateItem.businessContent &&
                        <ContentWrap>
                            <ContentTitle>業務内容</ContentTitle>
                            <NormalText>{jobDateItem.businessContent}</NormalText>
                        </ContentWrap>
                    }
                    {jobDateItem.achievement.length !== 0 &&
                        <ContentWrap>
                            <ContentTitle>実績・取り組み</ContentTitle>
                            <div>
                                {jobDateItem.achievement.map((item, index) => (
                                    <AchievementWrap key={index}>
                                        {item.title && 
                                            <ContentSubTitle>「{item.title}」</ContentSubTitle>
                                        }
                                            <AchievementText>{item.contents}</AchievementText>
                                    </AchievementWrap>
                                ))}
                            </div>
                            
                        </ContentWrap>
                    }
                    {jobDateItem.result &&
                        <ContentWrap>
                            <ContentTitle>成果</ContentTitle>
                            <NormalText>{jobDateItem.result}</NormalText>
                        </ContentWrap>
                    }
                </Section>
            </Wrap>
        </>
    );
}

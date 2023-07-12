import React from "react";
import styled from "styled-components";
import { ProfileSkill } from "@/models"
import { mediaQuery } from "@/styles/const/size"

type SkillListProps = {
    skillList: ProfileSkill[]
};

const SkillListStyle = styled.ul`
    list-style: none;
    margin-top: 16px;
`

const SkillItem = styled.li`
    display: flex;
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.6;
    &:first-child {
        margin-top: 0;
    }
`

const SkillItemWrap = styled.div`
    display: inline-flex;
    ${mediaQuery.underPc} {
        flex-flow: column;
    }
`

const SkillItemTitle = styled.span`
    width: 160px;
`

const SkillItemYear = styled.span`
    width: 60px;
    ${mediaQuery.underPc} {
        font-size: 12px;
    }
`

const SkillItemText = styled.span`
    flex: 1;
    white-space: pre-wrap;
`

export const SkillList: React.FC<SkillListProps> = ({skillList }) => {
    return (
        <SkillListStyle>
            {skillList.map(({title, content, year}, index) => (
                <SkillItem key={index}>
                    <SkillItemWrap>
                        <SkillItemTitle>{title}</SkillItemTitle>
                        <SkillItemYear>{year && `${year}年`}</SkillItemYear>
                    </SkillItemWrap>
                    <SkillItemText>{content}</SkillItemText>
                </SkillItem>
            ))}
        </SkillListStyle>
    );
}

import React from "react"
import styled, { keyframes } from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { JobHistoryFormat } from "@/models"
import { mediaQuery } from "@/styles/const/size"

type TimelineBarProps = {
    job: JobHistoryFormat
    setJob?: any
    setContent?: any
    jobIndex?: number
    itemIndex: number
};

type optionsProps = {
    backgroundColor: string
    borderColor: string
};

const options: Record<string, optionsProps> = {
    develop: {
        backgroundColor: colorPalette.blue200,
        borderColor: colorPalette.blue400,
    },
    design: {
        backgroundColor: colorPalette.jobDes200,
        borderColor: colorPalette.jobDes400,
    },
    direction: {
        backgroundColor: colorPalette.jobDir200,
        borderColor: colorPalette.jobDir400,
    },
    all: {
        backgroundColor: colorPalette.jobAll200,
        borderColor: colorPalette.jobAll400,
    },
    other: {
        backgroundColor: colorPalette.jobOther200,
        borderColor: colorPalette.jobOther400,
    },
};

const MONTH_WIDTH = 40;

const pop = keyframes`
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.05, 1.05);
    }
    
    100% {
        transform: scale(1, 1);
    }
`

const ProjectItem = styled.div<{
    durationLength: number
    startPositionLength: number
    duplicationEventLength: number
    themeStyle: optionsProps
    isActive: boolean
}>`
    width: ${({ durationLength }) =>  durationLength && (durationLength + 1) * MONTH_WIDTH - 2 }px;
    height: 40px;
    color: ${colorPalette.white};
    display: flex;
    line-height: 1;
    font-size: 14px;
    padding: 4px;
    box-sizing: border-box;
    position: absolute;
    left: ${({ startPositionLength }) =>  startPositionLength && startPositionLength * MONTH_WIDTH }px;
    top: ${({ duplicationEventLength }) =>  duplicationEventLength ? (duplicationEventLength * 44 + 4) : 4 }px;
    border-radius: 4px;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: opacity 0.3s ease;
    animation: ${({isActive}) => isActive && pop } .5s ease-in-out forwards;
    background-color: ${({ themeStyle, isActive }: { themeStyle: optionsProps, isActive: boolean }) => isActive ? themeStyle.borderColor : themeStyle.backgroundColor};
    ${mediaQuery.pc} {
        &:hover {
            opacity: ${({ isActive }) =>  isActive ? 1 : 0.7 };
        }
    }
` 

const ProjectTitle = styled.div`
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`

const TagItem = styled.span<{themeStyle: optionsProps}>`
    display: inline-flex;
    margin-right: 4px;
    height: 20px;
    background-color: ${colorPalette.white};
    color: ${colorPalette.blue400};
    align-items: center;
    line-height: 1;
    font-size: 12px;
    padding: 0 2px;
    border: 1px solid ${colorPalette.blue400};
    border: 1px solid ${({ themeStyle }: { themeStyle: optionsProps }) => themeStyle.borderColor};
` 

export const TimelineBar: React.FC<TimelineBarProps> = ({ job, itemIndex, setJob, setContent, jobIndex }) => {
    return (
        <ProjectItem 
            durationLength={job.projectDurationLength}
            startPositionLength={job.jobStartTime}
            duplicationEventLength={job.duplicationEventLength}
            themeStyle={options[job.jobCategory]}
            onClick={() => {
                setJob(itemIndex)
                setContent("jobHistory")
            }}
            isActive={itemIndex === jobIndex && true}
        >
            <ProjectTitle>
                {job.title}
            </ProjectTitle>
            {job.projectDurationLength !== 0 && job.tag &&
                <TagItem themeStyle={options[job.jobCategory]}>{job.tag}</TagItem>
            }
        </ProjectItem>
    );
};
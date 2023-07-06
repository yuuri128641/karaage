import React, { useEffect , useRef} from "react"
import styled from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { createDurationDate } from "@/utils/createDurationDate"
import { FIRST_WORKING_DATE } from "site.config"
import { JobHistoryFormat } from "@/models"

type TimeLineProps = {
    jobDate?: JobHistoryFormat[];
};

const MONTH_WIDTH = 40;

const TimeLineWrap = styled.div`
    width: 100%;
    height: 360px;
    background-color: ${colorPalette.lightGray100};
    position: fixed;
    bottom: 0;
    overflow-x: auto;
    box-shadow: 0px 0px 20px -8px #bababa;
    overflow-y: hidden;
`;

const DateWap = styled.div`
    display: flex;
    height: 700%;
    padding: 4px;

`;

const DateItem = styled.div<{isJanuary: boolean}>`
    display: flex;
    flex-flow: column;
    min-width: ${MONTH_WIDTH}px;
    position: relative;
    height: 100%;
    padding: 4px 0;
    box-sizing: border-box;
    border-left: ${({ isJanuary }) =>  isJanuary && "1px solid" } ${colorPalette.lightGray200};
`;

const CurrentText = styled.div`
    font-size: 20px;
    white-space: nowrap;
    position: absolute;
    top: 0;
    padding-right: 4px;
    font-weight: 700;
    color: ${colorPalette.lightGray600};
    right: 0;
`;

const YearText = styled.div`
    font-size: 20px;
    white-space: nowrap;
    position: absolute;
    top: 0;
    color: ${colorPalette.lightGray600};
    padding-left: 4px;
`;

const DayText = styled.div`
    padding-top: 28px;
    white-space: nowrap;
    font-size: 12px;
    padding-left: 4px;
    color: ${colorPalette.lightGray600};
`;

const ProjectArea = styled.div`
    position: absolute;
    top: 52px;
    width: 100%;
`

const ProjectItem = styled.div<{
    durationLength: number
    startPositionLength: number
    duplicationEventLength: number
}>`
    width: ${({ durationLength }) =>  durationLength && (durationLength +1) * MONTH_WIDTH - 2 }px;
    height: 40px;
    background-color: ${colorPalette.blue200};
    color: ${colorPalette.white};
    display: flex;
    line-height: 1;
    font-size: 14px;
    padding: 4px;
    box-sizing: border-box;
    position: absolute;
    left: ${({ startPositionLength }) =>  startPositionLength && startPositionLength * MONTH_WIDTH }px;
    top: ${({ duplicationEventLength }) =>  duplicationEventLength && duplicationEventLength * 44 }px;
    border-radius: 4px;
    align-items: center;
    gap: 4px;
` 

const ProjectTitle = styled.div`
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`

const TagItem = styled.span`
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
` 

export const TimeLine: React.FC<TimeLineProps> = ({ jobDate  }) => {
    const startDate = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
    const tadyDate = new Date()
    const durationDates = createDurationDate(startDate, tadyDate)
    const timelineRef = useRef<HTMLDivElement>(null);;

    // 年度判定
    const changeYear = (index:number) => {
        const firstYear:boolean = 0 === index // 初年度
        if(firstYear) {
            return firstYear
        }
    
        const newYear:boolean =  durationDates[index-1].year !== durationDates[index].year // 年度改
        return newYear;
    }

    useEffect(()=>{
        timelineRef?.current?.scrollIntoView({
            inline: "end"
        });
    }, [])  

    return (
        <TimeLineWrap>
            <DateWap>
                {durationDates.map((item, index:number) => (
                    <>
                    <DateItem key="index" isJanuary={changeYear(index)}>
                        {changeYear(index) &&
                            <YearText>{item.year}年</YearText>
                        }
                        {durationDates.length - 1 === index &&
                            <CurrentText>Current</CurrentText>
                        }
                        <DayText>{item.month}</DayText>
                    </DateItem>
                    </>
                ))}
                <ProjectArea>
                    {jobDate && jobDate.map((job, index: number) => (
                        <ProjectItem 
                            durationLength={job.projectDurationLength}
                            startPositionLength={job.jobStartTime}
                            duplicationEventLength={job.duplicationEventLength}
                            key={index}
                        >
                            <ProjectTitle>
                                {job.title}
                            </ProjectTitle>
                            {job.projectDurationLength !== 1 &&
                                <TagItem>Next.js</TagItem>
                            }
                        </ProjectItem>
                    ))}
                </ProjectArea>
                <div ref={timelineRef} />
            </DateWap>
        </TimeLineWrap>
    );
};
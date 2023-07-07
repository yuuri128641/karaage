import React, { useState, useEffect , useRef} from "react"
import styled, { keyframes } from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { createDurationDate } from "@/utils/createDurationDate"
import { FIRST_WORKING_DATE } from "site.config"
import { JobHistoryFormat } from "@/models"
import { mediaQuery } from "@/styles/const/size"

type TimeLineProps = {
    jobDate?: JobHistoryFormat[];
};

const MONTH_WIDTH = 40;

const TimeLineWrap = styled.div<{isOpen: boolean}>`
    position: fixed;
    width: 100%;
    background-color: ${colorPalette.lightGray100};
    position: fixed;
    box-shadow: 0px 0px 20px -8px #bababa;
    bottom: ${({ isOpen }) =>  isOpen ? "0" : "-300px" }; 
    transition: all 0.3s ease;
`;

const ScrollArea = styled.div<{isOpen: boolean}>`
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    height: 360px;
    width: 100%;
`;

const TimeLineButton = styled.button<{isOpen: boolean}>`
    background-color: ${colorPalette.lightGray100};
    position: absolute;
    right: 0;
    top: -40px;
    height: 40px;
    width: 200px;
    border: 0;
    color: ${colorPalette.lightGray1000};
    border-top: 4px solid ${colorPalette.lightGray1000};
    font-size: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    &::after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 8px 0 8px;
        border-color: ${colorPalette.lightGray1000} transparent transparent transparent;
        transform: ${({ isOpen }) =>  isOpen ? "rotate(0)" : "rotate(180deg)" }; 
        transition: all 0.3s ease;
    }
    ${mediaQuery.lg} {
        &:hover {
            opacity: .7;

        }
    }
`;

const DateWap = styled.div`
    display: flex;
    padding: 4px 0;
    height: 100%;
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
    padding-top: 4px;
`;

const DayText = styled.div`
    padding-top: 32px;
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
    top: ${({ duplicationEventLength }) =>  duplicationEventLength ? (duplicationEventLength * 44 + 4) : 4 }px;
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

const flash = keyframes`
    0% {
        opacity: .5;
    }

    50% {
        opacity: 0;
    }
    
    
    100% {
        opacity: .5;
    }
`

const NavigationLeft = styled.div<{
    isOpen: boolean,
    isActive: boolean,
}>`
    width: 40px;
    height: 300px;
    position: fixed;
    left: 0;
    bottom: ${({ isOpen }) =>  isOpen ? "0" : "-300px" };
    opacity: ${({ isActive }) =>  isActive ? 1 : 0 };
    transition: all 0.3s ease;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 50px 20px 50px 0;
        border-color: transparent ${colorPalette.lightGray600} transparent transparent;
        animation: ${flash} 1.5s ease-in-out infinite;
    }
` 

const NavigationRight = styled.div<{
    isOpen: boolean,
    isActive: boolean,
}>`
    width: 40px;
    height: 300px;
    position: fixed;
    right: 0;
    bottom: ${({ isOpen }) =>  isOpen ? "0" : "-300px" }; 
    transition: all 0.3s ease;
    opacity: ${({ isActive }) =>  isActive ? 1 : 0 };
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 50px 0 50px 20px;
        border-color: transparent transparent transparent ${colorPalette.lightGray600};
        animation: ${flash} 1.5s ease-in-out infinite;
    }
` 

const Information = styled.div<{isOpen: boolean}>`
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid ${colorPalette.blue400};
    box-sizing: border-box;
    padding: 12px;
    max-width: calc(100% - 40px);
    width: ${({ isOpen }) =>  isOpen ? "auto" : "58px"};
    display: inline-flex;
    border-radius: ${({ isOpen }) =>  isOpen ? "0" : "9999px"};
`

const InformationText = styled.div<{isOpen: boolean}>`
    font-size: 12px;
    line-height: 1.6;
    visibility: ${({ isOpen }) =>  isOpen ? "visible": "hidden"};
    position: ${({ isOpen }) =>  isOpen ? "relative" : "absolute"};
`

const InformationButton = styled.button<{isOpen: boolean}>`
    border: none;
    background-color: transparent;
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
    &::before,
    &::after {
        content: "";
        width: 100%;
        height: 4px;
        background-color: ${colorPalette.blue400};
        position: absolute;
        display: block;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        transition: all 0.3s ease;
    }
    &::before {
        transform:  ${({ isOpen }) =>  isOpen ? "rotate(45deg)" : "rotate(90deg)" }; 
    }
    &::after {
        transform:  ${({ isOpen }) =>  isOpen ? "rotate(-45deg)" : "rotate(0)" }; 
    }
`
const InformationTagWrap = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`
const InformationTagDev = styled.div`
    background-color: ${colorPalette.blue200};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagDes = styled.div`
    background-color: ${colorPalette.jobDes};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagDir = styled.div`
    background-color: ${colorPalette.jobDir};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagAll = styled.div`
    background-color: ${colorPalette.jobAll};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

const InformationTagOther = styled.div`
    background-color: ${colorPalette.jobOther};
    color: ${colorPalette.white};
    display: inline-flex;
    padding: 2px 4px;
    line-height: 1;
    align-items: center;
    justify-content: center;
`

export const TimeLine: React.FC<TimeLineProps> = ({ jobDate  }) => {
    const startDate = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
    const tadyDate = new Date()
    const durationDates = createDurationDate(startDate, tadyDate)
    const timelineEndRef = useRef<HTMLDivElement>(null)
    const timelineWrapRef = useRef<HTMLDivElement>(null)
    const dataRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(true)
    const [scrollStartPosition, setScrollStartPosition] = useState(true)
    const [scrollEndPosition, setScrollEndPosition] = useState(false)
    const [navigation, setNavigation] = useState(true)

    const toggleTimeline = () => setOpen(!open)
    const toggleNavigation = () => setNavigation(!navigation)

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
        // 初期表示時にスクロール位置を現在に変更
        timelineEndRef?.current?.scrollIntoView({
            inline: "end"
        });

        const endPosition:number | undefined = dataRef?.current?.getBoundingClientRect().x

        // スクロールナビゲーションの切り替え
        const handleScroll = (clientRect:any) => {
            if(clientRect.scrollLeft === 0) {
                setScrollStartPosition(false)
            } else if (clientRect.scrollLeft === (endPosition && Math.abs(endPosition))) {
                setScrollEndPosition(false)
            } else {
                setScrollStartPosition(true)
                setScrollEndPosition(true)
            }
        }

        const scrollArea = timelineWrapRef.current;
        scrollArea?.addEventListener("scroll", () =>{
            handleScroll(scrollArea)
        })
    }, [])

    return (
        <TimeLineWrap isOpen={open}>
            <TimeLineButton
                onClick={toggleTimeline}
                isOpen={open}
            >
                {open ? "CLOSE" : "OPEN" } JobHistory
            </TimeLineButton>
            <ScrollArea isOpen={open} ref={timelineWrapRef}>
                <DateWap ref={dataRef}>
                    {durationDates.map((item, index:number) => (
                        <DateItem key="index" isJanuary={changeYear(index)}>
                            {changeYear(index) &&
                                <YearText>{item.year}年</YearText>
                            }
                            {durationDates.length - 1 === index &&
                                <CurrentText>Current</CurrentText>
                            }
                            <DayText>{item.month}</DayText>
                        </DateItem>
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
                    <div ref={timelineEndRef} />
                </DateWap>
                <NavigationLeft isOpen={open} isActive={scrollStartPosition} />
                <NavigationRight isOpen={open} isActive={scrollEndPosition} />
            </ScrollArea>
            <Information isOpen={navigation}>
                <InformationText isOpen={navigation}>
                    職務経歴書は右上のボタンで開閉できます。<br/>
                    各タイムラインをクリックすることで詳細な職務経歴の閲覧が可能です。
                    <InformationTagWrap>
                        <InformationTagDev>開発</InformationTagDev>
                        <InformationTagDes>デザイン</InformationTagDes>
                        <InformationTagDir>企画</InformationTagDir>
                        <InformationTagAll>全工程</InformationTagAll>
                        <InformationTagOther>その他</InformationTagOther>
                    </InformationTagWrap>
                </InformationText>
                <InformationButton
                    isOpen={navigation}
                    onClick={toggleNavigation}
                />
            </Information>
        </TimeLineWrap>
    );
};
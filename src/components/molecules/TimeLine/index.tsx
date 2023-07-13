import React, { useState, useEffect , useRef} from "react"
import styled, { keyframes } from "styled-components";
import { colorPalette } from "@/styles/const/color"
import { createDurationDate } from "@/utils/createDurationDate"
import { FIRST_WORKING_DATE } from "site.config"
import { JobHistoryFormat } from "@/models"
import { mediaQuery } from "@/styles/const/size"
import { TimelineInformation } from "@/components/molecules/TimelineInformation"
import { TimelineBar } from "@/components/molecules/TimelineBar"

type TimeLineProps = {
    jobDate: JobHistoryFormat[]
    setJob?: any
    setContent?: any
    jobIndex?: number
};

const MONTH_WIDTH = 40;
const TIMELINE_HEIGHT = 340;
const TIMELINE_ITEM_HEIGHT = 56;

const TimeLineWrap = styled.div<{
    isOpen: boolean
    timelineHeight: number
}>`
    position: fixed;
    width: 100%;
    background-color: ${colorPalette.lightGray100};
    position: fixed;
    box-shadow: 0px 0px 20px -8px #bababa;
    bottom: ${({ isOpen, timelineHeight }) =>  isOpen ? "0" : `-${timelineHeight - 80}px` }; 
    transition: all 0.3s ease;
    z-index: 500;
`;

const ScrollArea = styled.div<{
    isOpen: boolean
    timelineHeight: number
}>`
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    height: ${({timelineHeight}) => timelineHeight}px;
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
    ${mediaQuery.pc} {
        &:hover {
            color: ${colorPalette.lightGray600};
            border-top: 4px solid ${colorPalette.lightGray600};
            &::after {
                border-color: ${colorPalette.lightGray600} transparent transparent transparent;
            }
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
    timelineHeight: number
}>`
    width: 40px;
    height: ${TIMELINE_HEIGHT}px;
    position: fixed;
    left: 0;
    bottom: ${({ isOpen, timelineHeight }) =>  isOpen ? "0" : `-${timelineHeight}px` };
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
    timelineHeight: number
}>`
    width: 40px;
    height: ${({timelineHeight}) => timelineHeight}px;
    position: fixed;
    right: 0;
    bottom: ${({ isOpen, timelineHeight }) =>  isOpen ? "0" : `-${timelineHeight}px` }; 
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

export const TimeLine: React.FC<TimeLineProps> = ({ jobDate, setJob, setContent, jobIndex }) => {
    const startDate = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
    const todyDate = new Date()
    const durationDates = createDurationDate(startDate, todyDate)
    const timelineEndRef = useRef<HTMLDivElement>(null)
    const timelineWrapRef = useRef<HTMLDivElement>(null)
    const dataRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(true)
    const [scrollStartPosition, setScrollStartPosition] = useState(true)
    const [scrollEndPosition, setScrollEndPosition] = useState(false)

    const toggleTimeline = () => setOpen(!open)

    // タイムラインの高さの設定
    const duplicationEventLength = jobDate?.map(function (item) {
        return item.duplicationEventLength;
    });
    const maxDuplicationEventLength = Math.max.apply(null, duplicationEventLength)
    const timelineHeight = (maxDuplicationEventLength + 1) * TIMELINE_ITEM_HEIGHT



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
        <TimeLineWrap isOpen={open} timelineHeight={timelineHeight}>
            <TimeLineButton
                onClick={toggleTimeline}
                isOpen={open}
                type="button"
            >
                {open ? "CLOSE" : "OPEN" } JobHistory
            </TimeLineButton>
            <ScrollArea isOpen={open} ref={timelineWrapRef} timelineHeight={timelineHeight}>
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
                            <TimelineBar
                                job={job}
                                itemIndex={index}
                                jobIndex={jobIndex}
                                setJob={setJob}
                                setContent={setContent}
                                key={index}
                            />
                        ))}
                    </ProjectArea>
                    <div ref={timelineEndRef} />
                </DateWap>
                <NavigationLeft isOpen={open} isActive={scrollStartPosition} timelineHeight={timelineHeight} />
                <NavigationRight isOpen={open} isActive={scrollEndPosition} timelineHeight={timelineHeight} />
            </ScrollArea>
            <TimelineInformation />
        </TimeLineWrap>
    );
};
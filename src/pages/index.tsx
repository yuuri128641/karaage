import React, { useState, useEffect, useRef} from "react";
import type { NextPage } from "next"
import styled, { keyframes } from "styled-components";
import { TimeLine } from "@/components/molecules/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat, Profile } from "@/models"
import { mediaQuery } from "@/styles/const/size"
import { ProfileContents } from "@/components/organisms/ProfileContents"
import { JobHistoryContents } from "@/components/organisms/JobHistoryContents"
import { ResumeContents } from "@/components/organisms/ResumeContents"
import { GlobalNavigation } from "@/components/molecules/GlobalNavigation"
import { LoginContents } from "@/components/organisms/LoginContents"
import ReactGA from "react-ga4";
import { colorPalette } from "@/styles/const/color"

type Props = {
  jobDates: JobHistory[]
  profileDate: Profile
};

export const getStaticProps = async () => {
  const jobDates = await client.get({
    endpoint: "jobhistory",
    queries: {
      offset: 0,
      limit: 1000,
      orders: "startDate",
    }
  });
  const profileDate = await client.get({
    endpoint: "profile",
});

  return {
    props: {
      jobDates: jobDates.contents,
      profileDate: profileDate,
    },
  };
};

const Wrap = styled.div`
  width: 100%;
  padding: 120px 10vw 480px 20vw;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  ${mediaQuery.underPc} {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 80px;
  }
`;

const FirstView = styled.div`
  font-size: 200px;
  position: absolute;
  top: 0;
  right: 0;
  writing-mode: vertical-rl;
  height: 100vh;
  overflow: hidden;
  width: 100%;
`

const CopyText = styled.div`
  writing-mode: horizontal-tb;
  color: ${colorPalette.blue400};
  font-size: 400px;
  word-break: break-all;
  text-align: right;
  mix-blend-mode: color;
  position: absolute;
  right: 0;
  width: 70%;
  line-height: 1;
  top: 0;
`

const rotation = keyframes`
    0% {
        transform:rotate(0);
    }

    100% {
        transform:rotate(360deg);
    }
`

const CopyTextA = styled.div`
  writing-mode: horizontal-tb;
  color: ${colorPalette.white};
  font-size: 1600px;
  position: absolute;
  right: 0;
  top: 0;
  mix-blend-mode: soft-light;
  animation: ${rotation} 12s linear infinite;
`

const CopySubText = styled.div`
  writing-mode: vertical-rl;
  color: ${colorPalette.lightGray700};
  font-size: 200px;
`


const Home: NextPage<Props> = ({jobDates, profileDate}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [jobIndex, setJobIndex] = useState<number | undefined>()
  const [activeContent, setActiveContent] = useState("")
  const [pageTitle, setPageTitle] = useState("titlePage")
  const [login, setLoginState] = useState(false)
  const [open, setOpen] = useState(true)
  const toggleTimeline = () => setOpen(!open)

  const maxJobLength = jobDate.length - 1

  const setJob = (index: number | undefined) => {
    setJobIndex(index)
  }

  const setContent = (page: string) => {
    setActiveContent(page)
  }

  useEffect(()=>{
    bodyRef?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  
    const title = `【${activeContent}】 ${jobIndex} ${login}`
    setPageTitle(title)
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA || "");
    ReactGA.send({
        hitType: "pageview",
        title: pageTitle
    });
  }, [jobIndex, activeContent, pageTitle, login])

  return (
    <>
      <main>
        <div ref={bodyRef}>
          <GlobalNavigation
            setJob={setJob}
            setContent={setContent}
            toggleTimeline={toggleTimeline}
            setOpen={setOpen}
            maxJobLength={maxJobLength}
          />
          <Wrap>
            {jobIndex !== undefined &&  
              <JobHistoryContents 
                jobDateItem={jobDate[jobIndex]}
                maxJobLength={maxJobLength}
                setJob={setJob}
                jobIndex={jobIndex}
                login={login}
              />
            }
            {!activeContent &&
              <FirstView>
                <CopySubText>
                  DEVELOPMENT<br/ >
                  FRONTEND
                </CopySubText>
                <CopyText>PORTFOLIO</CopyText>
                <CopyTextA>あ</CopyTextA>
              </FirstView>
            }
            {activeContent === "profile" &&  
              <ProfileContents profile={profileDate} login={login} />
            }
            {activeContent === "resume" &&  
              <ResumeContents profile={profileDate} login={login} />
            }
            {activeContent === "login" &&  
              <LoginContents setLoginState={setLoginState} login={login} />
            }
          </Wrap>
          {jobDate &&
            <TimeLine toggleTimeline={toggleTimeline} isOpen={open} jobDate={jobDate} setJob={setJob} setContent={setContent} jobIndex={jobIndex} /> 
          }
        </div>
      </main>
    </>
  );
}

export default Home
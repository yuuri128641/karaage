import React, { useState, useEffect, useRef} from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { TimeLine } from "@/components/molecules/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat, Profile } from "@/models"
import { mediaQuery } from "@/styles/const/size"
import { ProfileContents } from "@/components/organisms/ProfileContents"
import { JobHistoryContents } from "@/components/organisms/JobHistoryContents"
import { ResumeContents } from "@/components/organisms/ResumeContents"
import { GlobalNavigation } from "@/components/molecules/GlobalNavigation"
import ReactGA from "react-ga4";

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
  ${mediaQuery.underPc} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Home: NextPage<Props> = ({jobDates, profileDate}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [jobIndex, setJobIndex] = useState<number | undefined>()
  const [activeContent, setActiveContent] = useState("profile")
  const [pageTitle, setPageTitle] = useState("titlePage")

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
  
    const title = `【${activeContent}】 ${jobIndex}`
    setPageTitle(title)
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA || "");
    ReactGA.send({
        hitType: "pageview",
        title: pageTitle
    });
  }, [jobIndex, activeContent, pageTitle])

  return (
    <>
      <main>
        <div ref={bodyRef}>
          <GlobalNavigation
            setJob={setJob}
            setContent={setContent}
          />
          <Wrap>
            {jobIndex !== undefined &&  
              <JobHistoryContents 
                jobDateItem={jobDate[jobIndex]}
                maxJobLength={maxJobLength}
                setJob={setJob}
                jobIndex={jobIndex}
              />
            }
            {activeContent === "profile" &&  
              <ProfileContents profile={profileDate} />
            }
            {activeContent === "resume" &&  
              <ResumeContents profile={profileDate} />
            }
          </Wrap>
          {jobDate &&
            <TimeLine jobDate={jobDate} setJob={setJob} setContent={setContent} jobIndex={jobIndex} /> 
          }
        </div>
      </main>
    </>
  );
}

export default Home
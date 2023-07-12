import React, { useState, useEffect, useRef} from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat, Profile } from "@/models"
import { mediaQuery } from "@/styles/const/size"
import { ProfileContents } from "@/components/organisms/ProfileContents"
import { JobHistoryContents } from "@/components/organisms/JobHistoryContents"
import { ResumeContents } from "@/components/organisms/ResumeContents"
import { GlobalNavigation } from "@/components/molecule/GlobalNavigation"

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
  ${mediaQuery.pc} {
    padding-left: 320px;
    padding-top: 120px;
  }
  padding: 80px 20px 480px 20px;
  max-width: 100%;
  overflow: hidden;
`;

const Home: NextPage<Props> = ({jobDates, profileDate}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [jobIndex, setJobIndex] = useState<number | undefined>()
  const [activeContent, setActiveContent] = useState("profile")

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
  }, [jobIndex, activeContent])

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
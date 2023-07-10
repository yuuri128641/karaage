import React from "react";
import type { NextPage } from "next"
import styled, {keyframes} from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat } from "@/models"
import Link from "next/link";
import { mediaQuery } from "@/styles/const/size"
import { colorPalette } from "@/styles/const/color"
import { Profile } from "@/components/organisms/Profile"

type Props = {
  jobDates: JobHistory[]
  profileDate: any
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
    padding-top: 80px;
  }
  padding: 80px 20px 700px 60px;
  max-width: 100%;
  overflow: hidden;
`;

const DesignText = styled.div`
  font-size: 300px;
  text-align: right;
  letter-spacing: -0.1em;
  color: ${colorPalette.lightGray100};
`
const Home: NextPage<Props> = ({jobDates, profileDate}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)

  return (
    <>
      <main>
        <Wrap>
          <Profile profile={profileDate} />

          <DesignText>FRONTEND DEVELOPER</DesignText>
          {jobDate && jobDate.map((item:any, index:number) => (
            <div key={index}>
              {item.title}
              <p>開始日{item.startDate}</p>
              <p>終了日{item.endDate}</p>
              <p>durationLength{item.durationLength}</p>
              <p>{item.duplicationEventLength}</p>
            </div>
          ))}
        </Wrap>
        {jobDate &&
          <TimeLine jobDate={jobDate} /> 
        }
      </main>
    </>
  );
}

export default Home
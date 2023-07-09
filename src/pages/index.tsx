import React from "react";
import type { NextPage } from "next"
import styled, {keyframes} from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat } from "@/models"
import { Header } from "@/components/molecule/Header"
import Link from "next/link";
import { mediaQuery } from "@/styles/const/size"
import { colorPalette } from "@/styles/const/color"

type Props = {
  jobDates: JobHistory[];
};

export const getStaticProps = async () => {
  const jobDates = await client.get({
    endpoint: "jobhistory?orders=startDate",
  });

  return {
    props: {
      jobDates: jobDates.contents,
    },
  };
};

const Wrap = styled.div`
  ${mediaQuery.lg} {
    padding-left: 320px;
    padding-top: 80px;
  }
  padding: 80px 20px 700px 60px;
  max-width: 100%;
  overflow: hidden;
`;

const turn = keyframes`
    0% {
      transform: rotateX(0deg);
    }
    
    100% {
      transform: rotateX(360deg);
    }
`

const DesignText = styled.div`
  font-size: 200px;
  text-align: right;
  letter-spacing: -0.1em;
  color: ${colorPalette.lightGray100};
  animation: ${turn} 20s linear infinite;
`
const Home: NextPage<Props> = ({jobDates}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)

  return (
    <>
      <main>
        <Header />
        <Wrap>
          <DesignText>FRONTEND DEVELOPER</DesignText>
          {/* {jobDate && jobDate.map((item:any, index:number) => (
            <div key={index}>
              {item.title}
              <p>開始日{item.startDate}</p>
              <p>終了日{item.endDate}</p>
              <p>durationLength{item.durationLength}</p>
              <p>{item.duplicationEventLength}</p>
            </div>
          ))} */}
        </Wrap>
        {jobDate &&
          <TimeLine jobDate={jobDate} /> 
        }
      </main>
    </>
  );
}

export default Home
import React from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat } from "@/models"
import { Header } from "@/components/molecule/Header"
import Link from "next/link";
import { mediaQuery } from "@/styles/const/size"

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
    padding-bottom: 700px;
    padding-left: 320px;
    padding-top: 80px;
  }
  padding: 20px 20px 700px 60px;
`;

const Home: NextPage<Props> = ({jobDates}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)

  return (
    <>
      <main>
        <Header />
        <Wrap>
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
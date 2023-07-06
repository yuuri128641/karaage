import React from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat } from "@/models"

type Props = {
  jobDates: JobHistory[];
};

export const getJobProps = async () => {
  const jobDates = await client.get({
    endpoint: "jobhistory?orders=startDate",
  });

  return {
    props: {
      jobDates: jobDates.contents,
    },
  };
};

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

const Wrap = styled.div`
  padding-bottom: 700px;
`;

const Home: NextPage<Props> = ({jobDates}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)

  return (
    <>
      <main>
        <div>
          <Title>めいんこんてんつ& ダミーデータ</Title>
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
        </div>
        {jobDate &&
            <TimeLine jobDate={jobDate} /> 
          }
      </main>
    </>
  );
}

export default Home
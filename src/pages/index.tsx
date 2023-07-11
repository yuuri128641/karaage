import React from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat, Profile } from "@/models"
import { mediaQuery } from "@/styles/const/size"
import { colorPalette } from "@/styles/const/color"
import { ProfileContents } from "@/components/organisms/ProfileContents"

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
  padding: 80px 20px 480px 60px;
  max-width: 100%;
  overflow: hidden;
`;

const DesignText = styled.div`
  font-size: 300px;
  text-align: right;
  letter-spacing: -0.1em;
  color: ${colorPalette.lightGray100};
  position: absolute;
`

const Home: NextPage<Props> = ({jobDates, profileDate}) => {
  const jobDate:JobHistoryFormat[] | undefined = createJobHistoryFormatDate(jobDates)

  return (
    <>
      <main>
        <Wrap>
          <ProfileContents profile={profileDate} />
          {/*
                    <DesignText>FRONTEND DEVELOPER</DesignText>
           */}
        </Wrap>
        {jobDate &&
          <TimeLine jobDate={jobDate} /> 
        }
      </main>
    </>
  );
}

export default Home
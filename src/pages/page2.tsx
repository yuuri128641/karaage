import React, { useState } from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { SampleTitle } from "@/components/atoms/SampleTitle"
import { TimeLine } from "@/components/molecule/TimeLine"
import { FIRST_WORKING_DATE } from "site.config"
import { client } from "@/utils/client";


const blogTest = (blog:any) => {
  const newBlogList:any = [];
  const viewedEventList:any =[];

  blog.map((item:any) => {
    let duplicationIndex = 0;

    const startDate:Date = new Date(item.startDate);
    const endDate:Date = new Date(item.endDate);
    const firstJobDate:Date = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)

    const startMonth:number = startDate.getFullYear() * 12 + startDate.getMonth();
    const endMonth:number = endDate.getFullYear() * 12 + endDate.getMonth();
    const firstJobMonth:number = firstJobDate.getFullYear() * 12 + firstJobDate.getMonth();
    
    if (viewedEventList.length) {
      viewedEventList.reduceRight((i, viewedEventItem:number) => {
        if(startMonth > viewedEventItem) {
          duplicationIndex++;""
        }  
      })
    }

    const newObj = {...item, 
      duplicationEventLength: duplicationIndex,
      projectDurationLength: endMonth - startMonth,
      jobStartTime: startMonth - firstJobMonth,
    };
    
    newBlogList.push(newObj)
    viewedEventList.push(startMonth - firstJobMonth + startMonth - firstJobMonth)
  })

  return newBlogList
}

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "jobhistory?orders=startDate" });
  blogTest(blog.contents)

  return {
    props: {
      blogs: blog.contents,
    },
  };
};

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;


const Page2: NextPage = ({blogs}) => {
  const titleTag = "p"

  const jobDate = blogTest(blogs)

  console.log(jobDate)

  return (
    <>
      <main>
        <Title as={titleTag}>sample page2</Title>
        <div>aaa + {process.env.NEXT_PUBLIC_MICROCMS_API_KEY}</div>
        <SampleTitle title="aaaa" />
        <TimeLine jobDate={jobDate} />

        {jobDate.map((item, index) => (
          <div key={index}>
            {item.title}
            <p>開始日{item.startDate}</p>
            <p>終了日{item.endDate}</p>
            <p>durationLength{item.durationLength}</p>
            <p>{item.duplicationEventLength}</p>
          </div>
        ))}
      </main>
    </>
  );
}




export default Page2
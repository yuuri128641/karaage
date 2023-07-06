import React, { useState, useEffect } from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { SampleTitle } from "@/components/atoms/SampleTitle"
import { TimeLine } from "@/components/molecule/TimeLine"
import { FIRST_WORKING_DATE } from "site.config"
import { client } from "@/utils/client";


export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "jobhistory?orders=startDate" });

  return {
    props: {
      blogs: blog.contents,
    },
  };
};


const blogTest = (blog:any) => {
  const newBlogList:any = [];
  const viewedEventList:any =[];

  if(blog && 0 < blog.length) {
    blog.map((item:any) => {
      let duplicationIndex = 0;
  
      const startDate:Date = new Date(item.startDate);
      const endDate:Date = new Date(item.endDate);
      const firstJobDate:Date = new Date(FIRST_WORKING_DATE.year, FIRST_WORKING_DATE.month, FIRST_WORKING_DATE.day)
  
      const startMonth:number = startDate.getFullYear() * 12 + startDate.getMonth();
      const endMonth:number = endDate.getFullYear() * 12 + endDate.getMonth();
      const firstJobMonth:number = firstJobDate.getFullYear() * 12 + firstJobDate.getMonth();
      
      if (viewedEventList.length) {
        viewedEventList.reduceRight((i:any, viewedEventItem:number) => {
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
}

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

type Props = {
  blogs: any[];
};


const Page2: NextPage<Props> = ({blogs}) => {
  const titleTag = "p"

  const jobDate:any = blogTest(blogs)

  return (
    <>
      <main>
        <Title as={titleTag}>sample page2</Title>
        {jobDate &&
          <TimeLine jobDate={jobDate} /> 
        }

        {jobDate && jobDate.map((item:any, index:number) => (
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
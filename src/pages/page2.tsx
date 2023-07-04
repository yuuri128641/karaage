import React, { useState } from "react";
import type { NextPage } from "next"
import styled from "styled-components";
import { SampleTitle } from "@/components/atoms/SampleTitle"

import { client } from "@/utils/client";

const blogTest = (blog:any) => {
  const newBlogList:any = [];
  const viewedEventList:any =[];

  blog.map((item:any, index:number) => {
    let duplicationIndex = 0;
    if (viewedEventList.length) {
      console.log("viewedEventList" + viewedEventList)
      viewedEventList.reduceRight((index, viewedEventItem) => {
        console.log("item" + viewedEventItem)
        if(item.startDate < viewedEventItem) {
          duplicationIndex++;
        } 
      })
    }
    console.log(item.endDate)
    const newObj = {...item, duplicationEventLength: duplicationIndex};
    newBlogList.push(newObj)
    viewedEventList.push(item.endDate)
  })

  console.log(newBlogList)

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

  const test = blogTest(blogs)

  return (
    <>
      <main>
        <Title as={titleTag}>sample page2</Title>
        <div>aaa + {process.env.NEXT_PUBLIC_MICROCMS_API_KEY}</div>
        <SampleTitle title="aaaa" />
        {test.map((item, index) => (
          <div key="index">
            {item.title}
            <p>開始日{item.startDate}</p>
            <p>終了日{item.endDate}</p>
            <p>{item.duplicationEventLength}</p>
          </div>
        ))}
        {/*blogs.map((blog, index) => (
          <>
            {() => addUser(blog.title, list2)}
            <p>1{list}</p>
            {() => list.push(blog.title)}
            <p>2{list}</p>
            <p>{fruits}</p>
            <div>{index}</div>
            <div>{blog.id}</div>
            <div>{blog.title}</div>
            <div>{blog.startDate}</div>
            <div>{blog.endDate}</div>
          </>
        ))*/}
      </main>
    </>
  );
}




export default Page2
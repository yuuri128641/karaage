import type { NextPage } from "next"
import styled from "styled-components";
import { SampleTitle } from "@/components/atoms/SampleTitle"

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

const Page2: NextPage = () => {
  const titleTag = "p"
  return (
    <>
      <main>
        <Title as={titleTag}>sample page2</Title>
        <SampleTitle title="SampleTitle" />
      </main>
    </>
  );
}

export default Page2
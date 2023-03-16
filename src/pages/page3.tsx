import styled from "styled-components";
import Image from "next/image";

const Wrap = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

const ImageWrap = styled.div`
  margin-top: 20px;
`;

export default function Page3() {
  return (
    <>
      <main>
        <div>
          <h1>page3!!!</h1>
          <Wrap>
            page3texttextpage3<br />
            texttextpage3texttext<br />
            page3texttextpage3texttextpage3texttext
          </Wrap>
        </div>
        <ImageWrap>
          <Image src="/images/dummy.png" alt="dummy text" width={540} height={400} />
        </ImageWrap>
      </main>
    </>
  );
}

import type { NextPage } from "next"
import Link from "next/link"

const Page2: NextPage = () => {
  return (
    <>
      <main>
        <h1>next-sample</h1>
        <Link href="page2">go to page2</Link>
        <Link href="page2">go to page3</Link>
      </main>
    </>
  );
}

export default Page2
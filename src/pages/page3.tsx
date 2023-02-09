import Image from "next/image";
import styled from "styled-components";

const DataItem = styled.li<{
  length: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ length }) => `calc(100% / ${length})`};
  padding: 5px 16px;

  &:first-child {
    border-left: none;
  }
`;

type optionsProps = {
  backgroundColor: string;
  width: string;
  fontsize: string;
  padding: string;
};

const options: Record<string, optionsProps> = {
  actionRequired: {
    backgroundColor: "red",
    width: "52px",
    fontsize: "12px",
    padding: "8px 0",
  },
  important: {
    backgroundColor: "blue",
    width: "52px",
    fontsize: "12px",
    padding: "8px 0",
  },
  recommendation: {
    backgroundColor: "green",
    width: "auto",
    fontsize: "10px",
    padding: "2px",
  },
  default: {
    backgroundColor: "#999",
    width: "auto",
    fontsize: "16px",
    padding: "auto",
  },
};

const StyledLabel = styled.span<{ themeStyle: optionsProps }>`
  box-sizing: border-box;
  display: inline-block;
  width: ${({ themeStyle }: { themeStyle: optionsProps }) => themeStyle.width};
  padding: ${({ themeStyle }: { themeStyle: optionsProps }) => themeStyle.padding};
  font-size: ${({ themeStyle }: { themeStyle: optionsProps }) => themeStyle.fontsize};
  font-weight: 700;
  line-height: 1;
  text-align: center;
  background-color: ${({ themeStyle }: { themeStyle: optionsProps }) => themeStyle.backgroundColor};
  border-radius: 1px;
`;

export const CenteredTitle: React.FC<CenteredTitleProps> = ({ title, className }) => {
  return <StyledCenteredTitle className={className}>{title}</StyledCenteredTitle>;
};

export default function Page2({ category = "important" }) {
  const themeStyle = options[category];
  return (
    <>
      <main>
        <div>
          <h1>page3!!!</h1>
          <DataItem length={500}>DataItem</DataItem>
          <CenteredTitle title={"aiueo"} />
          <DataItem length={500}>DataItem</DataItem>

          <StyledLabel themeStyle={themeStyle}>
            StyledLabelテキスト
            <br />
            aiueo
          </StyledLabel>
        </div>

        <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
      </main>
    </>
  );
}

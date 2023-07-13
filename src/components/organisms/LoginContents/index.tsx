import React, { useState } from "react";
import styled from "styled-components";
import { PageTitle } from "@/components/atoms/PageTitle"
import { mediaQuery } from "@/styles/const/size"
import { colorPalette } from "@/styles/const/color"

type Props = {
    setLogtinState?: any
    login?: any
};


const Wrap = styled.div`
    margin-top: 40px;
`

const DescriptionText = styled.div`
    font-size: 14px;
    line-height: 1.6;
`

const ErrorText = styled.div`
    font-size: 14px;
    line-height: 1.6;
    margin-top: 20px;
    color: ${colorPalette.red400};;
`

const FormWrap = styled.div`
    margin-top: 40px;
`

const FormContent = styled.div`
    display: flex;
    margin-top: 20px;
    flex-flow: column;
    gap: 8px;
`
const FormNote = styled.div`
    font-size: 12px;
    max-width: 720px;
    width: 100%;
    line-height: 1.6;
`

const FormTitle = styled.div`
    font-size: 16px;
`

const FormInput = styled.input`
    border: 1px solid ${colorPalette.lightGray600};
    padding: 8px 16px;
    max-width: 360px;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
    ${mediaQuery.underPc} {
        max-width: 100%;
    }
`

const FormButton = styled.button`
    height: 48px;
    max-width: 360px;
    width: 100%;
    background-color: ${colorPalette.blue400};
    color: ${colorPalette.white};
    border: 0;
    border-radius: 9999px;
    font-size: 18px;
    border: 2px solid ${colorPalette.blue400};
    transition: all 0.3s ease;
    cursor: pointer;
    ${mediaQuery.underPc} {
        max-width: 100%;
    }
    ${mediaQuery.pc} {
        &:hover {
            background-color: ${colorPalette.white};
            color: ${colorPalette.blue400};
        }
    }
`

const LoginText = styled.span`
    color: ${colorPalette.blue500};
`

export const LoginContents: React.FC<Props>= ({ setLogtinState, login }) => {

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)

    const onSubmit = () => {
        if (id == process.env.NEXT_PUBLIC_ANNRIS_KEY_ID && password == process.env.NEXT_PUBLIC_ANNRIS_KEY_PASS) {
            setLogtinState(true)
        } else {
            setIsError(true)
        }
    }

    return (
        <>
            <PageTitle title="LOGIN" />
            <Wrap>
                {login ?
                    <>
                        <DescriptionText>
                            認証が完了しています。<br />
                            <LoginText>非公開情報</LoginText>がページに表示されています。
                        </DescriptionText>
                    </>
                    :
                    <>
                        <DescriptionText>
                            ID・PASSWORDをお持ちの方はこちらにて認証いただくと、非公開情報も閲覧することができます。
                        </DescriptionText>
                        {isError &&
                            <ErrorText>
                                IDとパスワードが間違っています。
                            </ErrorText>
                        }
                        <FormWrap>
                            <FormContent>
                                <FormTitle>ID</FormTitle>
                                <FormInput 
                                    onChange={(e) => {
                                        setId(e.target.value)
                                    }}
                                    placeholder="半角英数"
                                />
                                <FormNote>annrisが2017年ごろから猛烈にハマり、週３日１人でも食べに行って気づいたら10kg太った食べ物は？</FormNote>
                            </FormContent>
                        </FormWrap>
                        <FormWrap>
                            <FormContent>
                                <FormTitle>PASS</FormTitle>
                                <FormInput
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    placeholder="半角英数"
                                />
                                <FormNote>annrisは小学生のころこどもちゃれんじをやっていた。<br />「好きな食べ物のイラストを描こう！」というお題に白米に乗った●●●の絵を描いて送ったほど、幼少期から好きな食べ物は？</FormNote>
                            </FormContent>
                        </FormWrap>
                        <FormWrap>
                            <FormButton
                                type="button"
                                onClick={
                                    onSubmit
                                }
                            >
                                LOGIN
                            </FormButton>
                        </FormWrap>
                    </>
                }

            </Wrap>
        </>
    );
}

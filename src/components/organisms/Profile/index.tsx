import React from "react";
import type { NextPage } from "next"
import styled, {keyframes} from "styled-components";
import { TimeLine } from "@/components/molecule/TimeLine"
import { client } from "@/utils/client";
import { createJobHistoryFormatDate } from "@/utils/createJobHistoryFormatDate";
import { JobHistory, JobHistoryFormat } from "@/models"
import Link from "next/link";
import { mediaQuery } from "@/styles/const/size"
import { colorPalette } from "@/styles/const/color"

type Props = {
    profile: any
};

export const Profile: React.FC<any>= ({profile: profile}) => {

    return (
        <>
        <div>ぷろふぃ</div>
        {profile.closeName}
        </>
    );
}

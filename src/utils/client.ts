import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "f3p0fq7vx9",  // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
});
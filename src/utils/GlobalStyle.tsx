import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'M PLUS 1p', sans-serif;
    }
`
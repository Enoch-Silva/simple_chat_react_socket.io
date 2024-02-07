import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family:Rethink ;
        src: url(src/assets/fonts/RethinkSans-VariableFont_wght.ttf);
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Rethink;
    }
`;

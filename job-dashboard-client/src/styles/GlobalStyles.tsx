import { Global, css } from '@emotion/react';
import React from 'react';

const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      /* Reset some defaults */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html,
      body,
      #root {
        height: 100%;
        font-family: 'Inter', sans-serif;
        background-color: #ffffff;
        color: #333333;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        cursor: pointer;
        border: none;
        background: none;
        font-family: inherit;
      }

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    `}
  />
);

export default GlobalStyles;

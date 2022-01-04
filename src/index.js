import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./content/sass/_theme.scss"
import { KcApp, defaultKcProps, getKcContext } from "keycloakify";
import { css } from "tss-react/@emotion/css";
import theme from "./util/theme"

const { kcContext } = getKcContext();

const myClassName = css({ "color": theme.palette.primary.main });

ReactDOM.render(
  // Unless the app is currently being served by Keycloak
  // kcContext is undefined.
  kcContext !== undefined ? (
    <KcApp
      kcContext={kcContext}
      {...{
        ...defaultKcProps,
        "kcHeaderWrapperClass": myClassName,
      }}
    />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ), // Your actual app
  document.getElementById("root"),
)
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

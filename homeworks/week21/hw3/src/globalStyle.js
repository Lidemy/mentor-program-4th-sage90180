import {createGlobalStyle} from "styled-components";
export const ResetStyle = createGlobalStyle `
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
address, caption, cite, code, dfn, em, strong, th, var, b {
  font-weight: normal;
  font-style: normal;
}
abbr, acronym {
  border: 0;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  text-size-adjust: 100%;
  box-sizing: border-box;
}
body {
    line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
q {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption, th {
  text-align: left;
}
textarea {
  resize: none;
}
a {
  text-decoration: none;
  cursor: pointer;
}
button {
  padding: 0;
  border: none;
  background: none;
}
`;

export const GlobalStyle = createGlobalStyle `
html, body {
  padding: 40px 0px;
  background: #88BFC1;
  margin: 0px; }

.form_box {
  background: #FFF9DC;
  -webkit-box-shadow: 0px 0px 15px rgba(27, 66, 68, 0.5);
  box-shadow: 0px 0px 15px rgba(27, 66, 68, 0.5);
  max-width: 600px;
  border-top: solid 15px #f3bd6d;
  border-bottom: solid 15px #f3bd6d;
  position: relative;
  z-index: 999;
  text-align: center;
  color: #3B3938;
  margin: 0 auto; }
  .form_box h1 {
    font-size: 30px;
    font-weight: 900;
    margin: 30px 0px 15px 0px; }
  .form_box p {
    margin: 5px 0px; }
  .form_box:after {
    background: #FFF9DC;
    position: absolute;
    content: '';
    width: 80px;
    height: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    top: 0px; }
  .form_box:before {
    background: #FFF9DC;
    position: absolute;
    content: '';
    width: 60px;
    height: 60px;
    border-radius: 50px;
    border: solid 15px #f3bd6d;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    top: -50px; }
  .form_box .form_main {
    background: white;
    width: 80%;
    margin: 50px auto;
    border-radius: 10px;
    position: relative;
    padding: 10px 30px 30px 30px;
    text-align: left; }
    .form_box .form_main input {
      font-size: 18px;
      border: none;
      outline: none;
      border-radius: 0px;
      border-bottom: solid 2px #f3bd6d;
      width: 330px;
      margin-top: 5px; }
    .form_box .form_main input[type=text], .form_box .form_main input[type=email], .form_box .form_main input[type=number] {
      display: block; }
    .form_box .form_main .form_title {
      margin: 20px 0px 5px 0px;
      display: block; }
    .form_box .form_main input.apply {
      width: auto;
      margin: 5px; }
    .form_box .form_main input.apply[type=radio] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      padding: 0;
      width: 20px;
      height: 20px;
      border: 2px solid #f3bd6d;
      border-radius: 50%;
      cursor: pointer;
      margin-top: 10px;
      -webkit-transition: 0.5s;
      -o-transition: 0.5s;
      transition: 0.5s; }
      .form_box .form_main input.apply[type=radio]:checked {
        background-color: #f3bd6d;
        border-color: #f3bd6d; }
    .form_box .form_main label.apply {
      position: relative;
      top: -8px;
      cursor: pointer; }
    .form_box .form_main .form_title.necessary:before {
      content: "＊";
      color: #E35060; }
    .form_box .form_main textarea {
      white: 330px;
      padding: 5px;
      border: 2px solid #f3bd6d;
      width: 80%;
      border-radius: 5px;
      margin-top: 7px;
      outline: none; }
    .form_box .form_main ::-webkit-input-placeholder {
      color: #bbb; }
    .form_box .form_main :-ms-input-placeholder {
      color: #bbb; }
    .form_box .form_main ::-ms-input-placeholder {
      color: #bbb; }
    .form_box .form_main ::placeholder {
      color: #bbb; }
  .form_box .form_main:before {
    content: '＊必填';
    position: absolute;
    left: 30px;
    top: -23px;
    font-size: 15px;
    color: #E35060; }
  .form_box button {
    display: block;
    margin: 20px 0px 0px 0px;
    border: none;
    color: white;
    padding: 5px 20px;
    letter-spacing: 2px;
    font-size: 18px;
    border-radius: 5px;
    background: #f3bd6d;
    cursor: pointer;
    -webkit-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    position: relative; }
  .form_box button:hover {
    background: #d29f54; }
  .form_box p.ps {
    font-size: 15px;
    color: #E35060;
    position: relative;
    top: 5px; }
  .form_box .warning {
    color: #E35060;
    font-size: 14px;
    margin: 5px 0px;
    opacity: 0; }

input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #fff9f2 inset;
  -webkit-text-fill-color: #333; }

input[type=text]:focus, input[type=password]:focus {
  -webkit-box-shadow: 0 0 0 1000px #fff9f2 inset; }

textarea:focus {
  -webkit-box-shadow: 0 0 0 1000px #fff9f2 inset; }

@media (max-width: 375px) {
  html, body {
    padding: 40px 5px; } }
`;
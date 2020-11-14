import React from 'react';
import ReactDOM from 'react-dom';
import { ResetStyle, GlobalStyle } from './globalStyle';
import Game from './Game'
ReactDOM.render(
  <>
    <ResetStyle />
    <GlobalStyle />
    <Game />
  </>
  ,
  
  document.getElementById('root')
);

import styled, {createGlobalStyle} from "styled-components";
import BGImage from './images/background.jpeg'

export const GlobalStyle = createGlobalStyle`
    html {
      height: 100%;
    }
    
    body {
      background: url(${BGImage}) no-repeat center center fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      margin: 0;
      padding: 0 20px;
      display: flex;
      justify-content: center;
    }
    
    * {
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: white;
  }

  .score {
    color: white;
    font-size: 40px;
    margin-top: 20px;
  }

  .questions {
    min-width: 800px;
  }
  
  h1 {
    background-image: linear-gradient(180deg, #fff, yellow);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    margin: 10px;
  }

  h2 {
    background-image: linear-gradient(180deg, #fff, yellow);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin: 10px;
  }

  .restart, .next {
    margin-top: 50px !important;

  }

  .page-centered {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  .page-horizontally-centered {
    margin: 0;
    position: absolute;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  
  button {
    cursor: pointer;
    color: white;
    user-select: none;
    font-size: 30px;
    width: 500px;
    border: 3px solid #fff;
    box-shadow: 1px 2px 0 rgba(0,0,0,0.1);
    border-radius: 10px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.25);
    text-align: center;
    background: #0d0d0d;
  }
`
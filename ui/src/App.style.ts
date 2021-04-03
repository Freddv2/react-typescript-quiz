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
    font-size: 70px;
    font-weight: 400;
    
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
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    align-items: center;
    font-size: 50px;
    width: 500px;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  
  .page-centered {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
`
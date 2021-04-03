import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1200px;
  
  .question-text {
    color: white;
    font-size: 30px;
    font-weight: 400;
    text-align: center;
  }
`

type ButtonWrapperProps = {
    correct: boolean
    userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  text-align: center;

  :hover {
    opacity: 0.8;
  }
  
  button {
    cursor: pointer;
    user-select: none;
    font-size: 30px;
    width: 500px;
    margin: 20px 0;
    background: ${({correct, userClicked}) => 
            correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
                    : !correct && userClicked ? 'linear-gradient(90deg, #ff5656, #c16868)'
                    : '#0d0d0d'};
    border: 3px solid #fff;
    box-shadow: 1px 2px 0 rgba(0,0,0,0.1);
    border-radius: 10px;
    color: white;
    text-shadow: 0 1px 0 rgba(0,0,0,0.25);
    text-align: center;
  }
`
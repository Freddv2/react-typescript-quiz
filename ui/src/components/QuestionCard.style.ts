import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1200px;
  
  .question-text {
    color: white;
    font-size: 25px;
    font-weight: 400;
    text-align: center;
  }
  .answers {
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
    margin: 10px 0;
    background: ${({correct, userClicked}) => 
            correct ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
                    : !correct && userClicked ? 'linear-gradient(90deg, #ff5656, #c16868)'
                    : '#0d0d0d'};
  }
`
import styled from "styled-components";

type OptionWrapperProps = {
    selected: boolean
}

export const TriviaSettingsWrapper = styled.div`
  margin: 0 120px 0 120px;
`

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 30px 0;
`

export const OptionWrapper = styled.div<OptionWrapperProps>`
  transition: all 0.3s ease;
  text-align: center;
  margin-bottom: 5px;
  flex: 1 0 21%; /* explanation below */

  :hover {
    opacity: 0.8;
  }

  button {
    font-size: 18px;
    height: 50px;
    width: 150px;
    background: ${({selected}) => selected ? 'linear-gradient(90deg, #56ffa4, #59bc86)' : '#0d0d0d'};
  }
`
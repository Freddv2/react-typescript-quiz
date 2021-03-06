import styled from "styled-components";

type OptionWrapperProps = {
    selected: boolean
}

export const TriviaSettingsWrapper = styled.div`
  margin: 0 20% 0 20%;
`

export const OptionsTitleWrapper = styled.div`

`

export const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const OptionWrapper = styled.div<OptionWrapperProps>`
  transition: all 0.3s ease;
  text-align: center;
  margin-bottom: 5px;
  flex: 1 0 21%; /* explanation below */

  button {
    font-size: 18px;
    height: 30px;
    width: 130px;
    color: ${({selected}) => selected ? 'black' : 'white'};
    background: ${({selected}) => selected ? 'azure' : 'black'};;
  }
`
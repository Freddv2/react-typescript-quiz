import styled from "styled-components";

type OptionWrapperProps = {
    selected: boolean
}
export const OptionWrapper = styled.div<OptionWrapperProps>`
  transition: all 0.3s ease;
  text-align: center;

  :hover {
    opacity: 0.8;
  }

  button {
    background: ${({selected}) => selected ? 'linear-gradient(90deg, #56ffa4, #59bc86)' : '#0d0d0d'};
  }
`
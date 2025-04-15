import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12rem;
  width: 12rem;
  border-radius: 50%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "img/logo-light.png" : "img/logo-dark.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

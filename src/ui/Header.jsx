import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;

  position: relative;
  z-index: 10001;
`;

const HamburgerButton = styled.button`
  font-size: 2.4rem;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StyledHeader>
      <HamburgerButton onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </HamburgerButton>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;

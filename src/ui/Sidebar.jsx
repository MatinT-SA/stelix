import React, { useState } from "react";
import styled from "styled-components";
import { HiMenu, HiX } from "react-icons/hi";
import MainNav from "./MainNav"; // Assuming you have a MainNav component for your links or navigation
import Logo from "../ui/Logo";

// Sidebar styles
const SidebarContainer = styled.aside`
  width: 26rem;
  background-color: var(--color-grey-100);
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 99999;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  padding: 2rem;

  @media (min-width: 1000px) {
    transform: translateX(0);
  }

  @media (max-width: 1000px) {
    position: fixed;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 2.4rem;
`;

const MenuButton = styled.button`
  font-size: 2.4rem;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: block;

  @media (min-width: 1000px) {
    display: none; /* Hide on larger screens */
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    console.log("Toggling sidebar", isOpen ? "Open" : "Closed"); // Debugging output
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Menu Button visible only on small screens */}
      <MenuButton onClick={toggleSidebar}>
        <HiMenu />
      </MenuButton>

      {/* Sidebar */}
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo /> {/* Assuming you have a Logo component */}
          <CloseButton onClick={toggleSidebar}>
            <HiX />
          </CloseButton>
        </SidebarHeader>

        <SidebarContent>
          <MainNav />{" "}
          {/* Assuming you have a MainNav component for navigation links */}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;

import React from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 0.8rem 0;

  @media (max-width: 1400px) {
    padding: 0.5rem 0;
    grid-template-columns: 11rem 0.8fr;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ children, label, error, className }) {
  return (
    <StyledFormRow className={className}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}

      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;

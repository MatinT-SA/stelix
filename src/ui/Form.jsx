import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: ${props.size === "large" ? "130rem" : "80rem"};
      max-width: 95vw;
      padding: 1rem 4.8rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 1400px) {
        width: ${props.size === "large" ? "90rem" : "80rem"};
      }

      @media (max-width: 800px) {
        width: ${props.size === "large" ? "90rem" : "60rem"};
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

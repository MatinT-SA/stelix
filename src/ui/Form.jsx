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

      @media (max-width: 500px) {
        padding: 2.4rem 2rem;
      }

      @media (max-width: 340px) {
        padding: 2.4rem 1rem;
      }
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

      @media (max-width: 900px) {
        width: ${props.size === "large" ? "80rem" : "60rem"};
      }

      @media (max-width: 800px) {
        width: ${props.size === "large" ? "70rem" : "60rem"};
        padding: 1rem;
      }

      @media (max-width: 650px) {
        height: ${props.size === "large" && "75vh"};
        overflow-y: scroll;
      }

      @media (max-width: 600px) {
        width: ${props.size === "large" ? "60rem" : "40rem"};
        padding: 0.5rem 1.5rem;
      }

      @media (max-width: 400px) {
        width: ${props.size === "large" ? "50rem" : "35rem"};
        padding: 0.5rem 1.5rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

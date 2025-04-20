import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import styled from "styled-components";

const ResponsiveFormRow = styled(FormRow)`
  @media (max-width: 1400px) {
    grid-template-columns: 2fr 2fr 1fr;
  }

  @media (max-width: 1070px) {
    grid-template-columns: 2fr 2fr 0.5fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1.5fr 2fr;
  }

  @media (max-width: 410px) {
    grid-template-columns: 2fr 1fr;
    font-size: 1.2rem;
  }
`;

function SignupForm() {
  const { isSigningUp, signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password, fullName }) {
    signup({ email, password, fullName }, { onSettled: () => reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ResponsiveFormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "This field is required" })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords don't match",
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow>
        <Button
          onClick={reset}
          variation="secondary"
          type="reset"
          disabled={isSigningUp}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </ResponsiveFormRow>
    </Form>
  );
}

export default SignupForm;

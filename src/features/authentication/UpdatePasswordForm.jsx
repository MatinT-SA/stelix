import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ResponsiveFormRow = styled(FormRow)`
  @media (max-width: 1400px) {
    grid-template-columns: 1.5fr 2fr 1fr;
  }

  @media (max-width: 1070px) {
    grid-template-columns: 2fr 2fr 0.5fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 2fr 1.5fr;
  }
`;

function UpdatePasswordForm() {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ResponsiveFormRow
        label={
          isMobile ? "New pass (+8 char)" : "New Password (min 8 characters)"
        }
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "New Password must be at least 8 characters",
            },
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </ResponsiveFormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

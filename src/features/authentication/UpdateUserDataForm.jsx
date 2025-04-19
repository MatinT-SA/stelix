import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ResponsiveFormRow = styled(FormRow)`
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 2fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr 2fr;
  }
`;

function UpdateUserDataForm() {
  const isMobile = useMediaQuery("(max-width: 500px)");

  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ResponsiveFormRow label="Email address">
        <Input value={email} disabled />
      </ResponsiveFormRow>
      <ResponsiveFormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow label={isMobile ? "Avatar" : "Avatar Image"}>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </ResponsiveFormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import styled from "styled-components";

const ResponsiveFormRow = styled(FormRow)`
  @media (max-width: 600px) {
    grid-template-columns: 9rem 1fr;
  }
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <ResponsiveFormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discound should be less than regular price",
          })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow label="location" error={errors?.location?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="location"
          {...register("location")}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow
        label="description"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow>
        <FileInput
          id="image"
          accept="image/*"
          {...register(
            "image",
            isEditSession ? false : { required: "This field is required" }
          )}
        />
      </ResponsiveFormRow>

      <ResponsiveFormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Update Cabin" : "Create New Cabin"}
        </Button>
      </ResponsiveFormRow>
    </Form>
  );
}

export default CreateCabinForm;

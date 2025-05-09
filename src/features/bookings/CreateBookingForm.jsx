import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Checkbox from "../../ui/Checkbox";

import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "../guests/useGuests";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-family: inherit;
  color: #1f2937;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    outline: none;
    background-color: #fff;
  }

  option {
    color: #111827;
    background-color: #fff;
  }
`;

function CreateBookingForm({ onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { cabins } = useCabins();
  const { guests } = useGuests();

  const { register, handleSubmit, reset, formState, watch } = useForm({
    defaultValues: {
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
    },
  });

  const { errors } = formState;

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const cabinPrice = Number(watch("cabinPrice")) || 0;
  const extrasPrice = Number(watch("extrasPrice")) || 0;
  const totalPrice = cabinPrice + extrasPrice;

  function onSubmit(data) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const numNights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const preparedData = {
      ...data,
      numGuests: Number(data.numGuests),
      cabinPrice: Number(data.cabinPrice),
      extrasPrice: Number(data.extrasPrice),
      totalPrice: totalPrice,
      numNights: numNights > 0 ? numNights : 0,
    };

    createBooking(preparedData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal" size="large">
      <FormGrid>
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <StyledSelect
            disabled={isCreating}
            {...register("cabinId", { required: "This field is required" })}
          >
            <option value="">Select cabin</option>
            {cabins?.map((cabin) => (
              <option key={cabin.id} value={cabin.id}>
                {cabin.name}
              </option>
            ))}
          </StyledSelect>
        </FormRow>

        <FormRow label="Guest" error={errors?.guestId?.message}>
          <StyledSelect
            disabled={isCreating}
            {...register("guestId", { required: "This field is required" })}
          >
            <option value="">Select guest</option>
            {guests?.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
          </StyledSelect>
        </FormRow>

        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            {...register("startDate", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="End Date" error={errors?.endDate?.message}>
          <Input
            disabled={isCreating}
            type="date"
            {...register("endDate", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Nights">
          <Input
            type="number"
            disabled
            readOnly
            value={Math.max(
              Math.ceil(
                (new Date(endDate) - new Date(startDate)) /
                  (1000 * 60 * 60 * 24)
              ),
              0
            )}
          />
        </FormRow>

        <FormRow label="Guests" error={errors?.numGuests?.message}>
          <Input
            disabled={isCreating}
            type="number"
            {...register("numGuests", {
              required: "This field is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
          />
        </FormRow>
        <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
          <Input
            disabled={isCreating}
            type="number"
            {...register("cabinPrice", {
              required: "This field is required",
              min: { value: 0, message: "Must be at least 0" },
            })}
          />
        </FormRow>
        <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
          <Input
            disabled={isCreating}
            type="number"
            {...register("extrasPrice", {
              required: "This field is required",
              min: { value: 0, message: "Must be at least 0" },
            })}
          />
        </FormRow>
        <FormRow label="Total Price">
          <Input type="number" readOnly disabled value={totalPrice} />
        </FormRow>
        <FormRow label="Status" error={errors?.status?.message}>
          <StyledSelect
            disabled={isCreating}
            {...register("status", { required: "This field is required" })}
          >
            <option value="unconfirmed">Unconfirmed</option>
            <option value="checked-in">Checked-in</option>
          </StyledSelect>
        </FormRow>
        <FormRow label="Has breakfast">
          <Checkbox
            disabled={isCreating}
            id="hasBreakfast"
            {...register("hasBreakfast")}
          />
        </FormRow>
        <FormRow label="Is paid">
          <Checkbox disabled={isCreating} id="isPaid" {...register("isPaid")} />
        </FormRow>
      </FormGrid>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea {...register("observations")} />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

const ResponsiveFormRow = styled(FormRow)`
  @media (max-width: 1400px) {
    grid-template-columns: 1.5fr 2fr 1fr;
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

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleSetting(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <ResponsiveFormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleSetting(e, "minBookingLength")}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleSetting(e, "maxBookingLength")}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleSetting(e, "maxGuestsPerBooking")}
        />
      </ResponsiveFormRow>
      <ResponsiveFormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleSetting(e, "breakfastPrice")}
        />
      </ResponsiveFormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

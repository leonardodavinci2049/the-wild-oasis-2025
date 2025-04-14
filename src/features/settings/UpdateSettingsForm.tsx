import Form from "../../styled_components/Form";
import FormRow from "../../styled_components/FormRow";
import Input from "../../styled_components/Input";
import Spinner from "../../styled_components/Spinner";
import { useSettings } from "./useSettings";

import { useUpdateSetting } from "./useUpdateSetting";

// Defina o tipo SettingsType para corresponder aos campos esperados
type SettingsType = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};


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

  // Tipando corretamente a função handleUpdate
  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof SettingsType
  ) {
    const { value } = e.target;

    if (!value) return;
    // Usando um type assertion para informar ao TypeScript que este objeto parcial é válido
    updateSetting({ [field]: Number(value) } );
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

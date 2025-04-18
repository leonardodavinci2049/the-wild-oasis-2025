import { useForm } from "react-hook-form";
import { useUpdateUser } from "./hooks/useUpdateUser";

import Form from "../../styled_components/Form";
import FormRow from "../../styled_components/FormRow";
import Input from "../../styled_components/Input";
import Button from "../../styled_components/Button";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =    useForm();
  const { errors } = formState;

  const { mutate: updateUser, isUpdating: isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  function handleReset(e) {
    // e.preventDefault();
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={
          typeof errors?.password?.message === "string"
            ? errors.password.message
            : undefined
        }
      >
        <Input
          type="password"
          id="password"
          // this makes the form better for password managers
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={
          typeof errors?.passwordConfirm?.message === "string"
            ? errors.passwordConfirm.message
            : undefined
        }
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
      </FormRow>
      <FormRow>
        <Button onClick={handleReset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

import { useForm } from "react-hook-form";
import { useUpdateUser } from "./hooks/useUpdateUser";

import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import Button from "../../components/Button";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: { password: string }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  function handleReset() {
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
        <>
          <Button
            onClick={handleReset}
            type="reset"
            variation="secondary"
            size="medium"
          >
            Cancel
          </Button>
          <Button disabled={isUpdating} size="medium" variation="primary">
            Update password
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

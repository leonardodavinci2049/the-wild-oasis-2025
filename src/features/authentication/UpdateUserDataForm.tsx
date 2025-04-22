import { useState } from "react";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdateUser";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Button from "../../components/Button";

function UpdateUserDataForm() {
  // We don't need the loading state
  const user = useUser();
  const email = user?.user?.email ?? "";
  const currentFullName = user?.user?.user_metadata?.fullName ?? "";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined);
          // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
    setFullName(currentFullName);
    setAvatar(undefined);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || undefined)}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            onClick={handleCancel}
            type="reset"
            variation="secondary"
            size="medium"
          >
            Cancel
          </Button>
          <Button disabled={isUpdating} size="medium" variation="primary">
            Update account
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

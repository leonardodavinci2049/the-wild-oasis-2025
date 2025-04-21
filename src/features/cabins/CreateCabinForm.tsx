import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import FileInput from "../../components/FileInput";
import Button from "../../components/Button";

import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";

import { CabinType } from "../../types/cabin/CabinsType";
import { CabinFormData } from "../../types/cabin/CabinFornData";

// Interface para os dados do formulário

function CreateCabinForm({
  cabinToEdit,
  onCloseModal,
}: {
  cabinToEdit: CabinType | null;
  onCloseModal?: () => void;
}) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinFormData>({
      defaultValues: isEditSession
        ? (editValues as CabinFormData)
        : ({} as CabinFormData),
    });
  const { errors } = formState;

  function onSubmit(data: CabinFormData) {
    // Verifica se há um arquivo de imagem selecionado

    let image: string | File | null = null;

    if (typeof data.image === "string") {
      image = data.image;
      console.log("Imagem é  uma string");
    } else if (data.image instanceof FileList && data.image.length > 0) {
      image = data.image[0];
      console.log("Imagem é  uma FileList");
    } else if (data.image instanceof File) {
      image = data.image;
      console.log("Imagem é uma File");
    } else {
      // Lida com o caso de data.image ser null/undefined ou outro tipo inesperado
      console.warn("Imagem não fornecida ou em formato inesperado");
    }

    console.log("data: ", data);

    if (isEditSession) {
      editCabin(
        { editCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      // console.log("data111", data);
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
  }

  function onError(): void {
    toast.error(`Error => ${"Verifique Campos requeridos"}`);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            size="medium" // Add the required size property
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button size="medium" variation="primary" disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

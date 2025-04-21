import { CabinFormData } from "../types/cabin/CabinFornData";
import supabase, { supabaseUrl } from "./supabase";
import { PostgrestError } from "@supabase/supabase-js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(
  newCabin: CabinFormData,
  id: number | null
) {
  // console.log("newCabin - xxxx", newCabin);
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${
    newCabin.image instanceof FileList
      ? newCabin.image[0].name
      : newCabin.image instanceof File
      ? newCabin.image.name
      : ""
  }`.replaceAll("/", "");

  console.log("imageName", imageName);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let data;
  let error: PostgrestError | null;

  // A) CREATE
  if (!id) {
    // console.log("CREATE: ", newCabin);
    const result = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

    data = result.data;
    error = result.error;
  }
  // B) EDIT
  else {
    const result = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

    data = result.data;
    error = result.error;
  }

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  // Verificar se newCabin.image é um arquivo válido antes de fazer upload
  if (newCabin.image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3.ete the cabin IF there was an error uplaoding image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  } else if (newCabin.image instanceof FileList && newCabin.image.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image[0]);

    // 3. Delete the cabi there was an error uplaoding image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  } else {
    console.warn("No valid image file to upload");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

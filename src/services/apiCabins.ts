import { CabinType } from "../types/CabinsType";
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
  newCabin: CabinType,
  id: CabinType["id"] | null
) {
  //newCabin.image?.startsWith?.(supabaseUrl);
 // const hasImagePath = "xxxx"
 // const imageName = `${Math.random()}-${newCabin.image}`.replaceAll("/", "");
 // const imagePath = hasImagePath
//    ? newCabin.image
 //   : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let { data, error }: { data: CabinType | null; error: PostgrestError | null } = { data: null, error: null };



  // A) CREATE
  if (!id) {
    const response = await supabase
      .from("cabins")
      .insert([{ ...newCabin}]);

    data = response.data;
    error = response.error;
  }

  // B) EDIT
  if (id) {
    const response = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();

    data = response.data;
    error = response.error;
  }

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
/*   if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  } */

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

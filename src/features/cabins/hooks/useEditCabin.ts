import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import { toast } from "react-hot-toast";
import { CabinFormData } from "../../../types/CabinFornData";


export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      editCabinData,
      id,
    }: {
      editCabinData: CabinFormData;
      id: CabinFormData["id"] | null;
    }) => createEditCabin(editCabinData, typeof id === "number" ? id : null),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}


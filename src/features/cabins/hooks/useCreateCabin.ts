import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../../services/apiCabins";
import { CabinType } from "../../../types/CabinsType";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({newCabin, id, }: {  newCabin: CabinType; id: number | null;  }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message + ' - XXXX'),
  });

  return { isCreating, createCabin };
}

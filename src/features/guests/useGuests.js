import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isLoading, data } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
    retry: false,
  });

  console.log(data);

  return {
    guests: data,
    isLoading,
  };
}

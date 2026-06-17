import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

type Condition = {
  condition_id: number;
  condition_name: string;
};

const CONDITION = "condition";

export const useConditions = () => {
  return useQuery({
    queryKey: [CONDITION],
    queryFn: () => getAll<Condition[]>(CONDITION),
    staleTime: 60 * 10 * 1000,
  });
};

export const useCondition = (id: number) => {
  return useQuery({
    queryKey: [CONDITION, id],
    queryFn: () => getOne<Condition>(CONDITION, id),
    staleTime: 60 * 10 * 1000,
  });
};

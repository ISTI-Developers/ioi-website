import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./controller";

type FunctionITAM = {
  function_id: number;
  function_name: string;
};

const FUNCTIONITAM = "function";

export const useFunctionsITAM = () => {
  return useQuery({
    queryKey: [FUNCTIONITAM],
    queryFn: () => getAll<FunctionITAM[]>(FUNCTIONITAM),
    staleTime: 60 * 10 * 1000,
  });
};

export const useFunctionITAM = (id: number) => {
  return useQuery({
    queryKey: [FUNCTIONITAM, id],
    queryFn: () => getOne<FunctionITAM>(FUNCTIONITAM, id),
    staleTime: 60 * 10 * 1000,
  });
};

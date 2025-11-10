import { useQuery } from "@tanstack/react-query";
import { QueryAllUsersUseCase } from "../../application/query-all-users.use-case";
import { UserRestRepository } from "../../infrastructure/user-rest-repository";

export const useQueryAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      new QueryAllUsersUseCase(new UserRestRepository()).execute(),
  });
};

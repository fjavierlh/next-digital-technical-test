import { useQuery } from "@tanstack/react-query";
import { QueryUserByIdUseCase } from "../../application/query-user-by-id.use-case";
import { UserRestRepository } from "../../infrastructure/user-rest-repository";

export const useQueryUserById = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () =>
      new QueryUserByIdUseCase(new UserRestRepository()).execute(userId),
  });
};

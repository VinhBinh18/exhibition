import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { USER_ROLE } from "@/lib/config";
const getMe = async (..._args: unknown[]) => null;
const getUsers = async (..._args: unknown[]) => ({
  data: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
});
import { useRoleStore } from "@/stores/use-role-store";

import { User, UseUsersParams } from "@/types/user";
import { PaginatedResponse } from "@/types/global";

export const useMe = () => {
  const { setRole } = useRoleStore();

  return useQuery<User | null>({
    queryKey: queryKeys.user.me,

    queryFn: async () => {
      try {
        const user = await getMe();

        if (user?.role === USER_ROLE.ADMIN || user?.role === USER_ROLE.CUSTOMER) {
          setRole(user.role);
        } else {
          setRole(null);
        }

        return user;
      } catch {
        setRole(null);
        return null;
      }
    },
  });
};

export const useUsers = (params: UseUsersParams = { page: 1, limit: 20 }) =>
  useQuery<PaginatedResponse<User>>({
    queryKey: queryKeys.user.list(params),
    queryFn: () => getUsers(params),
  });

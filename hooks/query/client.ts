import { useQuery } from "@tanstack/react-query";

import { ClientListParams, getClients } from "@/lib/api/clients";
import { PaginatedResponse } from "@/types/global";
import { ClientRecord } from "@/types/records";

import { queryKeys } from "../query-keys";

export const useClients = (params: ClientListParams = { page: 1, limit: 20 }) =>
  useQuery<PaginatedResponse<ClientRecord>>({
    queryKey: queryKeys.client.list(params),
    queryFn: () => getClients(params),
  });

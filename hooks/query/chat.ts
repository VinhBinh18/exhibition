import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getLatestMessages, getMessagesByRoom } from "@/lib/api/chat";

import { PaginatedResponse } from "@/types/global";
import { Message, UseMessageParams } from "@/types/chat";

export const useMessagesByRoom = (
  roomId: string,
  params: UseMessageParams = { page: 1, limit: 20 }
) => {
  return useQuery<PaginatedResponse<Message>>({
    queryKey: queryKeys.chat.byRoom({ roomId, ...params }),
    queryFn: () => getMessagesByRoom(roomId, params),
    enabled: !!roomId,
  });
};

export const useLatestMessages = (params: UseMessageParams) =>
  useQuery<PaginatedResponse<Message>>({
    queryKey: queryKeys.chat.latest(params),
    queryFn: () => getLatestMessages(params),
  });

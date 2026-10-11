import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getBlog, getBlogs, getRelatedBlogs } from "@/lib/api/blogs";

import { PaginatedResponse } from "@/types/global";
import { BlogType, UseBlogsParams } from "@/types/blog";

export const useBlogs = (params: UseBlogsParams = { page: 1, limit: 10 }) =>
  useQuery<PaginatedResponse<BlogType>>({
    queryKey: queryKeys.blog.list(params),
    queryFn: () => getBlogs(params),
  });

export const useRelatedBlogs = (blogId: string) =>
  useQuery<PaginatedResponse<BlogType>>({
    queryKey: queryKeys.blog.related(blogId),
    enabled: !!blogId,
    queryFn: () => getRelatedBlogs(blogId),
  });

export const useBlog = (id: string) =>
  useQuery<BlogType>({
    queryKey: queryKeys.blog.detail(id),
    queryFn: () => getBlog(id),
    enabled: !!id,
  });

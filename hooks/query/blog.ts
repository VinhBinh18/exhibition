import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { PaginatedResponse } from "@/types/global";
import { BlogType, UseBlogsParams } from "@/types/blog";

const emptyBlogPage = (): PaginatedResponse<BlogType> => ({
  data: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
});

const getBlogs = async (
  ..._args: unknown[]
): Promise<PaginatedResponse<BlogType>> => emptyBlogPage();

const getBlog = async (..._args: unknown[]): Promise<BlogType | null> => null;

const getRelatedBlogs = async (
  ..._args: unknown[]
): Promise<PaginatedResponse<BlogType>> => emptyBlogPage();

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
  useQuery<BlogType | null>({
    queryKey: queryKeys.blog.detail(id),
    queryFn: () => getBlog(id),
    enabled: !!id,
  });

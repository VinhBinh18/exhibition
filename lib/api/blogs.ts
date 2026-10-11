import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { USE_MOCK_API } from "@/lib/config";
import { MOCK_BLOGS } from "@/lib/sample-data/data";
import { listMockBlogs } from "@/lib/sample-data/resolve";
import { BlogType, CreateBlogPayload, UpdateBlogPayload, UseBlogsParams } from "@/types/blog";
import { PaginatedResponse } from "@/types/global";

export const fetchBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<PaginatedResponse<BlogType>> => {
  if (USE_MOCK_API) {
    return listMockBlogs(page, limit, search);
  }

  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) params.set("search", search);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return { data: [], page, limit, total: 0, totalPages: 0 };

    const { result } = await res.json();
    return result;
  } catch {
    return { data: [], page, limit, total: 0, totalPages: 0 };
  }
};

export const fetchRelatedBlogs = async (
  blogId: string
): Promise<BlogType[]> => {
  if (USE_MOCK_API) {
    return MOCK_BLOGS.filter((blog) => blog._id !== blogId);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/related/${blogId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const { result } = await res.json();
    return result.data;
  } catch {
    return [];
  }
};

export const fetchBlog = async (slug: string): Promise<BlogType | null> => {
  if (USE_MOCK_API) {
    return MOCK_BLOGS.find((blog) => blog.slug === slug) ?? null;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/slug/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const { result } = await res.json();
    return result;
  } catch {
    return null;
  }
};

export const getBlogs = async (params: UseBlogsParams = { page: 1, limit: 10 }) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<BlogType> }>(
    `${API_ENDPOINTS.blogs.list}?${query}`
  );
  return response.data.result;
};

export const getRelatedBlogs = async (blogId: string) => {
  const response = await apiService.get<{ result: PaginatedResponse<BlogType> }>(
    API_ENDPOINTS.blogs.related(blogId)
  );
  return response.data.result;
};

export const getBlog = async (id: string) => {
  const response = await apiService.get<{ result: BlogType }>(
    API_ENDPOINTS.blogs.detail(id)
  );
  return response.data.result;
};

export const createBlog = async (payload: CreateBlogPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("summary", payload.summary);
  formData.append("description", payload.description);
  formData.append("thumbnail", payload.thumbnail);
  return unwrap(await apiService.post(API_ENDPOINTS.blogs.list, formData));
};

export const updateBlog = async (blogId: string, payload: UpdateBlogPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("summary", payload.summary);
  formData.append("description", payload.description);
  if (payload.thumbnail instanceof File) {
    formData.append("thumbnail", payload.thumbnail);
  }
  return unwrap(await apiService.put(API_ENDPOINTS.blogs.detail(blogId), formData));
};

export const deleteBlog = async (blogId: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.blogs.detail(blogId)));
};

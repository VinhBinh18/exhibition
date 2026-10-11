export const queryKeys = {
  user: {
    root: ["users"],
    me: ["users", "me"],
    list: ({
      page = 1,
      limit = 20,
      search = "",
      sortBy = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
    }) => ["users", "list", page, limit, search, sortBy],
    detail: (id: string) => ["users", "detail", id],
  },

  blog: {
    root: ["blogs"],
    list: ({
      page = 1,
      limit = 10,
      search = "",
      sortBy = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
    }) => ["blogs", "list", page, limit, search, sortBy],
    detail: (slug: string) => ["blogs", "detail", slug],
    related: (blogId: string) => ["blogs", "related", blogId],
  },

  category: {
    root: ["categories"],
    list: ({
      page = 1,
      limit = 20,
      search = "",
      sortBy = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
    }) => ["categories", "list", page, limit, search, sortBy],
    detail: (id: string) => ["categories", "detail", id],
    slug: (slug: string) => ["categories", "slug", slug],
    byName: (name: string) => ["categories", "byName", name],
  },

  dashboard: {
    root: ["dashboard"],
    summary: ["dashboard", "summary"],
  },

  client: {
    root: ["clients"],
    list: ({
      page = 1,
      limit = 20,
      name = "",
    }: {
      page?: number;
      limit?: number;
      name?: string;
    }) => ["clients", "list", page, limit, name],
  },

  event: {
    root: ["events"],
    list: ({
      page = 1,
      limit = 20,
      name = "",
    }: {
      page?: number;
      limit?: number;
      name?: string;
    }) => ["events", "list", page, limit, name],
    detail: (id: string) => ["events", "detail", id],
  },

};

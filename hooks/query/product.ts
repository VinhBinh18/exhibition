import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getProduct, getProducts, getRelatedProducts } from "@/lib/api/products";

import { PaginatedResponse } from "@/types/global";
import { ProductType, UseProductsParams } from "@/types/product";

export const useProducts = (params: UseProductsParams) =>
  useQuery<PaginatedResponse<ProductType>>({
    queryKey: queryKeys.product.list(params),
    queryFn: () => getProducts(params),
  });

export const useRelatedProducts = (
  productId: string,
  params: UseProductsParams = { page: 1, limit: 10 }
) =>
  useQuery({
    queryKey: queryKeys.product.related(productId, params),
    queryFn: () => getRelatedProducts(productId, params),
    enabled: !!productId,
  });

export const useProduct = (productId: string) =>
  useQuery<ProductType>({
    queryKey: queryKeys.product.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

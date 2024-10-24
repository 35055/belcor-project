import { useMutation, useQuery } from "react-query";
import httpRequest from "../api/httpRequest";

const tableService = {
  getList: () => httpRequest.get(`/products`),
  create: (data) => httpRequest.post(`products`, data),
  update: (data) => httpRequest.put(`products/${data.id}`, data),
  delete: (id, params) => httpRequest.delete(`products/${id}`, { params }),
};

export const useTableListQuery = ({ params = {}, queryParams } = {}) => {
  return useQuery(
    ["TABLE_LIST", params],
    () => tableService.getList(params),
    queryParams
  );
};

export const useUpdateOrderMutation = (mutationSettings) => {
  return useMutation(
    (data) => documentTypeService.update(data),
    mutationSettings
  );
};

export const useCreateOrderMutation = (mutationSettings) => {
  return useMutation(
    (data) => documentTypeService.create(data),
    mutationSettings
  );
};

export const useDeleteOrderMutation = (mutationSettings, params) => {
  return useMutation(
    (id) => documentTypeService.delete(id, params),
    mutationSettings
  );
};

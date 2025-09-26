import { apiGet } from "./client";

export async function fetchVehicles(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.query) searchParams.set("q", params.query);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  const path = "/vehicles/all/visible";
  return apiGet(path);
}

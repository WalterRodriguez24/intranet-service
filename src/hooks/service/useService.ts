import useSWR from "swr";
import { getServicesApi } from "@/application/service/client/use-case";

export function useServices() {
  const { data, error, isLoading } = useSWR("services", getServicesApi);

  return {
    services: data || [],
    isLoading,
    isError: error,
  };
}

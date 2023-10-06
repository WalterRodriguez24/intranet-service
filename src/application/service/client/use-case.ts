import { Service } from "@/domain/services/client";

export async function getServicesApi(): Promise<Service[]> {
  const res = await fetch("/api/service");
  return await res.json();
}

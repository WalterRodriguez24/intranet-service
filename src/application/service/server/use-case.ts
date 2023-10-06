import db from "@/persistence/server";

export async function listServices() {
  const services = await db.service.findMany();

  return services;
}

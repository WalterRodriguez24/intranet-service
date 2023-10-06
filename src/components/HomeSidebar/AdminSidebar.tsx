"use client";
import { Service } from "@/domain/services/client";
// import BellIcon from "@/icons/BellIcon";
import { Sidebar } from "flowbite-react";
import Link from "next/link";

type Props = {
  services: Service[];
};

export default function AdminSidebar({ services }: Props) {
  return (
    <>
      <Sidebar.Item href="services/create/text" as={Link}>
        Crear Guia
      </Sidebar.Item>
      <Sidebar.Collapse label="Servicios">
        {services.map((service) => (
          <Sidebar.Item
            href={`services/${service.id}`}
            as={Link}
            key={service.id}
          >
            <span className="text-sm">{service.name}</span>
          </Sidebar.Item>
        ))}
      </Sidebar.Collapse>
      <Sidebar.Item href="employee" as={Link}>
        Empleados
      </Sidebar.Item>
      {/*    <Sidebar.Item icon={() => <BellIcon height={20} width={20} />} href="#">
        Notificaciones
      </Sidebar.Item> */}
    </>
  );
}

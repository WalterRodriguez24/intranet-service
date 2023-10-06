"use client";

import EmployeeItem from "@/components/EmployeeItem";
import TextInput from "@/components/Form/TextInput";
import SearchIcon from "@/icons/SearchIcon";
import UserDetail from "./Components/UserDetail";
import { useState } from "react";
import { Employee } from "@/domain/employee/client";
import AddIcon from "@/icons/AddIcon";
import { useLocalStorage } from "@/hooks/shared/useLocalStorage";

const services = [
  {
    name: "Transporte de carga",
    value: "transporte-de-carga",
  },
  {
    name: "Mensajería",
    value: "mensajeria",
  },
  {
    name: "Documentos valorados",
    value: "documentos-valorados",
  },
  {
    name: "Servicios especiales",
    value: "servicios-especiales",
  },
  {
    name: "Servicio Inhouse",
    value: "servicio-inhouse",
  },
  {
    name: "Servicio aéreo",
    value: "servicio-aereo",
  },
];

export default function Employee() {
  const [filterWord, setFilterWord] = useState("");

  const [employees, setEmployees] = useLocalStorage<Employee[]>(
    "EMPLOYEES",
    []
  );

  const [employeeSelected, setEmployeeSelected] = useState<Employee | null>(
    employees[0]
  );

  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  const handleToggleFilter = (value: string) => {
    if (filterSelected.includes(value)) {
      setFilterSelected(filterSelected.filter((item) => item !== value));
    } else {
      setFilterSelected([...filterSelected, value]);
    }
  };

  return (
    <section className="grid grid-cols-2 gap-4 grid-rows-1 h-full overflow-hidden">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="w-full mb-4 flex flex-col gap-4">
          <h2 className="font-serif text-2xl font-bold">Guias de usuario</h2>
          <div className="flex gap-2 items-center w-full">
            <TextInput
              className=""
              icon={<SearchIcon />}
              placeholder="Buscar Empleado"
              labelClass="bg-white rounded-xl w-full"
              onChange={(e) => setFilterWord(e.target.value)}
            />
            <button
              className="p-2 text-lg bg-indigo-500 rounded-xl text-white"
              onClick={() => {
                setEmployeeSelected(null);
              }}
            >
              <AddIcon />
            </button>
          </div>
          <div className="flex gap-2 w-full items-center overflow-auto">
            <span className="text-xs font-bold sticky left-0 bg-neutral-50 p-2">
              Servicios:
            </span>
            {services.map((service) => (
              <button
                key={service.value}
                onClick={() => handleToggleFilter(service.name)}
                className={`bg-white rounded-lg py-1 px-4 hover:bg-gray-100 whitespace-nowrap ${
                  filterSelected.includes(service.name) &&
                  "!bg-indigo-500 text-white"
                }`}
              >
                <span className="text-xs">{service.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="h-full flex flex-col overflow-auto">
          {employees
            .filter((employee) => {
              return employee.name
                .toLowerCase()
                .includes(filterWord.toLowerCase());
            })
            .filter((employee) => {
              if (filterSelected.length === 0) return true;
              return filterSelected.includes(employee.apartment);
            })
            .map((employee) => (
              <EmployeeItem
                key={employee.id}
                selected={employeeSelected?.id === employee.id}
                employee={employee}
                serviceLabel={
                  services.find(
                    (service) => service.value === employee.apartment
                  )?.name || ""
                }
                onClick={() => setEmployeeSelected(employee)}
              />
            ))}
        </div>
      </div>

      <aside className="h-full w-full bg-white rounded-lg">
        {/* {showEditor && ( */}

        <UserDetail
          employee={employeeSelected}
          onSubmit={(data) => {
            const existEmployee = employees.find(
              (employee) => employee.id === data.id
            );

            if (existEmployee) {
              setEmployees(
                employees.map((employee) => {
                  if (employee.id === data.id) {
                    return data;
                  }
                  return employee;
                })
              );
              setEmployeeSelected(data);
              return;
            }

            setEmployees([data, ...employees]);
            setEmployeeSelected(data);
          }}
        />
        {/* )} */}
      </aside>
    </section>
  );
}

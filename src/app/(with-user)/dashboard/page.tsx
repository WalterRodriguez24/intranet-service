"use client";
import MapView from "@/components/Map";
import { Card, DonutChart, Legend, Title } from "@tremor/react";
// import XLSX from "xlsx";

import { Checkbox, Table } from "flowbite-react";
import { useMemo, useState } from "react";
import { groupById } from "../../../../utils/grupBy";
import EmployeeMarker from "@/components/Map/Markers/EmployeeMarker";
import BranchOfficeMarker from "@/components/Map/Markers/BranchOfficeMarker";
import { BranchOffice } from "@/types/BranchOffice";
import { Employee } from "@/domain/employee/client";
import { useLocalStorage } from "@/hooks/shared/useLocalStorage";
import ArrowDown from "@/icons/ArrowDown";
import Script from "next/script";

type EmployeePieData = {
  name: string;
  value: number;
};

const branchOffices: BranchOffice[] = [
  {
    id: "813f519c-21cf-4cfd-a36c-c02a4bc978b1",
    capacity: 100,
    direction: "Av. 28 de Julio 123",
    latitude: -11.98,
    longitude: -77.081,
    name: "Sucursal 1",
  },
];

const getPercentage = (number: number, total: number) => (number / total) * 100;

const generateExcel = (data: any, fileName: string) => {
  //@ts-ignore
  const { XLSX } = window;

  const workbook = XLSX.utils.book_new();

  // Convierte el array de datos en una hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Agrega la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Crea un objeto Blob a partir del archivo binario
  const excelBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Crea un enlace de descarga y dispara el evento de clic
  const url = URL.createObjectURL(excelBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  // Libera la URL del objeto Blob
  URL.revokeObjectURL(url);
};

export default function DashboardPage() {
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const [employees] = useLocalStorage<Employee[]>("EMPLOYEES", []);

  const employeesToUse = selectedEmployees.length
    ? selectedEmployees
    : employees;

  const totalEmployees = employeesToUse.length;

  const ageAverage = useMemo(() => {
    const sum = employeesToUse.reduce((acc, curr) => acc + Number(curr.age), 0);

    const result = sum / employeesToUse.length;
    return result.toFixed(0);
  }, [employeesToUse]);

  const salaryAverage = useMemo(() => {
    const sum = employeesToUse.reduce(
      (acc, curr) => acc + Number(curr.salary),
      0
    );

    const result = sum / employeesToUse.length;

    return result.toFixed(1);
  }, [employeesToUse]);

  const evaluationAverage = useMemo(() => {
    const sum = employeesToUse.reduce(
      (acc, curr) => acc + Number(curr.evaluation),
      0
    );

    const result = sum / employeesToUse.length;

    return result.toFixed(1);
  }, [employeesToUse]);

  const pieData = useMemo(() => {
    const map = groupById(employeesToUse, (e) => e.position);

    const data: EmployeePieData[] = [];

    map.forEach((value, key) => {
      data.push({
        name: key,
        value: value.length,
      });
    });

    return data;
  }, [employeesToUse]);

  const valueFormatter = (number: number) =>
    `${number}(${getPercentage(number, totalEmployees).toFixed(0)}%)`;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden pr-2">
      <Script src="https://unpkg.com/xlsx/dist/xlsx.full.min.js" defer />
      <header className="w-full flex items-center justify-between">
        <h2 className="font-serif text-4xl font-bold">Dashboard</h2>

        <button
          className="flex p-2 px-3 rounded-lg cursor-pointer gap-2 items-center hover:bg-green-50 text-green-500"
          onClick={() => generateExcel(employeesToUse, "empleados.xlsx")}
        >
          <span className="text-xs">Exportar</span>
          <span className="text-lg">
            <ArrowDown />
          </span>
        </button>
      </header>

      <div className="py-4 flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="w-32 aspect-video bg-white rounded-lg flex flex-col justify-center items-center p-2">
            <span className="text-2xl font-bold">{totalEmployees}</span>
            <span className="text-xs text-center">Total de empleados</span>
          </div>
          <div className="w-32 aspect-video bg-white rounded-lg flex flex-col justify-center items-center p-2">
            <span className="text-2xl font-bold">{ageAverage}</span>
            <span className="text-xs text-center">Edad promedio</span>
          </div>
          <div className="w-32 aspect-video bg-white rounded-lg flex flex-col justify-center items-center p-2">
            <span className="text-2xl font-bold">{salaryAverage}</span>
            <span className="text-xs text-center">Sueldo promedio</span>
          </div>
          <div className="w-32 aspect-video bg-white rounded-lg flex flex-col justify-center items-center p-2">
            <span className="text-2xl font-bold">{evaluationAverage}</span>
            <span className="text-xs text-center">promedio de evaluación</span>
          </div>
        </div>

        <Card className="max-w-lg">
          <Title>Empleados por posición</Title>
          <DonutChart
            className="mt-6"
            data={pieData}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            colors={["slate", "violet"]}
          />
          <Legend
            className="mt-3"
            categories={["Auxiliar de amamacén", "Conductor"]}
            colors={["slate", "violet"]}
          />
        </Card>

        <Card className="max-w-lg p-0 overflow-hidden">
          <MapView>
            {employeesToUse.map((employee) => (
              <EmployeeMarker
                key={employee.id}
                longitude={employee.longitude}
                latitude={employee.latitude}
                employee={employee}
              />
            ))}

            {branchOffices.map((branchOffice) => (
              <BranchOfficeMarker
                key={branchOffice.id}
                longitude={branchOffice.longitude}
                latitude={branchOffice.latitude}
                branchOffice={branchOffice}
              />
            ))}
          </MapView>
        </Card>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Departamento</Table.HeadCell>
          <Table.HeadCell>Posición</Table.HeadCell>
          <Table.HeadCell>Dirección</Table.HeadCell>
          <Table.HeadCell>Salary</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees.map((employee) => (
            <Table.Row
              key={employee.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.HeadCell className="p-4">
                <Checkbox
                  checked={
                    !!selectedEmployees.find((e) => e.id === employee.id)
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedEmployees([...selectedEmployees, employee]);
                    } else {
                      setSelectedEmployees(
                        selectedEmployees.filter((e) => e.id !== employee.id)
                      );
                    }
                  }}
                />
              </Table.HeadCell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {employee.name}
              </Table.Cell>
              <Table.Cell>{employee.apartment}</Table.Cell>
              <Table.Cell>{employee.position}</Table.Cell>
              <Table.Cell>{employee.direction}</Table.Cell>
              <Table.Cell>{employee.salary}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

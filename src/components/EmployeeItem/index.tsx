import React from "react";
import Avatar from "../Avatar";
import { Employee } from "@/domain/employee/client";

type Props = {
  employee: Employee;
  serviceLabel: string;
  onClick?: () => void;
  selected?: boolean;
};

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default function EmployeeItem(props: Props) {
  const { employee, serviceLabel, onClick, selected } = props;
  return (
    <button
      className={`flex gap-4 items-center w-full p-2 rounded-lg hover:bg-white ${
        selected ? "bg-white" : ""
      }`}
      onClick={onClick}
    >
      <Avatar name={employee.name} size={40} />
      <div className="flex flex-col items-start flex-grow ">
        <span className="text-xs font-bold">{employee.name}</span>
        <span className="text-xs text-gray-400">{serviceLabel}</span>
      </div>

      <time>
        <span className="text-xs text-gray-400">
          Hace {randomNumber(1, 4)} horas{" "}
        </span>
      </time>
    </button>
  );
}

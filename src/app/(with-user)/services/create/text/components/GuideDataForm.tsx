"use client";
import FileItem from "@/components/FileItem";
import CheckboxButton from "@/components/Form/CheckboxButton";
import { Spinner, TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { FormTextGuide } from "../page";
import { useEffect, useState } from "react";
import { useServices } from "@/hooks/service/useService";
import DropZone from "@/components/DropZone";

export default function GuideDataForm() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<FormTextGuide>();

  const { services, isLoading } = useServices();

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    register("services");
    register("attachments");
  }, [register]);

  useEffect(() => {
    setValue("attachments", files);
  }, [files, setValue]);

  const handleDeleteFile = (file: File) => {
    setFiles((prev) => {
      return prev.filter((prevFile) => {
        return prevFile.name !== file.name && prevFile.size !== file.size;
      });
    });
  };

  const handleServiceChange = (serviceId: number) => {
    const services = getValues("services");
    const exist = services.find((s) => s === serviceId);
    const newServices = exist
      ? services.filter((s) => s !== serviceId)
      : [...services, serviceId];

    setValue("services", newServices);
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-bold">Titulo</span>
        <TextInput
          {...register("title", {
            required: "Este campo es requerido",
          })}
          helperText={errors.title?.message}
          color={errors.title ? "danger" : "primary"}
        />
      </label>

      <div className="flex flex-col">
        <span className="text-xs font-bold">Servicios</span>
        <div className="overflow-auto w-full">
          <div className="flex gap-2 my-2 w-max justify-center items-center p-1">
            {isLoading && <Spinner color="purple" size="xl" />}
            {services.map((service) => (
              <CheckboxButton
                className="whitespace-nowrap"
                label={service.name}
                key={service.id}
                onChange={() => handleServiceChange(service.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-bold">Subir Archivos (opcional)</span>
        <div className="flex flex-col gap-2 my-2 w-full overflow-auto p-1 pb-4">
          <DropZone
            onDrop={(files) => {
              setFiles((prev) => [...prev, ...files]);
            }}
            multiple
          />

          {files.map((file, index) => (
            <FileItem
              name={file.name}
              size={file.size}
              type={file.type}
              key={index}
              onDelete={() => {
                handleDeleteFile(file);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { GuideContent } from "@/domain/guide/client";
import GuideContentForm from "./components/GuideContentForm";
import GuideDataForm from "./components/GuideDataForm";

import { FormProvider, useForm } from "react-hook-form";
import { Button, Spinner } from "flowbite-react";
import { createTextGuideApi } from "@/application/guide/client/use-case";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type FormTextGuide = {
  title: string;
  services: number[];
  content: GuideContent[];
  attachments: File[];
};

export default function Text() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<FormTextGuide>({
    defaultValues: {
      services: [],
    },
  });

  const onSubmit = (data: FormTextGuide) => {
    setIsLoading(true);
    createTextGuideApi({
      content: data.content,
      services: data.services,
      title: data.title,
      attachment: data.attachments,
    })
      .then(() => {
        router.push("/home");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full pr-4 grid grid-cols-[1fr_40%] gap-4 relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col gap-4 items-center justify-center">
            <span className="text-white text-2xl">Creando guía...</span>
            <Spinner size="xl" color="purple" />
          </div>
        )}
        <section className="overflow-hidden flex flex-col gap-2">
          <header className="text-center">
            <h2 className="font-serif text-xl font-bold">
              Contenido de la guía
            </h2>
          </header>
          <aside className="h-auto min-h-[90%] flex-grow w-full bg-white rounded-2xl">
            <GuideContentForm />
          </aside>
        </section>

        <section className="overflow-auto">
          <header className="text-center">
            <h2 className="font-serif text-2xl font-bold">Datos de la guía</h2>
          </header>

          <GuideDataForm />
          <div className="sticky bottom-4">
            <Button
              fullSized
              gradientDuoTone="pinkToOrange"
              onClick={methods.handleSubmit(onSubmit)}
            >
              <span className="text-xs">Guardar</span>
            </Button>
          </div>
        </section>
      </div>
    </FormProvider>
  );
}

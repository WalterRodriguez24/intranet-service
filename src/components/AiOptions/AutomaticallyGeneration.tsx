"use client";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Button, Textarea } from "flowbite-react";
import classNames from "classnames";

import AutoFlashIcon from "@/icons/AutoFlash";
import { GuideContent } from "@/domain/guide/client";
import { completionTextService } from "@/hooks/shared/useAiCompletionText";

type Props = {
  onGenerate: (content: GuideContent) => void;
};

export default function AutomaticallyGeneration(props: Props) {
  const { onGenerate } = props;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    if (isLoading) return;
    setOpen(!open);
  };

  const buttonClasses = classNames(
    "w-full p-2 hover:bg-violet-50 hover:text-violet-500 cursor-pointer rounded-lg text-sm flex items-center justify-start gap-2",
    {
      "bg-violet-50 text-violet-500": open,
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);

    const description = formDate.get("description") as string;

    const prompt = `genera un texto para una guia de usuario sobre: ${description.trim()}`;

    setIsLoading(true);
    completionTextService(prompt)
      .then((data) => {
        const { result } = data;
        const generated = {
          id: nanoid(),
          type: "paragraph",
          children: [
            {
              text: result,
            },
          ],
        };
        onGenerate(generated);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button className={buttonClasses} onClick={toggle}>
        <AutoFlashIcon className="text-xl" />
        <span>Generación automatica</span>
      </button>
      {open && (
        <form className="flex flex-col gap-2 mb-2" onSubmit={handleSubmit}>
          <Textarea
            name="description"
            placeholder="Escribe el titulo o una pequeña descripción del contenido que quieres generar"
            rows={4}
            required
            className="text-sm"
            disabled={isLoading}
          />

          <Button
            gradientMonochrome="purple"
            type="submit"
            className="text-sm"
            isProcessing={isLoading}
          >
            {isLoading ? "Generando..." : "Generar"}
          </Button>
        </form>
      )}
    </div>
  );
}

"use client";
import DropZone from "@/components/DropZone";
import ChatBubbleQuestionIcon from "@/icons/ChatBubbleQuestionIcon";
import UploadWindow from "@/icons/UploadWindow";
import { TextInput } from "flowbite-react";
import { useState } from "react";

export default function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <div className="w-full h-full flex  justify-center">
      <div className="bg-white w-1/2 p-4 rounded-2xl overflow-auto">
        <div className="">
          <header className="mb-4">
            <h2 className="text-base font-bold">Subir video</h2>
            <h3 className="text-xs text-gray-400">
              Sube un video de tu guia para los empleados
            </h3>
          </header>
          <label className="flex flex-col gap-1 mb-2">
            <span className="text-xs font-bold">Titulo</span>
            <TextInput name="title" />
          </label>

          <DropZone
            accept="video/*"
            onDrop={(files) => {
              setVideoFile(files[0]);
            }}
          />
        </div>
        <div className="w-full flex items-center justify-center relative">
          <span className="text-center p-2 text-sm font-bold bg-white relative z-10">
            OR
          </span>
          <span className="absolute w-full bg-slate-300 h-[1px] top-1/2 left-0 translate-y-1/2"></span>
        </div>
        <form className="flex items-end gap-2">
          <div className="flex flex-col gap-2 flex-grow">
            <h4 className="text-sm font-bold">Subir desde una URL</h4>
            <TextInput
              placeholder="www.youtube.com/"
              type="url"
              addon="https://"
            />
          </div>

          <button className="h-[42px] px-4 rounded-lg text-xl text-gray-400 bg-gray-100 ring-1 ring-gray-300">
            <UploadWindow />
          </button>
        </form>

        <footer className="w-full flex items-center justify-between my-4">
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-xl">
              <ChatBubbleQuestionIcon />
            </span>
            <span className="text-sm">Soporte</span>
          </div>

          <button className="px-5 py-3 text-xs rounded-lg bg-orange-500 text-white">
            Guardar
          </button>
        </footer>
      </div>
    </div>
  );
}

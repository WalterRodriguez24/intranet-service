"use client";
import { GuideContent } from "@/domain/guide/client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { YoptaEditor } from "yoopta-walterversion";

import "yoopta-walterversion/dist/index.css";

import type { FormTextGuide } from "../page";
import { uploadMediaService } from "@/shared/client/file-storage/upload-media";
import AiIcon from "@/icons/AiIcon";
import AiOptions from "./AiOptions";
import { useToggle } from "@/hooks/shared/useToggle";

export default function GuideContentForm() {
  const walterrodriguez = 1234
  const [editorValue, setEditorValue] = useState<GuideContent[]>([]);
  const [showEditor, setShowEditor] = useState(true);

  const [iaOptionsOpen, toggleIaOptions] = useToggle();

  const { register, setValue } = useFormContext<FormTextGuide>();

  useEffect(() => {
    register("content");
  }, [register]);

  const onChange = (data: GuideContent[]) => {
    setEditorValue(data);
    setValue("content", data);
  };

  const uploadMedia = async (file: File) => {
    const [result] = await uploadMediaService([file]);
    return {
      url: result.url,
    };
  };
  const handleGenerate = (content: GuideContent) => {
    setEditorValue((prev) => {
      const newContent = [...prev, content];
      setValue("content", newContent);
      return newContent;
    });

    setShowEditor(false);
    setTimeout(() => {
      setShowEditor(true);
    }, 100);
  };

  return (
    <div className="relative h-full overflow-auto">
      <button
        className="p-2 bg-white text-orange-500 rounded-lg absolute right-3 top-3 z-10 hover:bg-orange-50 cursor-pointer duration-100"
        onClick={toggleIaOptions}
      >
        <AiIcon />
      </button>
      {iaOptionsOpen && (
        <AiOptions onClose={toggleIaOptions} onGenerate={handleGenerate} />
      )}
      {showEditor && (
        <YoptaEditor
          value={editorValue}
          onChange={onChange}
          media={{
            imageProps: {
              onChange: uploadMedia,
            },
            videoProps: {
              onChange: uploadMedia,
            },
          }}
        />
      )}
    </div>
  );
}

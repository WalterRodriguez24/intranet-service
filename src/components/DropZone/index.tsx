import { ChangeEvent, DragEvent, useRef } from "react";

type DropZoneProps = {
  onDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
};

export default function DropZone({ onDrop, accept, multiple }: DropZoneProps) {
  const dropZoneRef = useRef<HTMLLabelElement>(null);

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (!dropZoneRef.current) return;
    const files = Array.from(event.dataTransfer.files);

    onDrop && onDrop(files);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    onDrop && onDrop(files);
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (!dropZoneRef.current) return;
    event.dataTransfer.dropEffect = "move";
    dropZoneRef.current.classList.add("bg-neutral-300");
  };
  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (!dropZoneRef.current) return;
    dropZoneRef.current.classList.remove("bg-neutral-300");
  };

  return (
    <label
      className="w-full aspect-video rounded-2xl border border-spacing-4 border-dashed border-gray-200 relative flex items-center justify-center cursor-pointer"
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      ref={dropZoneRef}
    >
      <div className="flex flex-col gap-2 items-center">
        <picture className="w-20 aspect-square rounded-full overflow-hidden flex bg-orange-50">
          <img src="" alt="" />
        </picture>

        <strong className="text-xs">Arrastra y suelta un archivo</strong>
        <span className="text-xs"> o haz click para seleccionar uno</span>
      </div>
      <input
        type="file"
        hidden
        multiple={multiple}
        onChange={handleChange}
        accept={accept}
      />
    </label>
  );
}

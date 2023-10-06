import ArrowDown from "@/icons/ArrowDown";
import AudioIcon from "@/icons/AudioIcon";
import CancelIcon from "@/icons/CancelIcon";
import DocumentIcon from "@/icons/DocumentIcon";
import ImageIcon from "@/icons/ImageIcon";
import RefreshIcon from "@/icons/RefreshIcon";
import TrashIcon from "@/icons/TrashIcon";
import VideoIcon from "@/icons/VideoIcon";
import React from "react";

type Props = {
  name: string;
  size: number;
  type: string;
  onDelete?: () => void;
  onRefresh?: () => void;
  onCancel?: () => void;
  downloadUrl?: string;
};

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getFileIcon(fileType: string) {
  if (fileType.includes("image")) return <ImageIcon />;
  if (fileType.includes("video")) return <VideoIcon />;
  if (fileType.includes("audio")) return <AudioIcon />;

  return <DocumentIcon />;
}

export default function FileItem(props: Props) {
  const { onCancel, onDelete, onRefresh, downloadUrl, name, size, type } =
    props;

  const sizeFormatted = formatBytes(size);

  const fileIcon = getFileIcon(type);

  return (
    <div className="flex gap-3 items-center rounded-lg bg-white p-2 px-2.5">
      <span className="min-w-[2rem] text-2xl aspect-square flex items-center justify-center bg-neutral-100 rounded-lg">
        {fileIcon}
      </span>

      <div className="flex-grow text-xs flex flex-col overflow-hidden w-full">
        <span className="font-bold w-full text-ellipsis whitespace-nowrap overflow-hidden">
          {name}
        </span>
        <span className="text-gray-400">{sizeFormatted}</span>
      </div>

      <div className="flex gap-1">
        {onRefresh && (
          <button
            className="flex p-2 rounded-lg hover:bg-blue-50 text-blue-700"
            onClick={onRefresh}
          >
            <RefreshIcon />
          </button>
        )}
        {onCancel && (
          <button
            className="flex p-2 rounded-lg hover:bg-orange-50 text-orange-500"
            onClick={onCancel}
          >
            <CancelIcon />
          </button>
        )}
        {onDelete && (
          <button
            className="flex p-2 rounded-lg hover:bg-red-50 text-red-500"
            onClick={onDelete}
          >
            <TrashIcon />
          </button>
        )}

        {downloadUrl && (
          <a
            className="flex p-2 rounded-lg hover:bg-green-50 text-green-500"
            href={downloadUrl}
            download
            target="_blank"
            rel="noreferrer"
          >
            <ArrowDown />
          </a>
        )}
      </div>
    </div>
  );
}

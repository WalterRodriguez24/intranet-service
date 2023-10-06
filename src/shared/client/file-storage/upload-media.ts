type FileResponse = {
  url: string;
  id: string;
};

export async function uploadMediaService(
  files: File[]
): Promise<FileResponse[]> {
  const formData = new FormData();

  files.forEach((file) => {
    if (!file.type.includes("video") && !file.type.includes("image")) {
      throw new Error("Invalid file type");
    }
    formData.append("files", file);
  });

  const res = await fetch("/api/upload-media", {
    method: "POST",
    body: formData,
  });

  const response = await res.json();

  return response;
}

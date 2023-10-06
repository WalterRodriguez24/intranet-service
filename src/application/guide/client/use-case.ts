import { GuideRequest } from "@/domain/guide/client";

export async function createTextGuideApi(params: GuideRequest) {
  const formData = new FormData();

  formData.append("title", params.title);
  formData.append("content", JSON.stringify(params.content));
  params.services.forEach((service) =>
    formData.append("services", String(service))
  );

  params.attachment.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch("/api/guide/text", {
    method: "POST",
    body: formData,
  });

  await res.json();
}

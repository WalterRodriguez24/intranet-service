import { getGuideById } from "@/application/guide/server/use-case";
import ContentRenderer from "./components/ContentRenderer";
import Avatar from "@/components/Avatar";
import { notFound } from "next/navigation";
import MessageIcon from "@/icons/MessageIcon";
import FileItem from "@/components/FileItem";
import { getPublicUrl } from "@/shared/server/file-storage";

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

export default async function Guide({ params }: Props) {
  const guide = await getGuideById(Number(params.id));

  if (!guide) {
    notFound();
  }

  return (
    <div className="w-full h-full pr-4 grid grid-cols-[1fr_35%] gap-4">
      <section className="overflow-auto min-h-full p-2 lg:p-4 w-full bg-white relative rounded-2xl">
        {guide.content && (
          <ContentRenderer title={guide.title} data={guide.content} />
        )}
        {guide.source_video && (
          <div className="w-full aspect-video">
            <video
              controls
              className="w-full h-full rounded-xl overflow-hidden shadow-pale"
            >
              <source
                src="https://res.cloudinary.com/universidad-autonoma-del-peru/video/upload/v1685905376/backoffice-guide-dev/6467e4b7bc2bd_k7aznr.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </section>

      <section className="overflow-auto">
        <header className="text-center mb-4">
          <h2 className="font-serif text-2xl font-bold">Datos de la guía</h2>
        </header>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">{guide.title}</h3>
          <div className="flex gap-2 items-center">
            <Avatar name="John Doe" size={40} />
            <div className="flex flex-col items-start flex-grow ">
              <span className="text-xs font-semibold">
                {guide.user.first_name + " " + guide.user.last_name}
              </span>
              <span className="text-xs text-gray-400">
                {guide.user.job_title.name}
              </span>
            </div>

            <button className="p-2 flex items-center justify-center rounded-xl hover:bg-orange-50 text-orange-500">
              <MessageIcon />
            </button>
          </div>

          {guide.attachment.length > 0 && (
            <div className="flex flex-col gap-2">
              <header className="text-sm font-bold">Archivos adjuntos</header>
              <div className="flex flex-col gap-2">
                {guide.attachment.map((file) => (
                  <FileItem
                    key={file.id}
                    name={file.name}
                    size={file.size}
                    type={file.type}
                    downloadUrl={getPublicUrl(file.path)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { getGuidesServiceId } from "@/application/guide/server/use-case";
import GuideCard from "@/components/GuideCard";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

export default async function Page({ params }: Props) {
  const guides = await getGuidesServiceId(Number(params.id));

  return (
    <div className="pr-2 h-full">
      <header className="flex justify-between items-center py-1">
        <h2 className="font-serif text-4xl font-bold">Guias de usuario</h2>
        <Link
          href="/services/create/text"
          className="px-4 py-1 rounded-full ring-1 ring-orange-500"
        >
          <span className="text-xs text-orange-500">Crear guia</span>
        </Link>
      </header>

      {guides.length === 0 && (
        <div className="flex h-full justify-center items-center flex-col gap-4">
          <h3 className="font-serif text-2xl font-bold">
            No hay guias de usuario
          </h3>
          <Link
            href="/services/create/text"
            className="px-8 py-2 rounded-full ring-1 ring-orange-500"
          >
            <span className="text-sm  text-orange-500">Crear guia</span>
          </Link>
        </div>
      )}

      {guides.length > 0 && (
        <div className="grid grid-cols-3 gap-4 my-4">
          {guides.map((guide) => (
            <GuideCard
              key={guide.id}
              id={guide.id}
              services={guide.service_guide.map(({ service }) => service.name)}
              title={guide.title}
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
          ))}
        </div>
      )}
    </div>
  );
}

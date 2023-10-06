import { getGuideList } from "@/application/guide/server/use-case";
import GuideCard from "@/components/GuideCard";

export const revalidate = 0;

export default async function Home() {
  const lastGuides = await getGuideList();
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <h2 className="font-serif text-4xl font-bold">Guias de usuario</h2>

      {lastGuides.length === 0 && (
        <div className="flex h-full justify-center items-center">
          <h3 className="font-serif text-2xl font-bold">
            No hay guias de usuario
          </h3>
        </div>
      )}

      {lastGuides.length > 0 && (
        <div className="grid grid-cols-3 gap-4 my-4">
          {lastGuides.map((guide) => (
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

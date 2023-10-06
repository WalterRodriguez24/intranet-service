import { ReactNode } from "react";
import TextInput from "@/components/Form/TextInput";
import HomeSidebar from "@/components/HomeSidebar";
import SearchIcon from "@/icons/SearchIcon";
import BellIcon from "@/icons/BellIcon";
import { listServices } from "@/application/service/server/use-case";
import BackButton from "@/components/BackButton";
import ProfileHeaderButton from "@/components/ProfileHeaderButton";

type Props = {
  children: ReactNode;
};

export const revalidate = 0;

export default async function HomeLayout({ children }: Props) {
  const services = await listServices();

  return (
    <div className="flex bg-neutral-100 gap-4">
      <HomeSidebar services={services} />
      <div className="w-full h-screen flex flex-col gap-2 pr-4">
        <nav className="flex justify-between items-center w-full h-[var(--header-height)]">
          <div className="flex items-center gap-2">
            <BackButton />
            {/* <div className="max-w-[400px] w-full">
              <TextInput
                className=""
                icon={<SearchIcon />}
                placeholder="Buscar una guía"
                labelClass="bg-white shadow-pale rounded-full"
              />
            </div> */}
          </div>

          <div className="flex gap-4 items-center">
            <button className="flex items-center rounded-2xl justify-center p-3 bg-white">
              <BellIcon height={20} width={20} />
            </button>

            <ProfileHeaderButton />
          </div>
        </nav>

        <div className="h-[var(--main-content-height)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

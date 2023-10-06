import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export default function Card(props: Props) {
  const { title, description, image, href } = props;

  return (
    <Link
      href={href}
      className="rounded-xl bg-white flex flex-col overflow-hidden"
    >
      <picture className="flex w-full aspect-video relative">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </picture>
      <div className="flex flex-col items-start p-4 pb-8">
        <h4 className="text-base font-bold">{title}</h4>
        <p className="text-sm font-light text-left text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

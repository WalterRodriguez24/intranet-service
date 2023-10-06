import Avatar from "../Avatar";

type Props = {
  message: string;
  avatar?: string;
  self?: boolean;
};

const regex = /{{contexto: (.*)\.(.*)}}/g;

export default function Message({ self, avatar, message }: Props) {
  const messageClass = `w-full flex gap-2 p-2 items-start ${
    self ? "flex-row-reverse" : "flex-row bg-neutral-50"
  }`;

  const messageWithOutContext = message.replace(regex, "");

  return (
    <div className={messageClass}>
      <picture className="min-w-[2rem] min-h-[2rem] w-8 h-8">
        {avatar ? (
          <img
            className="w-full h-full rounded-full object-cover"
            src={avatar}
            alt=""
          />
        ) : (
          <Avatar name="Admin" size={32} />
        )}
      </picture>
      <div className="flex items-center h-full">
        <p className="text-xs font-light whitespace-pre-wrap">
          {messageWithOutContext}
        </p>
      </div>
    </div>
  );
}

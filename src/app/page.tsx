"use client";
import { TextInput } from "flowbite-react";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EMPLOYEES } from "./(with-user)/employee/data";

export default function Login() {
  const router = useRouter();
  const { data } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const employeesItem = localStorage.getItem("EMPLOYEES");

    const employees = employeesItem ? JSON.parse(employeesItem ?? "") : [];

    if (employees.length === 0) {
      localStorage.setItem("EMPLOYEES", JSON.stringify(EMPLOYEES));
    }
  }, []);

  const handleError = () => {
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    setLoading(true);
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: false,
    })
      .then((result) => {
        console.log({ result });
        if (result?.error) {
          handleError();
        }
        if (result?.ok) {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log({ error });
        handleError();
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-screen h-screen grid grid-cols-3 overflow-hidden">
      <div className="w-full h-full col-span-2">
        <picture className="h-full w-full flex items-center relative justify-center">
          <img
            className="w-full h-full object-cover absolute top-0 left-0"
            src="/images/login_img.webp"
            alt=""
          />
        </picture>
      </div>

      <div className="container mx-auto flex items-center flex-col h-screen px-4 gap-4">
        <header className="flex flex-col justify-start gap-2 my-12">
          <header>
            <h1 className="text-4xl font-bold text-start">
              Bienvenido a <span className="text-indigo-500">JCU</span> Intranet
            </h1>
          </header>
          <p className="text-sm text-slate-500">
            Aca podrás encontrar toda la información que necesitas para tu día a
            día
          </p>
        </header>
        <form className=" w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold text-center">Iniciar sesión</h3>
          <TextInput
            defaultValue="admin@gmail.com"
            name="email"
            placeholder="example@mail.com"
            type="email"
          />
          <TextInput
            defaultValue="admin123"
            name="password"
            placeholder="Contraseña"
            type="password"
          />
          <button
            type="submit"
            className="py-2 w-full bg-indigo-100 ring-1 ring-indigo-400 text-indigo-500 text-center rounded-lg"
          >
            Login
          </button>
        </form>
        <footer className="w-full mt-8">
          <p className="text-sm text-slate-500">
            Si tienes algún problemas contacta con el{" "}
            <a href="#" className="text-indigo-500 underline">
              administrador.
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

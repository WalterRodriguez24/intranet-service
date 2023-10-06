import Card from "./components/Card";

export default function CreateService() {
  return (
    <div className="h-full w-full mt-4 flex flex-col gap-8">
      <header className="w-full flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-center">
          Crea una guía para los empleados
        </h2>
        <h3 className="text-sm font-light text-center text-gray-500">
          Las guías de usuario son documentos que ayudan a los empleados a
          entender como funciona la empresa
        </h3>
      </header>

      <div className="grid grid-cols-2 gap-8 w-10/12 mx-auto">
        <Card
          title="Video tutorial"
          description="Video-Guías para empleados: Impulsa el conocimiento y la eficiencia en el proceso X. Capacita a tus empleados con información clave para lograr resultados excepcionales. ¡Empodéralos con guías en video!"
          image="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          href="/services/create/text/video"
        />
        <Card
          title="Texto guia"
          description="Crea guías para los empleados y brindando el conocimiento necesario para ejecutar X proceso de manera eficiente. ¡Empodera a tus empleados con información clave!"
          image="https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          href="/services/create/text/text"
        />
      </div>
    </div>
  );
}

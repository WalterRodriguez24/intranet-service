-- Set user roles
INSERT INTO "user_role" (
    name,
    description
) VALUES (
    'ADMIN',
    'Admininstrator'
), (
  'EMPLOYEE',
  'Empleado'
);

-- Set job titles
INSERT INTO "job_title" (name, description) VALUES ('ADMIN', 'Administrador del sistema'), ('EMPLOYEE', 'Empleado de la empresa');

-- Set users
INSERT INTO "service" (name, description) 
VALUES (
  'Transporte de carga',
  'Transporte de carga'
), (
  'Mensajería',
  'Mensajería'
), (
  'Documentos valorados',
  'Documentos valorados'
), (
  'Servicios especiales',
  'Servicios especiales'
), (
  'Servicio Inhouse',
  'Servicio Inhouse'
), (
  'Servicio aéreo',
  'Servicio aéreo'
);


-- set admin user

insert into backoffice.user (first_name, last_name, email, username, password, role_id, job_title_id, created_at,
                             updated_at)
values ('admin', 'admin', 'admin@gmail.com', 'admin', 'admin123', 1, 1, now(), now());

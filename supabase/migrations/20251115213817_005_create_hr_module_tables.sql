/*
  # Human Resources Module Tables
  
  1. New Tables
    - Competencies (EmpleadoCompetencia)
    - Certifications (EmpleadoCertificacion)
    - Roles (Rol)
    - Employees (Empleado)
    - Shift Employees (TurnoEmpleado)
  
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage HR data
*/

-- Competencies Table
CREATE TABLE IF NOT EXISTS empleado_competencia (
  id_competencia UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competencia_nombre VARCHAR(120) NOT NULL,
  competencia_nivel INT NOT NULL DEFAULT 1,
  competencia_descrip TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS empleado_certificacion (
  id_certificacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certif_nombre VARCHAR(120) NOT NULL,
  certif_entidad_emisora VARCHAR(120) NOT NULL,
  certif_descripcion TEXT,
  certif_duracion INT NOT NULL DEFAULT 12,
  certif_fecha_emision DATE,
  certif_fecha_vencimiento DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Roles Table
CREATE TABLE IF NOT EXISTS rol (
  id_rol UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rol_nombre VARCHAR(80) NOT NULL,
  rol_nivel INT NOT NULL DEFAULT 1,
  rol_descripcion TEXT,
  rol_activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Employees Table
CREATE TABLE IF NOT EXISTS empleado (
  id_empleado UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empl_primer_nombre VARCHAR(64) NOT NULL,
  empl_apellido_paterno VARCHAR(64) NOT NULL,
  empl_apellido_materno VARCHAR(64) NOT NULL,
  empl_dni VARCHAR(20) NOT NULL UNIQUE,
  empl_disponibilidad BOOLEAN NOT NULL DEFAULT true,
  empl_telefono VARCHAR(20),
  empl_correo VARCHAR(120),
  id_competencia UUID,
  id_certificacion UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_competencia) REFERENCES empleado_competencia(id_competencia) ON DELETE SET NULL,
  FOREIGN KEY (id_certificacion) REFERENCES empleado_certificacion(id_certificacion) ON DELETE SET NULL
);

-- Shift Employees Table
CREATE TABLE IF NOT EXISTS turno_empleado (
  id_turno_empl UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  te_estado VARCHAR(20) NOT NULL DEFAULT 'asignado',
  te_observaciones TEXT,
  id_turno UUID NOT NULL,
  id_empleado UUID NOT NULL,
  id_rol UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_turno) REFERENCES turno(id_turno) ON DELETE CASCADE,
  FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado) ON DELETE CASCADE,
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE empleado_competencia ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleado_certificacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE rol ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleado ENABLE ROW LEVEL SECURITY;
ALTER TABLE turno_empleado ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated to view empleado_competencia"
  ON empleado_competencia FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage empleado_competencia"
  ON empleado_competencia FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update empleado_competencia"
  ON empleado_competencia FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete empleado_competencia"
  ON empleado_competencia FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view empleado_certificacion"
  ON empleado_certificacion FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage empleado_certificacion"
  ON empleado_certificacion FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update empleado_certificacion"
  ON empleado_certificacion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete empleado_certificacion"
  ON empleado_certificacion FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view rol"
  ON rol FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage rol"
  ON rol FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update rol"
  ON rol FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete rol"
  ON rol FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view empleado"
  ON empleado FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage empleado"
  ON empleado FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update empleado"
  ON empleado FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete empleado"
  ON empleado FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view turno_empleado"
  ON turno_empleado FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage turno_empleado"
  ON turno_empleado FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update turno_empleado"
  ON turno_empleado FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete turno_empleado"
  ON turno_empleado FOR DELETE TO authenticated USING (true);
/*
  # Production Module Tables
  
  1. New Tables
    - Shifts (Turno)
    - Production Orders (OrdenProduccion)
    - Incidents (Incidencia)
  
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage production data
*/

-- Shifts Table
CREATE TABLE IF NOT EXISTS turno (
  id_turno UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  turno_fecha DATE NOT NULL,
  turno_hora_inicio TIME NOT NULL,
  turno_hora_fin TIME NOT NULL,
  turno_tipo_evento VARCHAR(50) NOT NULL DEFAULT 'produccion',
  turno_estado VARCHAR(20) NOT NULL DEFAULT 'planificado',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Production Orders Table
CREATE TABLE IF NOT EXISTS orden_produccion (
  id_orden_prod UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  op_fecha_prod DATE NOT NULL,
  op_fecha_limite DATE NOT NULL,
  op_cant_programada DECIMAL(12,2) NOT NULL,
  op_cant_producida DECIMAL(12,2) NOT NULL DEFAULT 0,
  op_estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  id_producto UUID NOT NULL,
  id_pedido UUID NOT NULL,
  id_turno UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
  FOREIGN KEY (id_turno) REFERENCES turno(id_turno) ON DELETE CASCADE
);

-- Incidents Table
CREATE TABLE IF NOT EXISTS incidencia (
  id_incidencia UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incidencia_estado VARCHAR(20) NOT NULL DEFAULT 'abierta',
  incidencia_tipo VARCHAR(50) NOT NULL,
  incidencia_descripcion TEXT NOT NULL,
  incidencia_fecha_hora TIMESTAMPTZ NOT NULL DEFAULT now(),
  id_orden_prod UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_orden_prod) REFERENCES orden_produccion(id_orden_prod) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE turno ENABLE ROW LEVEL SECURITY;
ALTER TABLE orden_produccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidencia ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated to view turno"
  ON turno FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage turno"
  ON turno FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update turno"
  ON turno FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete turno"
  ON turno FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view orden_produccion"
  ON orden_produccion FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage orden_produccion"
  ON orden_produccion FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update orden_produccion"
  ON orden_produccion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete orden_produccion"
  ON orden_produccion FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view incidencia"
  ON incidencia FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage incidencia"
  ON incidencia FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update incidencia"
  ON incidencia FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete incidencia"
  ON incidencia FOR DELETE TO authenticated USING (true);
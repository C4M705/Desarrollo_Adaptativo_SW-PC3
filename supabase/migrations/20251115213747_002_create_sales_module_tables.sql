/*
  # Sales B2B Module Tables
  
  1. New Tables
    - Representatives (Representante)
    - Clients (Cliente)
    - Promotions (Promocion)
    - Assigned Promotions (PromocionAsignada)
    - Quotes (Cotizacion)
    - Orders (Pedido)
    - Payments (Pago)
  
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage sales data
*/

-- Representatives Table
CREATE TABLE IF NOT EXISTS representante (
  id_representante UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rep_primer_nombre VARCHAR(64) NOT NULL,
  rep_apellido_paterno VARCHAR(64) NOT NULL,
  rep_apellido_materno VARCHAR(64) NOT NULL,
  id_contacto UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_contacto) REFERENCES contacto(id_contacto) ON DELETE CASCADE
);

-- Clients Table
CREATE TABLE IF NOT EXISTS cliente (
  id_cliente UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_ruc VARCHAR(20) NOT NULL UNIQUE,
  cliente_razon_social VARCHAR(120) NOT NULL,
  id_ubicacion UUID NOT NULL,
  id_representante UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_ubicacion) REFERENCES ubicacion(id_ubicacion) ON DELETE CASCADE,
  FOREIGN KEY (id_representante) REFERENCES representante(id_representante) ON DELETE CASCADE
);

-- Promotions Table
CREATE TABLE IF NOT EXISTS promocion (
  id_promocion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promocion_tipo_desc VARCHAR(120) NOT NULL,
  promocion_monto_porc DECIMAL(10,2) NOT NULL,
  promocion_fecha_inicio DATE NOT NULL,
  promocion_fecha_fin DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Assigned Promotions Table
CREATE TABLE IF NOT EXISTS promocion_asignada (
  id_promocion_asig UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pa_puntos_acumulados INT NOT NULL DEFAULT 0,
  pa_nivel_fidelidad VARCHAR(50) NOT NULL DEFAULT 'bronce',
  id_promocion UUID NOT NULL,
  id_contacto UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_promocion) REFERENCES promocion(id_promocion) ON DELETE CASCADE,
  FOREIGN KEY (id_contacto) REFERENCES contacto(id_contacto) ON DELETE CASCADE
);

-- Quotes Table
CREATE TABLE IF NOT EXISTS cotizacion (
  id_cotizacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cot_total_estimado DECIMAL(12,2) NOT NULL,
  cot_vigencia INT NOT NULL,
  cot_estado VARCHAR(20) NOT NULL DEFAULT 'borrador',
  id_cliente UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS pedido (
  id_pedido UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_fecha_pedido TIMESTAMPTZ NOT NULL DEFAULT now(),
  pedido_monto_total DECIMAL(12,2) NOT NULL,
  id_forma_pago UUID NOT NULL,
  id_estado UUID NOT NULL,
  id_cliente UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_forma_pago) REFERENCES forma_pago(id_forma_pago) ON DELETE CASCADE,
  FOREIGN KEY (id_estado) REFERENCES estado_pedido(id_estado) ON DELETE CASCADE,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

-- Payments Table
CREATE TABLE IF NOT EXISTS pago (
  id_numero_cuota UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pago_fecha_pago TIMESTAMPTZ NOT NULL DEFAULT now(),
  pago_monto DECIMAL(12,2) NOT NULL,
  numero_cuota INT NOT NULL,
  id_pedido UUID NOT NULL,
  id_medio_pago UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
  FOREIGN KEY (id_medio_pago) REFERENCES medio_pago(id_medio_pago) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE representante ENABLE ROW LEVEL SECURITY;
ALTER TABLE cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE promocion ENABLE ROW LEVEL SECURITY;
ALTER TABLE promocion_asignada ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotizacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE pago ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated to view representante"
  ON representante FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage representante"
  ON representante FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update representante"
  ON representante FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete representante"
  ON representante FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view cliente"
  ON cliente FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage cliente"
  ON cliente FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update cliente"
  ON cliente FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete cliente"
  ON cliente FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view promocion"
  ON promocion FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage promocion"
  ON promocion FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update promocion"
  ON promocion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete promocion"
  ON promocion FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view promocion_asignada"
  ON promocion_asignada FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage promocion_asignada"
  ON promocion_asignada FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update promocion_asignada"
  ON promocion_asignada FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete promocion_asignada"
  ON promocion_asignada FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view cotizacion"
  ON cotizacion FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage cotizacion"
  ON cotizacion FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update cotizacion"
  ON cotizacion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete cotizacion"
  ON cotizacion FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view pedido"
  ON pedido FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage pedido"
  ON pedido FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update pedido"
  ON pedido FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete pedido"
  ON pedido FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view pago"
  ON pago FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage pago"
  ON pago FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update pago"
  ON pago FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete pago"
  ON pago FOR DELETE TO authenticated USING (true);
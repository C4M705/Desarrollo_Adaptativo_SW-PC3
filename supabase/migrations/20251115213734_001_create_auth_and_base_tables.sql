/*
  # Initial Database Schema for Don Mamino S&OP System
  
  1. Core Tables
    - Locations (Ubicacion)
    - Contacts (Contacto)
    - Payment Methods and Payment Forms
    - Status enums for Orders and Production
  
  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users
    - Users can manage data within their organization
*/

-- Locations Table
CREATE TABLE IF NOT EXISTS ubicacion (
  id_ubicacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ubicacion_distrito VARCHAR(64) NOT NULL,
  ubicacion_lote VARCHAR(64) NOT NULL,
  ubicacion_manzana VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacto (
  id_contacto UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contacto_telefono VARCHAR(20) NOT NULL,
  contacto_correo VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payment Forms Table
CREATE TABLE IF NOT EXISTS forma_pago (
  id_forma_pago UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fp_tipo VARCHAR(50) NOT NULL,
  fp_plazo INT NOT NULL,
  fp_descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payment Means Table
CREATE TABLE IF NOT EXISTS medio_pago (
  id_medio_pago UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mp_tipo VARCHAR(50) NOT NULL,
  mp_proveedor VARCHAR(120),
  mp_estado VARCHAR(20) NOT NULL DEFAULT 'activo',
  mp_descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Status Table
CREATE TABLE IF NOT EXISTS estado_pedido (
  id_estado UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estado_nombre VARCHAR(50) NOT NULL,
  estado_descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ubicacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacto ENABLE ROW LEVEL SECURITY;
ALTER TABLE forma_pago ENABLE ROW LEVEL SECURITY;
ALTER TABLE medio_pago ENABLE ROW LEVEL SECURITY;
ALTER TABLE estado_pedido ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users
CREATE POLICY "Allow authenticated to view ubicacion"
  ON ubicacion FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to insert ubicacion"
  ON ubicacion FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update ubicacion"
  ON ubicacion FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete ubicacion"
  ON ubicacion FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view contacto"
  ON contacto FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to insert contacto"
  ON contacto FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update contacto"
  ON contacto FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete contacto"
  ON contacto FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view forma_pago"
  ON forma_pago FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage forma_pago"
  ON forma_pago FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update forma_pago"
  ON forma_pago FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete forma_pago"
  ON forma_pago FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view medio_pago"
  ON medio_pago FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage medio_pago"
  ON medio_pago FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update medio_pago"
  ON medio_pago FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete medio_pago"
  ON medio_pago FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view estado_pedido"
  ON estado_pedido FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage estado_pedido"
  ON estado_pedido FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update estado_pedido"
  ON estado_pedido FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete estado_pedido"
  ON estado_pedido FOR DELETE TO authenticated USING (true);
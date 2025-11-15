/*
  # Operations Module Tables
  
  1. New Tables
    - Product Categories (CategoriaProducto)
    - Products (Producto)
    - Inventory (Inventario)
    - Suppliers (Proveedor)
    - Ingredients (Insumo)
    - Product Recipes (RecetaProducto)
  
  2. Security
    - Enable RLS on all tables
    - Authenticated users can manage operations data
*/

-- Product Categories Table
CREATE TABLE IF NOT EXISTS categoria_producto (
  id_cat_producto UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cp_nombre VARCHAR(120) NOT NULL,
  cp_descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS producto (
  id_producto UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prod_nombre VARCHAR(120) NOT NULL,
  prod_precio_base DECIMAL(12,2) NOT NULL,
  prod_unidad_medida VARCHAR(20) NOT NULL DEFAULT 'kg',
  id_cat_producto UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_cat_producto) REFERENCES categoria_producto(id_cat_producto) ON DELETE CASCADE
);

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventario (
  id_inventario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inv_stock_actual DECIMAL(12,2) NOT NULL DEFAULT 0,
  inv_stock_seguridad DECIMAL(12,2) NOT NULL DEFAULT 0,
  inv_tiem_prod_estim INT NOT NULL DEFAULT 0,
  inv_fecha_ult_act TIMESTAMPTZ DEFAULT now(),
  id_producto UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
  UNIQUE(id_producto)
);

-- Suppliers Table
CREATE TABLE IF NOT EXISTS proveedor (
  id_proveedor UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proveedor_nombre VARCHAR(120) NOT NULL,
  proveedor_ruc VARCHAR(20) NOT NULL UNIQUE,
  proveedor_contacto VARCHAR(20),
  proveedor_correo VARCHAR(120),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ingredients Table
CREATE TABLE IF NOT EXISTS insumo (
  id_insumo UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insumo_unidad_medida VARCHAR(20) NOT NULL,
  insumo_nombre VARCHAR(120) NOT NULL,
  id_proveedor UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor) ON DELETE CASCADE
);

-- Product Recipes Table
CREATE TABLE IF NOT EXISTS receta_producto (
  id_receta UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receta_cantidad_est DECIMAL(12,2) NOT NULL,
  id_producto UUID NOT NULL,
  id_insumo UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE,
  FOREIGN KEY (id_insumo) REFERENCES insumo(id_insumo) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE categoria_producto ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveedor ENABLE ROW LEVEL SECURITY;
ALTER TABLE insumo ENABLE ROW LEVEL SECURITY;
ALTER TABLE receta_producto ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated to view categoria_producto"
  ON categoria_producto FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage categoria_producto"
  ON categoria_producto FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update categoria_producto"
  ON categoria_producto FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete categoria_producto"
  ON categoria_producto FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view producto"
  ON producto FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage producto"
  ON producto FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update producto"
  ON producto FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete producto"
  ON producto FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view inventario"
  ON inventario FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage inventario"
  ON inventario FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update inventario"
  ON inventario FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete inventario"
  ON inventario FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view proveedor"
  ON proveedor FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage proveedor"
  ON proveedor FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update proveedor"
  ON proveedor FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete proveedor"
  ON proveedor FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view insumo"
  ON insumo FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage insumo"
  ON insumo FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update insumo"
  ON insumo FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete insumo"
  ON insumo FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated to view receta_producto"
  ON receta_producto FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated to manage receta_producto"
  ON receta_producto FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated to update receta_producto"
  ON receta_producto FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete receta_producto"
  ON receta_producto FOR DELETE TO authenticated USING (true);
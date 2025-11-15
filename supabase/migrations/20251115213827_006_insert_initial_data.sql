/*
  # Insert Initial Data for Don Mamino S&OP System
  
  This migration populates the database with sample data for all modules:
  - Payment forms and means
  - Order statuses
  - Product categories
  - Roles
  - Competencies
*/

-- Insert Payment Forms
INSERT INTO forma_pago (fp_tipo, fp_plazo, fp_descripcion) VALUES
('Contado', 0, 'Pago inmediato'),
('Crédito 15 días', 15, 'Crédito a 15 días'),
('Crédito 30 días', 30, 'Crédito a 30 días'),
('Crédito 60 días', 60, 'Crédito a 60 días')
ON CONFLICT DO NOTHING;

-- Insert Payment Means
INSERT INTO medio_pago (mp_tipo, mp_proveedor, mp_estado, mp_descripcion) VALUES
('Efectivo', 'Manual', 'activo', 'Pago en efectivo'),
('Transferencia Bancaria', 'Sistema Bancario', 'activo', 'Transferencia a cuenta bancaria'),
('Tarjeta de Crédito', 'Visa/Mastercard', 'activo', 'Pago con tarjeta de crédito'),
('Cheque', 'Sistema Bancario', 'activo', 'Pago con cheque'),
('Depósito en Cuenta', 'Sistema Bancario', 'activo', 'Depósito directo en cuenta')
ON CONFLICT DO NOTHING;

-- Insert Order Statuses
INSERT INTO estado_pedido (estado_nombre, estado_descripcion) VALUES
('Pendiente', 'Pedido recibido, en espera de procesamiento'),
('En Preparación', 'Pedido en preparación'),
('Listo para Envío', 'Pedido listo para ser enviado'),
('Enviado', 'Pedido ha sido enviado'),
('Entregado', 'Pedido ha sido entregado al cliente'),
('Cancelado', 'Pedido ha sido cancelado'),
('Devuelto', 'Pedido ha sido devuelto'),
('En Garantía', 'Pedido en proceso de garantía')
ON CONFLICT DO NOTHING;

-- Insert Product Categories
INSERT INTO categoria_producto (cp_nombre, cp_descripcion) VALUES
('Pan Blanco', 'Panes blancos tradicionales'),
('Pan Integral', 'Panes con harina integral'),
('Pasteles', 'Pasteles y tortas'),
('Pasteles Pequeños', 'Cupcakes, muffins y similares'),
('Productos Especiales', 'Productos dietéticos y especiales'),
('Galletas', 'Galletas y bizcochos'),
('Bollería', 'Bollos, donuts y similar'),
('Productos Congelados', 'Productos semi-elaborados para congelar')
ON CONFLICT DO NOTHING;

-- Insert Roles
INSERT INTO rol (rol_nombre, rol_nivel, rol_descripcion, rol_activo) VALUES
('Administrador', 5, 'Acceso total al sistema', true),
('Gerente de Ventas', 4, 'Gestión de ventas y clientes', true),
('Gerente de Operaciones', 4, 'Gestión de operaciones y inventario', true),
('Gerente de Producción', 4, 'Gestión de producción', true),
('Supervisor', 3, 'Supervisión de procesos', true),
('Operario de Producción', 2, 'Operarios de planta', true),
('Vendedor', 2, 'Personal de ventas', true),
('Logístico', 2, 'Personal de logística y entregas', true),
('Analista', 3, 'Análisis de datos y reportes', true),
('Recurso Humano', 3, 'Gestión de recursos humanos', true)
ON CONFLICT DO NOTHING;

-- Insert Competencies
INSERT INTO empleado_competencia (competencia_nombre, competencia_nivel, competencia_descrip) VALUES
('Horneado', 3, 'Capacidad de horneado de productos'),
('Amasado', 3, 'Capacidad de amasado de masas'),
('Moldeado', 3, 'Capacidad de moldeado de productos'),
('Decoración', 2, 'Capacidad de decoración de productos'),
('Atención al Cliente', 2, 'Capacidad de atención y servicio'),
('Gestión Administrativa', 2, 'Capacidad de gestión administrativa'),
('Logística y Transporte', 2, 'Capacidad de transporte y logística'),
('Calidad y Seguridad Alimentaria', 3, 'Conocimientos en calidad e inocuidad'),
('Mantenimiento Preventivo', 2, 'Capacidad de mantenimiento de equipos'),
('Liderazgo', 3, 'Capacidad de liderazgo y supervisión')
ON CONFLICT DO NOTHING;
create database if not exist bddstore;
use bddsotre;

CREATE TABLE Clientes
(
	cliente_id           INTEGER NOT NULL ,
	cliente_nombre       CHAR(18) NULL ,
	cliente_detalles     CHAR(18) NULL ,
	cliente_genero       CHAR(18) NULL ,
	cliente_email        CHAR(18) NULL ,
	cliente_telefono     INTEGER NULL ,
	cliente_domicilio    CHAR(18) NULL ,
	ciudad               CHAR(18) NULL ,
	estado               CHAR(18) NULL ,
	pais                 CHAR(18) NULL ,
CONSTRAINT  XPKClientes PRIMARY KEY (cliente_id)
);



CREATE TABLE Estado_de_la_reservacion
(
	estado_reservacion_codigo INTEGER NOT NULL ,
	estado_reservacion_descripcion CHAR(18) NULL ,
CONSTRAINT  XPKEstado_de_la_reservacion PRIMARY KEY (estado_reservacion_codigo)
);



CREATE TABLE Reservacion
(
	reservacion_id       INTEGER NOT NULL ,
	fecha_inicio         DATE NULL ,
	fecha_entrega        DATE NULL ,
	mensaje_confirmacion CHAR(18) NULL ,
	pago_recibido        CHAR(18) NULL ,
	cliente_id           INTEGER NULL ,
	estado_reservacion_codigo INTEGER NULL ,
CONSTRAINT  XPKReservacion PRIMARY KEY (reservacion_id),
CONSTRAINT R_2 FOREIGN KEY (cliente_id) REFERENCES Clientes (cliente_id),
CONSTRAINT R_3 FOREIGN KEY (estado_reservacion_codigo) REFERENCES Estado_de_la_reservacion (estado_reservacion_codigo)
);



CREATE TABLE Categoria_del_vehiculo
(
	categoria_vehiculo_id INTEGER NOT NULL ,
	categoria_vehiculo_descripcion CHAR(18) NULL ,
CONSTRAINT  XPKCategoria_del_vehiculo PRIMARY KEY (categoria_vehiculo_id)
);



CREATE TABLE Manufacturador
(
	manufacturador_id    INTEGER NOT NULL ,
	manufacturador_nombre CHAR(18) NULL ,
	manufacturador_detalles CHAR(18) NULL ,
CONSTRAINT  XPKManufacturador PRIMARY KEY (manufacturador_id)
);



CREATE TABLE Modelo
(
	modelo_id            INTEGER NOT NULL ,
	cantidad_contrataciones_diaria CHAR(18) NULL ,
	modelo_nombre        CHAR(18) NULL ,
	manufacturador_id    INTEGER NULL ,
CONSTRAINT  XPKModelo PRIMARY KEY (modelo_id),
CONSTRAINT R_4 FOREIGN KEY (manufacturador_id) REFERENCES Manufacturador (manufacturador_id)
);



CREATE TABLE Vehiculo
(
	numero_matricula     INTEGER NOT NULL ,
	kilometraje          INTEGER NULL ,
	tipo_motor           CHAR(18) NULL ,
	color                CHAR(18) NULL ,
	modelo_id            INTEGER NULL ,
	categoria_vehiculo_id INTEGER NULL ,
	vehiculo_descripcion CHAR(18) NULL ,
CONSTRAINT  XPKVehiculo PRIMARY KEY (numero_matricula),
CONSTRAINT R_5 FOREIGN KEY (modelo_id) REFERENCES Modelo (modelo_id),
CONSTRAINT R_6 FOREIGN KEY (categoria_vehiculo_id) REFERENCES Categoria_del_vehiculo (categoria_vehiculo_id)
);
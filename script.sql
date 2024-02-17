INSERT INTO `PruebaTecnica`.`Rol`
(`id`,
`name`,
`description`)
VALUES
(null,
'ADMIN',
'Rol de administradores');

INSERT INTO `PruebaTecnica`.`Rol`
(`id`,
`name`,
`description`)
VALUES
(null,
'USER',
'Rol para cliente');

INSERT INTO `PruebaTecnica`.`User`
(`id`,
`password`,
`idRol`)
VALUES
(null,
'$2b$10$HPlW1xbymhzBECq8Lecvm.Aop4.Se.3DhqGBLAjMNQCdUMcJU4H7O',
1);

INSERT INTO `PruebaTecnica`.`User`
(`id`,
`password`,
`idRol`)
VALUES
(null,
'$2b$10$HPlW1xbymhzBECq8Lecvm.Aop4.Se.3DhqGBLAjMNQCdUMcJU4H7O',
2);

INSERT INTO `PruebaTecnica`.`Client`
(`id`,
`name`,
`lastName`,
`email`,
`idUser`)
VALUES
(null,
'Alvaro',
'Toro',
'alvarotoro@gmail.com',
1);

INSERT INTO `PruebaTecnica`.`Client`
(`id`,
`name`,
`lastName`,
`email`,
`idUser`)
VALUES
(null,
'Erick',
'Torres',
'ericktorres@gmail.com',
2);

INSERT INTO `PruebaTecnica`.`Salary`
(`id`,
`amount`,
`typePayment`,
`country`,
`city`)
VALUES
(null,
12,
'HORAS',
'USA',
'FLORIDA');

-- Campaña 1: Aumento de Beneficios en Nómina - Empresa XYZ
INSERT INTO `PruebaTecnica`.`Company` (name, code)
VALUES ('Aumento de Beneficios en Nómina - Empresa XYZ', 'BENEFXYZ2024');

-- Campaña 2: Programa de Retención de Empleados - Empresa ABC
INSERT INTO `PruebaTecnica`.`Company` (name, code)
VALUES ('Programa de Retención de Empleados - Empresa ABC', 'RETENABC2024');

-- Campaña 3: Reconocimiento por Desempeño - Empresa QRS
INSERT INTO `PruebaTecnica`.`Company` (name, code)
VALUES ('Reconocimiento por Desempeño - Empresa QRS', 'RECONQRS2024');

-- Campaña 4: Bonificación de Fin de Año - Empresa DEF
INSERT INTO `PruebaTecnica`.`Company` (name, code)
VALUES ('Bonificación de Fin de Año - Empresa DEF', 'BONFINDEF2024');

-- Campaña 5: Incentivos por Productividad - Empresa GHI
INSERT INTO `PruebaTecnica`.`Company` (name, code)
VALUES ('Incentivos por Productividad - Empresa GHI', 'INCPRODGHI2024');

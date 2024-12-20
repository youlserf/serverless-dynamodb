# RecipeHub Serverless Demo

## Descripción

**RecipeHub** es una demostración que explora tecnologías serverless para la creación y gestión de recetas de cocina. Este proyecto sirve como un ejercicio práctico para experimentar con **AWS DynamoDB**, **Serverless Framework**, y **pnpm**. Aunque no es una aplicación completa, muestra las bases para implementar servicios escalables y modernos con arquitectura serverless.

---

## Características

- **CRUD Simple**: Soporta operaciones básicas para gestionar recetas.
- **Persistencia con DynamoDB**: Prueba de almacenamiento con una base de datos NoSQL.
- **API Gateway**: Manejo de endpoints HTTP para interactuar con las funciones Lambda.
- **Infraestructura como Código**: Recursos definidos y gestionados con Serverless Framework.
- **Desarrollo Moderno**: Uso de tecnologías actuales como `pnpm` y `esbuild`.

---

## Tecnologías Utilizadas

### Principales
- **Serverless Framework**: Gestión y despliegue de servicios serverless.
- **AWS Lambda**: Ejecución de funciones serverless para lógica de negocio.
- **AWS DynamoDB**: Base de datos NoSQL para probar almacenamiento escalable.
- **Node.js (v18)**: Entorno de ejecución principal.

### Herramientas de Desarrollo
- **pnpm**: Rápido gestor de paquetes.
- **esbuild**: Empaquetador para optimizar y generar artefactos.
- **serverless-offline**: Emulación local de funciones Lambda.

---

## Configuración de AWS con Serverless Framework

Antes de desplegar la demo, es necesario configurar las credenciales de AWS en el Serverless Framework:

1. **Instalar Serverless Framework**  
   Si no lo tienes instalado:  
   ```bash
   npm install -g serverless
   ```

2. **Configurar Credenciales de AWS**  
   Ejecuta el siguiente comando para añadir tus credenciales de AWS:  
   ```bash
   serverless config credentials --provider aws --key <AWS_ACCESS_KEY> --secret <AWS_SECRET_KEY>
   ```
   Sustituye `<AWS_ACCESS_KEY>` y `<AWS_SECRET_KEY>` por tus claves de acceso.

3. **Verificar Configuración**  
   Puedes listar las configuraciones para asegurarte de que están correctamente establecidas:  
   ```bash
   serverless config list
   ```

---

## Requisitos Previos

1. **Instalar pnpm**  
   ```bash
   npm install -g pnpm
   ```

2. **Instalar dependencias del proyecto**  
   ```bash
   pnpm install
   ```

---

## Ejecución

### Localmente
Para probar las funciones localmente con un entorno simulado:  
```bash
serverless offline
```

### Despliegue en AWS
Para desplegar la demo en AWS:  
```bash
serverless deploy
```

### Eliminación de Recursos
Si deseas eliminar los recursos creados:  
```bash
serverless remove
```

---

## Endpoints

### Lectura
- **GET /recipe/{id}**: Recuperar una receta por su ID.
- **GET /recipe**: Obtener todas las recetas.

### Escritura
- **POST /recipe**: Crear una receta nueva.
- **PUT /recipe/{id}**: Actualizar una receta existente.
- **DELETE /recipe/{id}**: Eliminar una receta.

---

## Notas

Este proyecto no es una aplicación final, sino una **demo** enfocada en aprender y experimentar con tecnologías serverless. La arquitectura y las herramientas utilizadas permiten a los desarrolladores explorar las capacidades de **AWS Lambda**, **DynamoDB**, y el **Serverless Framework**.

---

¡Explora y aprende mientras construyes con RecipeHub Demo! 🚀
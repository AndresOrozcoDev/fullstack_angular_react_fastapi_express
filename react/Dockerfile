# Etapa 1: Construcción
FROM node:18 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar dependencias de la aplicación React
RUN npm install

# Copiar todo el código de la aplicación al contenedor
COPY . .

# Construir la aplicación React para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos de build generados por la etapa anterior a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto en el que Nginx va a escuchar
EXPOSE 80

# Ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]

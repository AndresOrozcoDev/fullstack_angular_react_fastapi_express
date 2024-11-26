# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si están presentes)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación usando Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/portal /usr/share/nginx/html

# Exponer el puerto en el que Nginx escuchará
EXPOSE 80

# Ejecutar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]

# Dockerfile para la app de FastAPI

# Usa una imagen base de Python
FROM python:3.11

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de requerimientos
COPY requirements.txt ./

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la app escucha
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["fastapi", "dev", "main.py"]

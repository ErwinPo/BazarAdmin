# BazarAdmin

## Installation & Runnning

Para la instalación, primero que todo necesitamos apagar la API, lo que significa que necesitamos comenzar a ejecutar nuestros servicios APIRest para permitir que toda la aplicación funcione correctamente.

### APIRest HNP

1. Abre una terminal en el directorio clonado en la carpeta APIRestHNP.
    
        cd APIRestHNP

2. Crea un entorno virtual (opcional pero recomendado):
3. Instala dependencias
   
        pip install -r requirements.txt

4. Realiza las migraciones si es necesario

        python manage.py migrate

5. Inicia el servidor

        python manage.py runserver

### Android

1. Abrir en Android Studio:

    Abre Android Studio.
    Selecciona "Open an existing Android Studio project" y navega hasta el directorio donde clonaste el repositorio y abre la carpeta de Android.

2. Compilar y ejecutar:

    Android Studio debe detectar automáticamente el proyecto y manejara la compilación.
    Conecta un dispositivo Android o inicia un emulador.
    Haz clic en el botón "Run" en Android Studio para compilar y ejecutar la aplicación en el dispositivo/emulador.

### Web Administrator

1. Instalar dependencias y ejecutar:

    Abre una terminal en el directorio clonado y ejecuta los siguientes comandos ejecuta los siguientes comandos:

        cd WebAdministrator
        npm install
        npm run dev

    Esto instalará las dependencias del proyecto y ejecutará la aplicación en modo de desarrollo.



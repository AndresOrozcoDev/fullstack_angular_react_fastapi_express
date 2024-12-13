import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 5000, // Duración de la notificación en milisegundos antes de que desaparezca automáticamente.
      positionClass: 'toast-bottom-right', // Posición de la notificación en la pantalla.
      preventDuplicates: true, // Evita que se muestren notificaciones duplicadas si ya existe una similar.
      closeButton: true, // Muestra un botón para cerrar manualmente la notificación.
      progressBar: true, // Muestra una barra de progreso que indica el tiempo restante antes de desaparecer.
      progressAnimation: 'decreasing', // Estilo de animación para la barra de progreso: 'decreasing' o 'increasing'.
      enableHtml: false, // Permite usar contenido HTML en el mensaje de la notificación.
      tapToDismiss: true, // Cierra la notificación al hacer clic sobre ella.
      toastClass: 'ngx-toastr', // Clase CSS personalizada para estilizar las notificaciones.
      extendedTimeOut: 1000, // Tiempo adicional en milisegundos que permanece visible si el usuario interactúa con ella.
      easeTime: 300, // Duración de la animación para mostrar u ocultar la notificación en milisegundos.
      onActivateTick: false, // Fuerza un ciclo de detección de cambios de Angular al activar una notificación.
    }),
  ],
};

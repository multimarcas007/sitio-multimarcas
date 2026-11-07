/* ================================================================
   LÓGICA INTERACTIVA DEL SITIO
   Servicio Técnico Especializado Multimarcas
   ================================================================ */

// Número de WhatsApp del negocio (formato internacional sin "+" ni espacios)
const NUMERO_WHATSAPP = '573102996975';

/* ----------------------------------------------------------------
   1. MENÚ MÓVIL (botón hamburguesa)
   Abre y cierra el menú de navegación en pantallas pequeñas.
   ---------------------------------------------------------------- */
const botonMenu = document.getElementById('botonMenu');
const menuNavegacion = document.getElementById('menuNavegacion');

if (botonMenu && menuNavegacion) {
    // Alternar el menú al hacer clic en el botón hamburguesa
    botonMenu.addEventListener('click', () => {
        menuNavegacion.classList.toggle('activo');
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    const enlacesMenu = menuNavegacion.querySelectorAll('a');
    enlacesMenu.forEach((enlace) => {
        enlace.addEventListener('click', () => {
            menuNavegacion.classList.remove('activo');
        });
    });
}

/* ----------------------------------------------------------------
   2. FORMULARIO DE CONTACTO -> WHATSAPP
   En lugar de requerir un servidor de correo, el formulario
   construye un mensaje y abre WhatsApp con los datos del cliente.
   Esto es ideal para un negocio pequeño: respuesta inmediata.
   ---------------------------------------------------------------- */
const formularioContacto = document.getElementById('formularioContacto');

if (formularioContacto) {
    formularioContacto.addEventListener('submit', (evento) => {
        // Evitamos que la página se recargue al enviar
        evento.preventDefault();

        // Recogemos los valores que escribió el cliente
        const nombre = document.getElementById('nombre').value.trim();
        const electrodomestico = document.getElementById('electrodomestico').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        // Construimos un mensaje claro y ordenado para WhatsApp
        const textoMensaje =
            `Hola, soy ${nombre}.%0A` +           // %0A es un salto de línea en URL
            `Necesito reparar: ${electrodomestico}.%0A` +
            `Falla: ${mensaje}`;

        // Generamos el enlace de WhatsApp con el mensaje precargado
        const enlaceWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${textoMensaje}`;

        // Abrimos WhatsApp en una pestaña nueva
        window.open(enlaceWhatsApp, '_blank');
    });
}

/* ----------------------------------------------------------------
   3. ANIMACIÓN DE APARICIÓN AL DESPLAZAR (scroll)
   Las secciones aparecen suavemente cuando entran en pantalla,
   dando una sensación más moderna y profesional.
   ---------------------------------------------------------------- */
const elementosAnimados = document.querySelectorAll(
    '.tarjeta-servicio, .ventaja, .marca'
);

// IntersectionObserver detecta cuándo un elemento entra en el viewport
const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
                // Dejamos de observar el elemento una vez animado
                observador.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.1 } // Se activa cuando el 10% del elemento es visible
);

// Preparamos cada elemento (invisible y desplazado) y lo observamos
elementosAnimados.forEach((elemento) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(20px)';
    elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observador.observe(elemento);
});

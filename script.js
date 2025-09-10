document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let activeIndex = 0;

    // ----- Nuevas selecciones de elementos -----
    const trailerBtn = document.querySelector('.btn-trailer');
    const closeBtn = document.querySelector('.close');
    const trailer = document.querySelector('.trailer');
    const videoFrame = document.querySelector('.trailer iframe');

    // Función que asigna las clases correctas a cada elemento del carrusel.
    function updateCarousel() {
        items.forEach((item, index) => {
            // Elimina todas las clases de posición para un reinicio limpio.
            item.classList.remove('active', 'side-left', 'side-right', 'background-left', 'background-right');

            // Calcula los índices para las posiciones relativas.
            const prevIndex = (activeIndex - 1 + items.length) % items.length;
            const nextIndex = (activeIndex + 1) % items.length;
            const twoPrevIndex = (activeIndex - 2 + items.length) % items.length;
            const twoNextIndex = (activeIndex + 2) % items.length;

            // Asigna las clases CSS basadas en los índices.
            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === prevIndex) {
                item.classList.add('side-left');
            } else if (index === nextIndex) {
                item.classList.add('side-right');
            } else if (index === twoPrevIndex) {
                item.classList.add('background-left');
            } else if (index === twoNextIndex) {
                item.classList.add('background-right');
            }
        });
    }

    // Agrega un "event listener" a cada imagen para detectar el clic.
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Solo actualiza si no se hizo clic en la imagen que ya está activa.
            if (index !== activeIndex) {
                activeIndex = index;
                updateCarousel();
            }
        });
    });

    // Event listeners para los botones de navegación
    nextBtn.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    // ----- Lógica para el tráiler (nuevo) -----

    // Al hacer clic en el botón de tráiler, se muestra el video
    trailerBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el enlace de `<a>` navegue
        trailer.classList.add('active');
        
        // Reproduce el video al agregarle el parámetro `autoplay`
        const videoSrc = videoFrame.src.includes('autoplay=1') ? videoFrame.src : videoFrame.src + '&autoplay=1';
        videoFrame.src = videoSrc;
    });

    // Al hacer clic en el botón de cierre, se oculta el video y se detiene
    closeBtn.addEventListener('click', () => {
        trailer.classList.remove('active');
        
        // Detiene el video al quitarle el `autoplay` y reiniciar el `src`
        const videoSrc = videoFrame.src.replace('&autoplay=1', '');
        videoFrame.src = videoSrc;
    });

    // Llama a la función una vez para inicializar el carrusel al cargar la página.
    updateCarousel();
});
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    let activeIndex = 0; // El índice de la imagen que está en el centro.

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

    // ***** Event listeners para los botones de navegación (CORREGIDO) *****
    nextBtn.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    // Llama a la función una vez para inicializar el carrusel al cargar la página.
    updateCarousel();
});
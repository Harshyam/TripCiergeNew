document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.querySelector('img').classList.add('zoom-effect');
        });

        container.addEventListener('mouseleave', () => {
            container.querySelector('img').classList.remove('zoom-effect');
        });
    });
});

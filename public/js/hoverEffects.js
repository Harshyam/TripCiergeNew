function applyHoverEffects() {
    const hoverEffectsWide = [
        { containerId: 'container1', hoverWidth: '440px', hoverHeight: '440px' },
        { containerId: 'container2', hoverWidth: '850px', hoverHeight: '440px' },
        { containerId: 'container3', hoverWidth: '850px', hoverHeight: '440px' },
        { containerId: 'container4', hoverWidth: '440px', hoverHeight: '440px' },
        { containerId: 'container5', hoverWidth: '1290px', hoverHeight: '440px' },
        { containerId: 'container6', hoverWidth: '440px', hoverHeight: '440px' },
        { containerId: 'container7', hoverWidth: '850px', hoverHeight: '440px' },
        { containerId: 'container8', hoverWidth: '1290px', hoverHeight: '440px' },
    ];

    const hoverEffectsNarrow = [
        { containerId: 'container1', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container2', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container3', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container4', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container5', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container6', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container7', hoverWidth: '470px', hoverHeight: '300px' },
        { containerId: 'container8', hoverWidth: '470px', hoverHeight: '300px' },
    ];

    const isWideScreen = window.matchMedia("(min-width: 577px)").matches;
    const hoverEffects = isWideScreen ? hoverEffectsWide : hoverEffectsNarrow;

    hoverEffects.forEach(effect => {
        const container = document.getElementById(effect.containerId);
        const imageContainer = container.querySelector('.image-container');

        container.addEventListener('mouseover', () => {
            imageContainer.style.width = effect.hoverWidth;
            imageContainer.style.height = effect.hoverHeight;
        });

        container.addEventListener('mouseout', () => {
            imageContainer.style.width = '100%';
            imageContainer.style.height = '100%';
        });
    });
}

applyHoverEffects();
window.addEventListener('resize', applyHoverEffects);

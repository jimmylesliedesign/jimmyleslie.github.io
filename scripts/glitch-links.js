/**
 * Glitch effect for all hyperlinked text - plays once on hover
 */
(function() {
    'use strict';

    const GLITCH_DURATION = 0.3;
    const GLITCH_INTENSITY = 0.7;

    function initGlitchLinks() {
        const links = document.querySelectorAll('a[href]:not(.email-copy):not(.work-item):not(.writing-item)');

        links.forEach(function(link) {
            const text = (link.textContent || '').trim();
            if (!text) return;

            link.setAttribute('data-text', text);
            link.classList.add('glitch-link');

            let glitchTimeoutId = null;

            link.addEventListener('mouseenter', function() {
                if (glitchTimeoutId) return;
                link.style.setProperty('--glitch-intensity', GLITCH_INTENSITY);
                link.style.setProperty('--glitch-duration', GLITCH_DURATION + 's');
                link.classList.add('glitch-active');
                glitchTimeoutId = setTimeout(function() {
                    link.classList.remove('glitch-active');
                    glitchTimeoutId = null;
                }, GLITCH_DURATION * 1000);
            });

            link.addEventListener('mouseleave', function() {
                if (glitchTimeoutId) {
                    clearTimeout(glitchTimeoutId);
                    glitchTimeoutId = null;
                }
                link.classList.remove('glitch-active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlitchLinks);
    } else {
        initGlitchLinks();
    }
})();

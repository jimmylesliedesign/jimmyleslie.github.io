/**
 * Case Study Shared Scripts
 * Before/After slider and video autoplay - reusable across all case studies
 */

(function() {
    'use strict';

    // Before/After Slider - supports multiple sliders on page
    let activeBaSlider = null;

    function updateBaSlider(container, clientX) {
        const beforeWrapper = container.querySelector('.ba-before-wrapper');
        const afterWrapper = container.querySelector('.ba-after-wrapper');
        const track = container.querySelector('.ba-slider-track');
        if (!beforeWrapper || !afterWrapper || !track) return;

        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        beforeWrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        afterWrapper.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        track.style.left = `${percentage}%`;
    }

    document.querySelectorAll('[data-ba-slider]').forEach(container => {
        const beforeWrapper = container.querySelector('.ba-before-wrapper');
        const track = container.querySelector('.ba-slider-track');
        if (!beforeWrapper || !track) return;

        container.addEventListener('mousedown', (e) => {
            activeBaSlider = container;
            container.classList.add('dragging');
            updateBaSlider(container, e.clientX);
        });

        container.addEventListener('click', (e) => {
            if (e.target.closest('.ba-slider-button')) return;
            updateBaSlider(container, e.clientX);
        });

        container.addEventListener('touchstart', (e) => {
            activeBaSlider = container;
            container.classList.add('dragging');
            updateBaSlider(container, e.touches[0].clientX);
            e.preventDefault();
        }, { passive: false });

        updateBaSlider(container, container.getBoundingClientRect().left + (container.getBoundingClientRect().width / 2));
    });

    document.addEventListener('mousemove', (e) => {
        if (activeBaSlider) updateBaSlider(activeBaSlider, e.clientX);
    });

    document.addEventListener('mouseup', () => {
        if (activeBaSlider) {
            activeBaSlider.classList.remove('dragging');
            activeBaSlider = null;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (activeBaSlider && e.touches.length > 0) {
            updateBaSlider(activeBaSlider, e.touches[0].clientX);
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (activeBaSlider) {
            activeBaSlider.classList.remove('dragging');
            activeBaSlider = null;
        }
    });

    // Video autoplay on scroll into view
    const caseStudyVideos = document.querySelectorAll('.case-study-video, .gallery-video');

    caseStudyVideos.forEach(video => {
        video.load();

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(() => {});
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.3 });

        videoObserver.observe(video);
    });
})();

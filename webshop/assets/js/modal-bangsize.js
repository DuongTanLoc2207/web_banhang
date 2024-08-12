document.addEventListener('DOMContentLoaded', function() {
    const sizeChartImages = document.querySelectorAll('.sizeChartImage');

    sizeChartImages.forEach(image => {
        const targetModalId = image.getAttribute('data-target');
        const targetModal = document.getElementById(targetModalId);

        image.addEventListener('click', function() {
            targetModal.style.display = 'flex';
            setTimeout(() => {
                targetModal.classList.add('show');
            }, 10);
        });
    });

    document.querySelectorAll('.close-size-chart').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            const modal = closeButton.closest('.modal-size-chart');
            modal.classList.remove('show');
            modal.classList.add('closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
            }, 0);
        });
    });

    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal-size-chart').forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('show');
                modal.classList.add('closing');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('closing');
                }, 0);
            }
        });
    });
});

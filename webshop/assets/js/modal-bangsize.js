document.addEventListener('DOMContentLoaded', function() {
    const sizeChartImage = document.getElementById('sizeChartImage');
    const sizeChartModal = document.getElementById('sizeChartModal');
    const closeSizeChart = document.querySelector('.close-size-chart');

    sizeChartImage.addEventListener('click', function() {
        sizeChartModal.style.display = 'flex';
        setTimeout(() => {
            sizeChartModal.classList.add('show');
        }, 10);
    });

    closeSizeChart.addEventListener('click', function() {
        sizeChartModal.classList.remove('show');
        sizeChartModal.classList.add('closing');
        setTimeout(() => {
            sizeChartModal.style.display = 'none';
            sizeChartModal.classList.remove('closing');
        }, 0); // Thời gian delay là 0 để loại bỏ ngay lập tức
    });

    window.addEventListener('click', function(event) {
        if (event.target === sizeChartModal) {
            sizeChartModal.classList.remove('show');
            sizeChartModal.classList.add('closing');
            setTimeout(() => {
                sizeChartModal.style.display = 'none';
                sizeChartModal.classList.remove('closing');
            }, 0);
        }
    });
});

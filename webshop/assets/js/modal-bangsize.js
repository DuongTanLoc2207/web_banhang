document.addEventListener('DOMContentLoaded', function() {
    const sizeChartImage = document.getElementById('sizeChartImage');
    const sizeChartModal = document.getElementById('sizeChartModal');
    const closeSizeChart = document.querySelector('.close-size-chart');

    sizeChartImage.addEventListener('click', function() {
        sizeChartModal.style.display = 'block';
    });

    closeSizeChart.addEventListener('click', function() {
        sizeChartModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === sizeChartModal) {
            sizeChartModal.style.display = 'none';
        }
    });
});

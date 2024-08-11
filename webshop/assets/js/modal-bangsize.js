document.addEventListener('DOMContentLoaded', function() {
    const sizeChartImage = document.getElementById('sizeChartImage');
    const sizeChartModal = document.getElementById('sizeChartModal');
    const closeSizeChart = document.querySelector('.close-size-chart');

    sizeChartImage.addEventListener('click', function() {
        sizeChartModal.style.display = 'flex';
        setTimeout(() => {
            sizeChartModal.classList.add('show'); // Thêm lớp 'show' để kích hoạt hiệu ứng
        }, 10); // Sử dụng setTimeout để đảm bảo rằng thuộc tính display đã được áp dụng trước khi thêm lớp 'show'
    });

    closeSizeChart.addEventListener('click', function() {
        sizeChartModal.classList.remove('show'); // Loại bỏ lớp 'show' để ẩn hiệu ứng
        setTimeout(() => {
            sizeChartModal.style.display = 'none';
        }, 500); // Chờ thời gian hiệu ứng kết thúc trước khi ẩn modal hoàn toàn
    });

    window.addEventListener('click', function(event) {
        if (event.target === sizeChartModal) {
            sizeChartModal.classList.remove('show'); // Loại bỏ lớp 'show' để ẩn hiệu ứng
            setTimeout(() => {
                sizeChartModal.style.display = 'none';
            }, 500); // Chờ thời gian hiệu ứng kết thúc trước khi ẩn modal hoàn toàn
        }
    });
});

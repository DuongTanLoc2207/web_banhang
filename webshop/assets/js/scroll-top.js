window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
}

document.getElementById("scrollTopBtn").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

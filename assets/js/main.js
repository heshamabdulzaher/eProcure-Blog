// Show header
const header = document.querySelector('.sticky-header');
let progressBar = header.querySelector('.progress-scroll-bar');
let scrollProgressPercentage = 0;
let pageHeight = document.body.scrollHeight - window.innerHeight;
document.addEventListener('scroll', function (e) {
  scrollProgressPercentage =
    Math.round((window.scrollY * 100) / pageHeight) / 100;
  progressBar.style.transform = `scaleX(${scrollProgressPercentage})`;
  if (window.scrollY >= 400) {
    header.classList.add('show');
  } else {
    header.classList.remove('show');
  }
});

// Show sticky header only at Article page
if (window.location.pathname.includes('/article')) {
  stickyHeader();
}

function toggleShareIcons() {
  const shareIcon = document.querySelector(
    '.socialShare_mobile .toggleShareIcons [name="share-social"]'
  );
  const closeIcon = document.querySelector(
    '.socialShare_mobile .toggleShareIcons [name="close"]'
  );
  shareIcon.classList.toggle('hide');
  closeIcon.classList.toggle('hide');
  const socialShare_mobile = document.querySelector('.socialShare_mobile');
  socialShare_mobile.classList.toggle('show');
}

function copyURL() {
  const copyURLSuccessMsg = document.querySelector('.copyURLSuccessMsg');
  copyURLSuccessMsg.style.transform = 'translateY(0)';
  const tempInput = document.createElement('input');
  tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
  tempInput.value = window.location.href;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  tempInput.blur();
  document.body.removeChild(tempInput);
  setTimeout((e) => {
    copyURLSuccessMsg.style.transform = 'translateY(-150%)';
  }, 2000);
}

function stickyHeader() {
  const header = document.querySelector('.sticky-header');
  let progressBar = header.querySelector('.progress-scroll-bar');
  let scrollProgressPercentage = 0;
  let pageHeight = document.body.scrollHeight - window.innerHeight;
  document.addEventListener('scroll', function (e) {
    scrollProgressPercentage = (window.scrollY * 100) / pageHeight / 100;
    progressBar.style.transform = `scaleX(${scrollProgressPercentage})`;
    if (window.scrollY >= 400) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
  });
}

window.onload = function () {
  filterCategories();
  fillSocialLinks();
};

function fillSocialLinks() {
  const mainMsg = 'eProcure Blog';
  const articleTitle = document.querySelector('.article-banner h2').innerText;

  const facebookLinks = document.querySelectorAll('a.facebook');
  facebookLinks.forEach((facebook) => {
    facebook.setAttribute(
      'href',
      `https://www.facebook.com/sharer.php?quote=${mainMsg}%0a${articleTitle}&u=${window.location.href}`
    );
  });

  const twitterLinks = document.querySelectorAll('a.twitter');
  twitterLinks.forEach((facebook) => {
    twitter.setAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${mainMsg}%0a${articleTitle}%0a${window.location.href}`
    );
  });
}

// Filter Articles by category
let categoriesLinks = document.querySelectorAll('.categories a');
let articles = document.querySelectorAll('.articles .article-card');
let activeCategory = 'all';
categoriesLinks.forEach((itm) => {
  itm.addEventListener('click', addSearchParam);
});

function filterCategories() {
  activeCategory = window.location.search.replace('?category=', '');
  if (!activeCategory) {
    document
      .querySelector('.categories a[data-category="all"]')
      .classList.add('active');
  } else {
    document
      .querySelector(`.categories a[data-category="${activeCategory}"]`)
      .classList.add('active');
    articles.forEach((card) => {
      if (card.dataset.category != activeCategory) {
        card.style.display = 'none';
      }
    });
  }
}

function addSearchParam(e) {
  activeCategory = e.target.dataset.category;
  if (activeCategory != 'all') {
    window.location.href =
      window.location.origin + `?category=${e.target.dataset.category}`;
  } else if (
    activeCategory === 'all' &&
    (window.location.search || window.location.pathname.includes('/article'))
  ) {
    window.location.href = window.location.origin;
  }
}

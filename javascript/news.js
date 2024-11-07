let currentIndex = 0;
let maxVisible = getMaxVisible();
const itemsContainer = $('.news__list');
const dotContainer = $('.dot-container');
const prevBtn = $('#news-prev');
const nextBtn = $('#news-next');
let autoSlideInterval;
let data = [];

async function loadArticleData() {
    try {
        const response = await fetch('json/article.json');
        data = await response.json();
        displayNewsItems();
        createDots();
        updateDots();
    } catch(error) {
        console.error('Lỗi không tải được file JSON:', error);
    }
}

function displayNewsItems() {
    itemsContainer.innerHTML = '';
        const visibleNews = data.slice(currentIndex, currentIndex + maxVisible);

        visibleNews.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news__item-wrap', 'col', 'l-3', 'm-6', 'c-12')
            newsItem.innerHTML = `
                <div class="news__item">
                    <a href="article.html?id=${item.id}" class="news__img">
                        <img src="${item.imgSrc}" alt="${item.title}">
                    </a>
                    <div class="news__container">
                        <div class="news__type ${item.type}">${item.typeText}</div>
                        <h3 class="news__title">
                            ${item.title}
                        </h3>
                        <div class="news__content">
                            ${item.descriptionArticle}
                        </div>
                    </div>
                </div>
            `;
            itemsContainer.appendChild(newsItem);
        });
}

function nextItem() {
    if (currentIndex + maxVisible < data.length) {
        currentIndex++
    } else {
        currentIndex = 0;
    }
    displayNewsItems();
    updateDots();
    return currentIndex;
}

function prevItem() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = data.length - maxVisible;
    }
    displayNewsItems();
    updateDots();
    return currentIndex;
};

function createDots() {
    dotContainer.innerHTML = '';
    const totalDots = Math.max(0, data.length - maxVisible);

    for (let i = 0; i <= totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if (i === (currentIndex % totalDots)) {
            dot.classList.add('active');
        }
        dotContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = dotContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex % dots.length) {
            dot.classList.add('active');
        }
    })
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextItem();
    }, 3000)
};

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    clearTimeout(autoSlideTimeout)
};

function getMaxVisible() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
        return 4;
    } else if (screenWidth >= 768) {
        return 2;
    } else {
        return 1;
    }
};

prevBtn.addEventListener('click', function(event) {
    prevItem();
    stopAutoSlide();
    autoSlideTimeout = setTimeout(startAutoSlide, 3000);
});

nextBtn.addEventListener('click', function(event) {
    nextItem();
    startAutoSlide();
    autoSlideTimeout = setTimeout(startAutoSlide, 3000);
});

window.addEventListener('load', function() {
    startAutoSlide();

    window.addEventListener('resize', function() {
        currentIndex = 0;
        maxVisible = getMaxVisible();
        displayNewsItems();
    
    })
})

//dừng auto slide khi hover vào item, bắt đầu lại khi hover ra
itemsContainer.addEventListener('mouseover', stopAutoSlide);
itemsContainer.addEventListener('mouseout', function() {
    autoSlideTimeout = setTimeout(startAutoSlide, 3000);
});

//
// sectionNews(news);
loadArticleData()

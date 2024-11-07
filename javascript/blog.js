const cardPrev = $('#card-prev');
const cardNext = $('#card-next');
let lengthLineCurrent = 0;
const articleList = $('.article__list');
let articles = [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function loadArticlesData() {
    try {
        const response = await fetch('json/article.json');
        articles = await response.json();

        displayBlogItem();
        updateCategory(articles);
        
        const otherArticles = articles.filter(a => a.id != id);
        const otherArticlesDislayMax = otherArticles.slice(0, 5)

        //update post list aside
        const postsContainer = $('.aside__posts-list');
        postsContainer.innerHTML = '';

        otherArticlesDislayMax.forEach(articleIem => {
            const postItem = document.createElement('a');
            postItem.className = "aside__posts-item";
            postItem.href = `article.html?id=${articleIem.id}`
            postItem.innerHTML = `
            <img src="${articleIem.imgSrc}" alt="${articleIem.title}"
                class="aside__posts-item-img">
            <div class="aside__posts-item-wrap">
                <p class="aside__posts-item-title">${articleIem.title}</p>
                <div class="aside__posts-item-time">${articleIem.dayPost}</div>
            </div>
            `;
            postsContainer.appendChild(postItem);
        });
        
    } catch(error) {
        console.error('Lỗi không tải được file JSON:', error);
    }
}

function displayBlogItem() {
    articleList.innerHTML = '';
    const firstArticle  = articles[0];
    const largeArticle = document.createElement('a');
    largeArticle.className = "article__item article__item-large";
    largeArticle.href = `article.html?id=${firstArticle.id}`;
    largeArticle.style.backgroundImage = `url(${firstArticle.imgSrc})`;
    largeArticle.innerHTML =  `
        <div class="article__item-content">
        <h3 class="article__item-title">${firstArticle.title}</h3>
        <div class="article__item-wrap">
            <p class="article__item-des">${firstArticle.descriptionArticle}</p>
            <button class="article__item-btn">Xem thêm</button>
        </div>
        </div>
    `;
    articleList.appendChild(largeArticle);

    articles.slice(1).forEach(item => {
        const articleItem = document.createElement('a');
        articleItem.className = "article__item article__item-small";
        articleItem.href = `article.html?id=${item.id}`;
        articleItem.style.backgroundImage = `url(${item.imgSrc})`;
        articleItem.innerHTML =  `
            <div class="article__item-content">
            <h3 class="article__item-title">${item.title}</h3>
            <div class="article__item-wrap">
                <p class="article__item-des">${item.descriptionArticle}</p>
                <button class="article__item-btn">Xem thêm</button>
            </div>
            </div>
        `;
        articleList.appendChild(articleItem);
    })
}


//Slider animation
function updateBreadcrumb() {
    const cards = $$('.slider__card');
    const lineDefault = $('.slider__card-nav-line');
    let lineCurrent = $('.slider__card-nav-line.current');
    let widthLineCurrent = 0;

    let widthLineDefault = lineDefault.offsetWidth
    numberCards = cards.length;

    if (lengthLineCurrent >= numberCards) {
        lengthLineCurrent = 0;
    } else if (lengthLineCurrent < 0) {
        lengthLineCurrent = numberCards - 1;
    }

    widthLineCurrent = (widthLineDefault / numberCards) * (lengthLineCurrent + 1);
    lineCurrent.style.width = widthLineCurrent + 'px';
    $('.slider__card-nav-number').innerText = lengthLineCurrent + 1;
}

// update category
function updateCategory(articles) {
    const categoriesItem = $$('.aside__category-item');
        categoriesItem.forEach(item => {
            const typeClass = item.querySelector('.article__type').classList;
            const itemNumber = item.querySelector('.aside__category-item-number');

            if (typeClass.contains('article__type--info')) {
                const count = articles.filter(a => a.type === "article__type--info").length;
                itemNumber.textContent = count;
            } else if (typeClass.contains('article__type--tip')) {
                const count = articles.filter(a => a.type === "article__type--tip").length;
                itemNumber.textContent = count;
            } else if (typeClass.contains('article__type--hotel')) {
                const count = articles.filter(a => a.type === "article__type--hotel").length;
                itemNumber.textContent = count;
            }

        })
}

updateBreadcrumb()
cardNext.addEventListener('click', () => {
    const cards = $$('.slider__card');
    const slider = $('.slider');
    if (cards.length > 1) {
        slider.appendChild(cards[0]);
        lengthLineCurrent++;
        updateBreadcrumb();
    }
});

cardPrev.addEventListener('click', () => {
    const cards = $$('.slider__card');
    const slider = $('.slider')
    
    if (cards.length > 1) {
        slider.insertBefore(cards[cards.length - 1], cards[0]);
        lengthLineCurrent--
        updateBreadcrumb();
    }
});

//------------------------//
loadArticlesData()
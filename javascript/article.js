const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Hàm để tải và hiển thị dữ liệu sản phẩm
async function loadArticleData(id) {

    try {
        const response = await fetch('../json/article.json');
        const articles = await response.json();
        const article = articles.find(a => a.id == id);
        if (article) {
            updatePageContent(article); 
        }

        const otherArticles = articles.filter(a => a.id != id);
        const otherArticlesDislayMax = otherArticles.slice(0, 5)

        //update article more
        const articleMoreContainer = $('.article__more-list');
        articleMoreContainer.innerHTML = '';

        otherArticles.forEach(otherArticle => {
            if (otherArticle) {
                const articleMoreItem = document.createElement('div');
                articleMoreItem.className = 'article__more-item-wrap';
                articleMoreItem.href = `article.html?id=${otherArticle.id}`
                articleMoreItem.innerHTML = `
                    <a href="article.html?id=${otherArticle.id}" class="article__more-item">
                        <img src="${otherArticle.imgSrc}" alt="${otherArticle.title}" class="article__more-item-img">
                        <h3 class="article__more-item-title">${otherArticle.title}</h3>
                    </a>
                    `;
                articleMoreContainer.appendChild(articleMoreItem);

            }
        });

        //update post list aside
        const postsContainer = $('.aside__posts-list');
        postsContainer.innerHTML = '';

        otherArticlesDislayMax.forEach(articleIem => {
            const postItem = document.createElement('a');
            postItem.className = "aside__posts-item";
            postItem.href = `article.html?id=${articleIem.id}`
            postItem.innerHTML = `
            <img src="${articleIem.imgSrc}" alt="${articleIem.title}"
                class="aside__posts-item-img article__posts-item-img">
            <div class="aside__posts-item-wrap">
                <p class="aside__posts-item-title">${articleIem.title}</p>
                <div class="aside__posts-item-time">${articleIem.dayPost}</div>
            </div>
            `;
            postsContainer.appendChild(postItem);
        });

        updateCategory(articles);

        // Cập nhật trạng thái cho nút prev / next sau khi bài viết được load
        initializePagination();
        updateVisibleArticles();

    } catch (error) {
        console.error('Error loading article data:', error);
    }
}
function updatePageContent(article) {
    const articleContentWrap = $('.article__content-wrap');
    const articleTagsContainer = $('.article__content-footer-tags');

    $('.header__img').src = article.imgSrc;
    $('.header__img').alt = article.title;
    $('.location__name').textContent = article.title;
    $('.header__breadcrumb-final').textContent = article.title;
    $('.article__img').src = article.imgSrc;
    $('.article__img').alt = article.title;

    //update contain article
    articleContentWrap.innerHTML = '';
    articleContentWrap.innerHTML = `
    <p class="article__type ${article.type}">${article.typeText}</p>
    <div class="article__content-author">
        <img src="${article.authorAvatar}" alt="${article.authorName}" class="article__content-author-img">
        <span class="article__content-author-name"><span>Người đăng:</span>${article.authorName}</span>
        <span class="article__content-author-time">${article.timePost}</span>
    </div>
    <div class="article__content-container">${article.contentArticle}</div>
    `;

    // update article tags
    articleTagsContainer.innerHTML = '';
    article.tags.forEach(tag => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article__content-tag';
        articleDiv.textContent = tag;

        articleTagsContainer.appendChild(articleDiv);
    });
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

let currentIndex = 0;
let maxVisible = 2;

function initializePagination() {
    const articleItems = $$('.article__more-item-wrap');
    $('#article-prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateVisibleArticles();
        }
    });
    
    $('#article-next').addEventListener('click', () => {
        if (currentIndex + maxVisible < articleItems.length) {
            currentIndex++;
            updateVisibleArticles();
        }
    })
}

function updateVisibleArticles() {
    const articleItems = $$('.article__more-item-wrap');
    articleItems.forEach((item, index) => {
        item.style.display = (index >= currentIndex && index < currentIndex + maxVisible) ? 'flex' : 'none';
    });

    $('#article-prev').disabled = currentIndex === 0;
    $('#article-next').disabled = currentIndex + maxVisible >= articleItems.length;
}



window.addEventListener('DOMContentLoaded', () => {
    loadArticleData(articleId);
})
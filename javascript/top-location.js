const prevPagination = $('#top-prev');
const nextPagination = $('#top-next');
let listImg = $$('.top-location__slider-img')
let imgCurrentIndex = 1;
let imgMaxVisible = 1;
const transitionDuration = 500;

//lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const topLocationId = urlParams.get('id');
let topLocation = null; // Khởi tạo topLocation toàn cục

//hàm tải và hiển thị dữ liệu
async function loadTopLocationData(id) {
    const sliderWrap = $('.top-location__slider-wrap');
    sliderWrap.classList.add('hidden');

    try {
        const response = await fetch('json/top-location.json');
        const topLocations = await response.json();
        const topLocation = topLocations.find(p => p.id == id);
        if (topLocation) {
            // cập nhận nội dung trang với dữ liệu sản phẩm
            updatePageContent(topLocation);
            // preloadImages(topLocation.images, () => {
                sliderWrap.innerHTML = '';
                topLocation.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.classList.add('top-location__slider-img');
                    img.alt = `Du lịch ${topLocation.name}`;
                    sliderWrap.appendChild(img);
                });
            // })

            // cập nhật lại listImg sau khi thêm ảnh
            listImg = $$('.top-location__slider-img');
            $('.imgs').textContent = topLocation.images.length;
            imgCurrentIndex = 1;
            cloneEdgeImages();
            renderImages();

            // Gọi displayService sau khi topLocation đã tải xong
            const recommendBtns = $$('.recommend__button');
            recommendBtns.forEach((btn) => {

            btn.addEventListener('click', () => {
                const activeBtn = $('.recommend__button.recommend__button--active');
                if (activeBtn) {
                    activeBtn.classList.remove('recommend__button--active');
                }
                btn.classList.add('recommend__button--active');
        
                // Lấy giá trị của thuộc tính data-category
                const category = btn.getAttribute('data-category');
        
                // Kiểm tra giá trị trong object mapping và gọi hàm tương ứng
                if (categoryMapping[category] && topLocation) {
                    displayServices(categoryMapping[category], '#top-location__services-list', service => {
                        return service.location === topLocation.location;
                    });
                }
                
            });
            displayServices('hotel', '#top-location__services-list', service => {
                return service.location === topLocation.location;
            });
    });
            
        }
    } catch (error) {
        console.error('Error loading hotel data:', error);
    }
};

// Hàm cập nhật nội dung trang
function updatePageContent(topLocation) {
    $('.location__name').textContent = topLocation.name;
    $('.header__breadcrumb-final').textContent = topLocation.location;
    $('.top-location__intro-title').textContent = topLocation.title;
    $('.top-location__intro-content').innerHTML = topLocation.content;
    $('.top-location__intro-map iframe').src = topLocation.mapSrc;
}

function renderImages() {
    if (listImg.length === 0) {
        console.error('listImg is empty.');
        return;
    }

    if (imgCurrentIndex < 0 || imgCurrentIndex >= listImg.length) {
        console.error('imgCurrentIndex is out of bounds:', imgCurrentIndex);
        return;
    }

    const imgElement = listImg[imgCurrentIndex];
    if (imgElement instanceof Element) {
        const imgStyles = getComputedStyle(imgElement);
        const imgMarginLeft = parseInt(imgStyles.marginLeft);
        const imgMarginRight = parseInt(imgStyles.marginRight);
        const imgWidthWithMargin = imgElement.offsetWidth + imgMarginLeft + imgMarginRight;
        const screenWidth = window.innerWidth;
        const translateX = -(imgCurrentIndex * imgWidthWithMargin) + (screenWidth / 2 - imgWidthWithMargin / 2) - imgMarginLeft ;
        $('.top-location__slider-wrap').style.transform = `translateX(${translateX}px)`;
        const realIndex = ((imgCurrentIndex - 1 + listImg.length - 2 ) % (listImg.length - 2)) + 1;
        $('.current-img').textContent = realIndex;
        $('.imgs').textContent = listImg.length - 2;

    } else {
        console.error('imgElement is not a valid DOM element:', imgElement);
    }
}

// Hàm sao chép ảnh đầu và ảnh cuối
function cloneEdgeImages() {
    if (listImg.length > 0) {
        const firstImg = listImg[0];
        const lastImg = listImg[listImg.length - 1];
    
        // sao chép ảnh cuối vào trước ảnh đầu
        const cloneLastImg = lastImg.cloneNode(true);
        $('.top-location__slider-wrap').insertBefore(cloneLastImg, firstImg);
    
        // sao chép ảnh đầu vào sau ảnh cuối
        const cloneFirstImg = firstImg.cloneNode(true);
        $('.top-location__slider-wrap').appendChild(cloneFirstImg);
    
        listImg = $$('.top-location__slider-img');

        imgCurrentIndex = 1;

    }
}

function nextTopBtn() {
    imgCurrentIndex++;
    renderImages();
    if (imgCurrentIndex === listImg.length - 1) {
        setTimeout(() => {
            $('.top-location__slider-wrap').style.transition = 'none';
            imgCurrentIndex = 1;
            renderImages();
            setTimeout(() => {
                $('.top-location__slider-wrap').style.transition = `transform ${transitionDuration}ms ease-in-out`;
            }, 20);
        }, transitionDuration);
    }
}

function prevTopBtn() {
    imgCurrentIndex--;
    renderImages();
    if (imgCurrentIndex === 0) {
        setTimeout(() => {
            $('.top-location__slider-wrap').style.transition = 'none';
            imgCurrentIndex = listImg.length - 2;
            renderImages();
            resetTransition();
        }, transitionDuration);
    }
}

// hàm đặt lại transition
function resetTransition() {
    setTimeout(() => {
        $('.top-location__slider-wrap').style.transition = `transform ${transitionDuration}ms ease-in-out`;
    }, 20);
}

// Event listener cho các nút điều hướng
nextPagination.addEventListener('click', nextTopBtn)
prevPagination.addEventListener('click', prevTopBtn)

// hàm gọi khi trang được tải
window.onload = () => {
    const defaulBtn = $('.recommend__button[data-category="1"]');
    defaulBtn.classList.add('recommend__button--active');

    if (topLocationId) {
        loadTopLocationData(topLocationId);
    } else {
        $('.top-location__name').textContent = "No location selected"
    }

    renderImages();
}

// hàm xử lý khi trang DOM content được tải
document.addEventListener('DOMContentLoaded', () => {
    cloneEdgeImages();
    loadTopLocationData(topLocationId); //Gọi loadTopLocationData với id từ URL
    displayNewsItems()
    // sectionNews(news)

   
})


window.addEventListener('resize', renderImages)
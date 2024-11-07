const interactShare = $('.info__review-interact-share');
const interactSocial = $('.info__review-interact-social');
const interactLikes = $$('.info__review-interact-like');
const tabs = $$('.booking__header-name');
const contents = $$('.booking__content');
const poinCurrents = $$('.poin-current');
const poinMaxs = $$('.poin-max');
let rulerCurrents = $$('.reviews__detail-ruler--current');
const rulerMaxs = $$('.reviews__detail-ruler--max');
const likeChecked = $$('.fa-solid.fa-thumbs-up.info__review-interact-like.checked');
let quantities = $$('.info__review-interact-quantity');
const reviewLikes = $$('.info__review-interact .info__review-like-wrap');
const cmtBtn = $('#comment-btn');
const cmtContainer = $('.info__comment-container');
const reviewStars = $$('.comment__form-review-stars');
const bookingSelects = $$('.booking__select');
const guestInput = $('#guest');
const guestQuantities = $$('.booking__guest-quantity');
const bookingGuest = $('.booking__guest');
const guestSelect = $('.booking__guest-select');


const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('id');

//Hàm để tải và hiển thị dữ liệu sản phẩm
async function loadHotelData(id) {
    const gallery = $('.gallery');
    const contentTextWrap = $('.info__content-text-wrap')
    const reviewStar = $('.info__review-star')

    try {
        const response = await fetch('json/hotel-location.json');
        const hotelLocations = await response.json();
        const hotelLocation = hotelLocations.find(h => h.id == id);
        if (hotelLocation) {
            gallery.innerHTML = "";
            contentTextWrap.innerHTML = "";
            reviewStar.innerHTML = "";

            //Cập nhật ảnh lớn đầu tiên gallery
            const firstImage = hotelLocation.images[0];
            const largeImage = document.createElement('img');
            largeImage.src = firstImage;
            largeImage.alt = `Khách sạn ${hotelLocation.name} tại ${hotelLocation.location}`;
            largeImage.classList.add('slider__img-hotel');

            const largeItemDiv = document.createElement('div');
            largeItemDiv.classList.add('gallery__item', 'large', 'col', 'l-4', 'm-4', 'c-0');
            largeItemDiv.appendChild(largeImage);
            gallery.append(largeItemDiv);
            // Cập nhật các ảnh nhỏ trong gallery
            const galleryWrapDiv = document.createElement('div');
            galleryWrapDiv.classList.add('gallery__item-wrap', 'col','l-8', 'm-8', 'c-12');

            hotelLocation.images.slice(1).forEach(imgSrc => {
                const smallImage = document.createElement('img');
                smallImage.src = imgSrc;
                smallImage.alt = `Khách sạn ${hotelLocation.name} tại ${hotelLocation.location}`;
                smallImage.classList.add('slider__img-hotel');
                
                const smallItemDiv = document.createElement('div');
                smallItemDiv.classList.add('gallery__item', 'small');
                smallItemDiv.appendChild(smallImage);

                galleryWrapDiv.appendChild(smallItemDiv);
            })
            gallery.append(galleryWrapDiv);

            hotelLocation.contents.forEach(content => {
                const p = document.createElement('p');
                p.textContent = content;
                p.classList.add('info__content-text');
                contentTextWrap.appendChild(p);
            })

            reviewStar.innerHTML =`
            ${'<i class="fa-solid fa-star info__review-level"></i>'.repeat(hotelLocation.stars)}
            `;

            // cập nhật nội dung trang với dữ liệu hotel
            updatePageContent(hotelLocation);

            // Gọi displayServices sau khi hotelLocation đã tải xong
            displayServices('hotel', '.hotel__others' , service => {
                return service.location === hotelLocation.location && service.name !== hotelLocation.name;
            });
        }
    } catch (error) {
        console.error('Error loading hotel data:', error);
    }
    
}

function updatePageContent(hotelLocation) {
    $('.location__name').textContent = hotelLocation.name;
    $('.header__breadcrumb-final').textContent = hotelLocation.location;
    $('.info__review-location').textContent = hotelLocation.location;
    $('.info__title').textContent = hotelLocation.title;
    $('.hotel__map iframe').src = hotelLocation.srcMap;
    $('.booking__cost span').textContent = hotelLocation.price;
}

// loadHotelData(hotelId);
//////////////////////////////

function updateGuestInput() {
    const guestNumber = $('.booking__guest-item:nth-child(1) .booking__guest-quantity-text').textContent;
    const roomNumber = $('.booking__guest-item:nth-child(2) .booking__guest-quantity-text').textContent;
    guestInput.value = `${guestNumber} khách, ${roomNumber} phòng`;
}

bookingSelects.forEach(select => {
    select.addEventListener('click', (event) => {
        event.stopPropagation();
        const input = select.querySelector('input');
        input.focus();
        if (select.classList.contains('booking__guest')) {
            guestSelect.classList.toggle('active');
        }
    })
})

guestQuantities.forEach(quantity => {
    const minus = quantity.querySelector('.booking__guest-quantity-adjust.minus');
    const plus = quantity.querySelector('.booking__guest-quantity-adjust.plus');
    const quantities = quantity.querySelector('.booking__guest-quantity-text');
    let quantitiesNumber = parseInt(quantities.textContent)
    minus.addEventListener('click', () => {
        if (quantitiesNumber > 1) {
            quantitiesNumber--
            quantities.textContent = quantitiesNumber;
            updateGuestInput();
        }
    })
    plus.addEventListener('click', () => {
        quantitiesNumber++
        quantities.textContent = quantitiesNumber;
        updateGuestInput();
    })
})

// hiển thị điểm đánh giá
function updateRulers() {
    rulerCurrents.forEach((rulerCurrent, index) => {
        rulerCurrent.style.left = rulerCurrent.offsetLeft + "px";
        const poin = parseFloat(poinCurrents[index].textContent);
        const poinMax = parseFloat(poinMaxs[index].textContent);
    
        let maxWidth = rulerMaxs[index].offsetWidth;
        let newWidth = (maxWidth * poin) / poinMax;
        rulerCurrent.style.width = newWidth + "px";
    })
}


// chuyển tab booking
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const contentToShow = $(`.booking__content[data-content="${tab.dataset.name}"]`);
        contentToShow.classList.add('active');
    })
})

// Hiển thị các social khi click vào share
interactShare.addEventListener('click', (e) => {
    e.stopPropagation();
    interactSocial.classList.toggle('visible')
});

interactSocial.addEventListener('click', (e) => {
    e.stopPropagation();
})

document.addEventListener('click', function(e) {
    if (!interactSocial.contains(e.target) && e.target !== interactShare) {
        interactSocial.classList.remove('visible')
    }

    if (!guestSelect.contains(e.target)) {
        guestSelect.classList.remove('active')
    }
})

guestSelect.addEventListener('click', (e) => {
    e.stopPropagation();
})

// Đổi màu like khi click
interactLikes.forEach(like => {
    like.addEventListener('click', () => {
        // tìm thẻ div cha của nút được click
        const parentDiv = like.closest('div');

        // tìm các phần tử có class trong thẻ div cha này
        const activeLike = parentDiv.querySelector('.info__review-interact-like.active');
        const hiddenLike = parentDiv.querySelector('.info__review-interact-like.hidden')
        if (activeLike) {
            activeLike.classList.remove('active');
            activeLike.classList.add('hidden');
        } 
        if (hiddenLike) {
            hiddenLike.classList.remove('hidden');
            hiddenLike.classList.add('active')
        }
    })
});

// đếm số like
reviewLikes.forEach((like, index) => {
    let clickCount = 0;
    like.addEventListener('click', (e) => {
        e.stopPropagation();
        let quantity = parseInt(quantities[index].textContent);

        clickCount++

        if(clickCount % 2 === 1) {
            quantities[index].textContent = quantity + 1;
        } else {
            quantities[index].textContent = quantity - 1;
        }
    })
})

// ẩn hiện dropdown
cmtBtn.addEventListener('click', () => {
    const cmtIcons = $$('.info__comment-icon')

    cmtIcons.forEach((cmtIcon) => {

        if (cmtIcon.classList.contains('active')) {
            cmtIcon.classList.remove('active');
            cmtIcon.classList.add('hidden');
        } else if (cmtIcon.classList.contains('hidden')) {
            cmtIcon.classList.remove('hidden');
            cmtIcon.classList.add('active');
        }
    })
    cmtContainer.classList.toggle('active')
})

// đánh giá
reviewStars.forEach(reviewStar => {
    const stars = reviewStar.querySelectorAll('.comment__form-review-star-icon');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('active'));
            star.classList.remove('active');     
            star.classList.add('active');                                                                                             
        })
    })
})
//////
// Gọi hàm
//////
updateRulers();
updateGuestInput();

window.addEventListener('DOMContentLoaded', () => {
    loadHotelData(hotelId);

    const hotelOthers = $$('.recommend__item');
    const paginationLeft = $('#pagination-left');
    const paginationRight = $('#pagination-right');
    const dotContainer = $('.dot-container');
    let currentIndex = 0;
    let maxVisible = getMaxVisible();
    function pagRight() {
        if (currentIndex + maxVisible < hotelOthers.length) {
            currentIndex++;
        }
        updateDisplay();
    }

    function pagLeft() {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateDisplay();
    }

    function createDots() {
        dotContainer.innerHTML = '';
        const totalDots = Math.max(0, hotelOthers.length - maxVisible);
        if (hotelOthers.length < maxVisible) {
            dotContainer.style.display = 'none';
        }

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

    function getMaxVisible() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            return 4;
        } else if (screenWidth >= 768) {
            return 3;
        } else 1
    }

    function updateDisplay() {
        hotelOthers.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + maxVisible) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        updateDots();
    }

    createDots();
    updateDots();
    updateDisplay();

    paginationLeft.addEventListener('click', pagLeft);
    paginationRight.addEventListener('click', pagRight);

});

window.addEventListener('resize', updateRulers);


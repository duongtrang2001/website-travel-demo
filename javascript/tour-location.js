// Biến toàn cục và cấu trúc dữ liệu
const interactShare = $('.tour__intro-interact-icon-share');
const interactSocial = $('.tour__intro-interact-social');
const interactFavorite = $('.tour__intro-interact-icon-wrap');
const questions = $$('.tour__faq-header');
const rulerDefaults = $$('.tour__review-level-line-default');
let rulerCurrents = $$('.tour__review-level-current');
const poinCurrents = $$('.tour__review-level-poin');
const bookingInfos = $$('.tour__aside-booking-wrap');
const guestQuantities = $$('.tour__aside-booking-quantity');
const moneyElements = $$('.money');

const urlParams = new URLSearchParams(window.location.search);
const tourId = parseInt(urlParams.get('id'));

async function loadTourLocationData(id) {
    try {
        const response = await fetch('json/tour-location.json');
        const tourLocations = await response.json();
        const tourLocation = tourLocations.find(t => t.id == id);

        if (tourLocation) {
            updatePageContent(tourLocation);
        } else {
            console.error('Không tìm thấy tour với ID:', id);
        }
    } catch (error) {
        console.error('Error loading tour data:', error);
    }
}

function updatePageContent(tourLocation) {
    $('.location__name').textContent = tourLocation.name;
    $('.header__breadcrumb-final').textContent = tourLocation.location;
    $('.tour__intro-review-location').textContent = tourLocation.location;
    $('.tour__intro-item-info.time').textContent = tourLocation.time;
    $('.tour__intro-item-info.type').textContent = tourLocation.typeTour;
    $('.tour__intro-item-info.group').textContent = tourLocation.group;
    $('.tour__intro-item-info.language').textContent = tourLocation.language;
    $('.tour__content').textContent = tourLocation.tourIntro;
    $('.tour__location-map iframe').src = tourLocation.tourMap;
    $('.adults .money').textContent = tourLocation.adultFare;
    $('.children .money').textContent = tourLocation.childFare;
    const tourImgs = $('.tour__imgs .row');
    // // cập nhật ảnh large
    const firstImage = tourLocation.images[0];
    const largeImageContainer = document.createElement('div');
    largeImageContainer.classList.add('col', 'l-4', 'm-4', 'c-0');

    const largeImage = document.createElement('img');
    largeImage.src = firstImage;
    largeImage.alt = tourLocation.name;
    largeImage.classList.add('tour__img-large');

    largeImageContainer.appendChild(largeImage);
    tourImgs.appendChild(largeImageContainer);

    // cập nhật ảnh small
    const smallImagesContainer = document.createElement('div');
    smallImagesContainer.classList.add('tour__imgs-wrap', 'col', 'l-8', 'm-8', 'c-12');

    tourLocation.images.slice(1).forEach(imgSrc => {
        const smallImage = document.createElement('img');
        smallImage.src = imgSrc;
        smallImage.alt = tourLocation.name;
        smallImage.classList.add('tour__img-small');
        smallImagesContainer.appendChild(smallImage);

    });
    tourImgs.appendChild(smallImagesContainer);

    // Cập nhật tour hightlights
    const tourHighlightsContainer = $('.tour__highlights');
    tourHighlightsContainer.innerHTML = '';

    tourLocation.tourHighlights.forEach(highlight => {
        const highlightWrapper = document.createElement('div');
        highlightWrapper.classList.add('tour__content-wrap');

        highlightWrapper.innerHTML = `
            <span class="material-symbols-outlined content-icon content-icon-check">
                check
            </span>
            <p class="tour__content-text">
                ${highlight}
            </p>
        `;
        tourHighlightsContainer.appendChild(highlightWrapper);
    });

    // Cập nhật tour include và notInclude
    const tourIncluded = $('.tour__utilities-included');
    const tourNotIncluded = $('.tour__utilities-excluded');
    tourIncluded.innerHTML = '';
    tourNotIncluded.innerHTML = '';

    tourLocation.tourIncludes.forEach(tourInclude => {
        const tourIncludeWrap = document.createElement('div');
        tourIncludeWrap.classList.add('tour__content-wrap');
        tourIncludeWrap.innerHTML = `
            <span class="material-symbols-outlined content-icon content-icon-check">
                check
            </span>
            <p class="tour__content-text">
                ${tourInclude}
            </p>
        `;
        tourIncluded.appendChild(tourIncludeWrap);
    });

    tourLocation.tourNotIncluded.forEach(tourNotInclude => {
        const tourNotIncludeWrap = document.createElement('div');
        tourNotIncludeWrap.classList.add('tour__content-wrap');

        tourNotIncludeWrap.innerHTML = `
            <span class="material-symbols-outlined content-icon content-icon-remove">
                close
                </span>
            <p class="tour__content-text">
                ${tourNotInclude}
            </p>
        `;
        tourNotIncluded.appendChild(tourNotIncludeWrap);
    });
    // Cập nhật schedule
    const itineraryContainer = $('.tour__itinerary-wrap');
    itineraryContainer.innerHTML = '';
    tourLocation.tourSchedule.forEach(schedule => {
        const dayElement = document.createElement('div');
        dayElement.className = 'tour__itinerary-container';
        dayElement.innerHTML = `
            <div class="tour__itinerary-day">
                <span class="material-symbols-outlined tour__itinerary-day-icon">
                    today
                </span>
                ${schedule.day}
            </div>
            <div class="tour__itinerary-list"></div>
            `;
        const listContainer = dayElement.querySelector('.tour__itinerary-list');

        schedule.schedule.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'tour__itinerary-item';
            itemElement.innerHTML = `
                <span class="material-symbols-outlined tour__itinerary-item-icon">
                    ${item.icon}
                </span>
                <div class="tour__itinerary-item-wrap">
                    <span class="tour__itinerary-item-time">${item.time}</span>
                    <h4 class="tour__itinerary-item-title">${item.title}</h4>
                    <p class="tour__itinerary-item-text">${item.description}</p>
                </div>
                `;
            listContainer.appendChild(itemElement);
        });

        itineraryContainer.appendChild(dayElement);
    });

    const lengthTourSchedule = tourLocation.tourSchedule.length;
    if (lengthTourSchedule === 1) {
        $('.tour__itinerary-wrap').style.justifyContent = 'center'
        const tourContainer = $('.tour__itinerary-container');
        tourContainer.style.marginRight = '0';
        tourContainer.style.width = '80%'
    }

    // cập nhật giá min
    updatePriceFrom();
    // cập nhật tổng price
    updateTotalPrice();
};


// Hàm chính, các hàm quan trọng
function showAnswer(question) {
    const answerWrap = question.nextElementSibling;
    const isOpen = question.classList.contains('active');


    if (isOpen) {
        answerWrap.style.maxHeight = '0';
        question.classList.remove('active');

    } else {
        answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
        question.classList.add('active');
    }

}

function updateRulers() {
    let sumReviews = 0;

    poinCurrents.forEach(poinCurrent => {
        sumReviews += parseFloat(poinCurrent.textContent);
    });

    rulerCurrents.forEach((rulerCurrent, index) => {
        rulerCurrent.style.left = rulerCurrent.offsetLeft + 'px';
        const poin = parseFloat(poinCurrents[index].textContent);

        let maxWidth = rulerDefaults[index].offsetWidth;
        let newWidth = (maxWidth * poin) / sumReviews
        rulerCurrent.style.width = newWidth + 'px';
    })
}

function updateAdultsInput() {
    const adultsNumber = $$('.tour__aside-booking-ticket .tour__aside-booking-quantity-number')[0].textContent;
    const adults = $('#adults');
    adults.value = `${adultsNumber} khách`;
}

function updateChildrenInput() {
    const childNumber = $$('.tour__aside-booking-ticket .tour__aside-booking-quantity-number')[1].textContent;
    const children = $('#children');
    children.value = `${childNumber} khách`;
}

function updateTotalPrice() {
    const adultsNumber = parseInt($$('.tour__aside-booking-ticket .tour__aside-booking-quantity-number')[0].textContent);
    const childNumber = parseInt($$('.tour__aside-booking-ticket .tour__aside-booking-quantity-number')[1].textContent);
    const priceAdultText = $('.tour__aside-booking-info-price.adults .money').textContent;
    const priceChildText = $('.tour__aside-booking-info-price.children .money').textContent;

    const priceAdult = parseFloat(priceAdultText.replace(/\./g, '').replace(/,/g, '.'));
    const priceChild = parseFloat(priceChildText.replace(/\./g, '').replace(/,/g, '.'));

    let totalPrice = $('.tour__booking-total-price .money');
    let calculatedTotal = 0;
    calculatedTotal = (adultsNumber * priceAdult) + (childNumber * priceChild)
    totalPrice.textContent = calculatedTotal.toLocaleString('vi-VN');
}

function updatePriceFrom() {
    const priceAdultText = $('.tour__aside-booking-info-price.adults .money').textContent;
    const priceChildText = $('.tour__aside-booking-info-price.children .money').textContent;

    const priceAdult = parseFloat(priceAdultText.replace(/\./g, '').replace(/,/g, '.'));
    const priceChild = parseFloat(priceChildText.replace(/\./g, '').replace(/,/g, '.'));
    const priceFromText = $('.tour__aside-price span');
    let priceFrom = 0;

    if (priceAdult > priceChild) {
        priceFrom = priceChild.toLocaleString('vi-VN');
        priceFromText.textContent = priceFrom;
    } else {
        priceFrom = priceAdult.toLocaleString('vi-VN');
        priceFrom.textContent = priceFrom;
    }
}



window.addEventListener('scroll', () => {
    // const containerWrap = $('.tour__container-wrap');
    const tourItinerary = $('.tour__itinerary');
    const tourAside = $('.tour__aside');
    const headerNavbar = $('.header__navbar');
    
    if (tourItinerary && tourAside && headerNavbar) {
        const tourAsideTop = tourAside.getBoundingClientRect().top;
        const tourItineraryBottom = tourItinerary.getBoundingClientRect().bottom;
        const headerNavbarHeight = getComputedStyle(headerNavbar).getPropertyValue("--header-nav-height");
        
        if (tourAsideTop < headerNavbarHeight) {
            tourAside.classList.add('fixed');

        } else {
            tourAside.classList.remove('fixed');
        }
    }
});
// Hàm phụ trợ
moneyElements.forEach(moneyElement => {
    const moneyValue = parseFloat(moneyElement.textContent);
    const formattedMoney = moneyValue.toLocaleString('vi-VN');
    moneyElement.textContent = formattedMoney;
});

questions.forEach(question => {
    question.addEventListener('click', () => {
        showAnswer(question);
    })
})

bookingInfos.forEach(bookingInfo => {
    bookingInfo.addEventListener('click', (event) => {
        event.stopPropagation();
        const input = bookingInfo.querySelector('input');
        input.focus();
    })
})

guestQuantities.forEach((quantity, index) => {
    const minus = quantity.querySelector('.tour__aside-booking-quantity-icon.minus');
    const plus = quantity.querySelector('.tour__aside-booking-quantity-icon.plus');
    const quantities = quantity.querySelector('.tour__aside-booking-quantity-number')
    let quantitiesNumber = parseInt(quantities.textContent);
    minus.addEventListener('click', () => {
        if (quantitiesNumber > 0) {
            quantitiesNumber--;
            quantities.textContent = quantitiesNumber;
            if (index === 0) {
                updateAdultsInput();
                updateTotalPrice();

            } else if (index === 1) {
                updateChildrenInput();
                updateTotalPrice();
            }
        }
    })
    plus.addEventListener('click', () => {
        quantitiesNumber++;
        quantities.textContent = quantitiesNumber;
        if (index === 0) {
            updateAdultsInput();
            updateTotalPrice();
        } else if (index === 1) {
            updateChildrenInput();
            updateTotalPrice();
        }
    })
})

// Xử lý sự kiện
interactShare.addEventListener('click', (e) => {
    e.stopPropagation();
    interactSocial.classList.toggle('visible');
})

interactSocial.addEventListener('click', (e) => {
    e.stopPropagation();
})

document.addEventListener('click', (e) => {
    if (!interactSocial.contains(e.target) && e.target !== interactShare) {
        interactSocial.classList.remove('visible')
    }
})

interactFavorite.addEventListener('click', () => {

    const favoriteIcons = $$('.tour__intro-interact-icon-favorite');
    favoriteIcons.forEach(icon => {
        icon.classList.toggle('hidden')
    })
})

// Gọi hàm
updateRulers()
updateTotalPrice();
updatePriceFrom();

window.addEventListener('DOMContentLoaded', () => {
    loadTourLocationData(tourId);
})

window.addEventListener('resize', updateRulers);

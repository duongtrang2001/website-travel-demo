const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

async function loadContent(file, elementId) {
    try {
        const response = await fetch(file);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
        if (elementId === 'header-placeholder') {
            const pageType = document.documentElement.getAttribute('data-page');
            loadHeaderContent(pageType);
            initFormEvents(); // gọi hàm khởi tạo sự kiện
            headerNavigation(pageType);
            headerSearchInput();
        }
    } catch (error) {
        console.error('Error loading file', error);
    }
}

function loadHeaderContent(pageType) {
    fetch('json/header.json')
        .then(response => response.json())
        .then(data => {
            const headerImg = document.querySelector('.header__img-background');
            const headerContent = document.querySelector('.header__content');
            const headerSearchInput = document.querySelector('.header__search-form');
            const locationHeader = document.querySelector('.location__header');

            headerImg.style.display = 'none';
            headerContent.style.display = 'none';
            headerSearchInput.style.display = 'none';
            locationHeader.style.display = 'none';
            

            headerImg.innerHTML = '';
            headerContent.innerHTML = '';
            if (data[pageType]) {

                headerImg.innerHTML = `
                <img src="${data[pageType].image}" alt="${data[pageType].alt}"
        class="header__img">
                `;
                headerContent.innerHTML = `
                <h2 class="header__text">${data[pageType].text}</h2>
            <span class="header__sub-text">${data[pageType].subText}</span>
                `;

                if (pageType === 'index' || pageType === 'hotel') {
                    headerImg.style.display = 'block';
                    headerContent.style.display = 'flex';
                    headerSearchInput.style.display = 'flex';
                } else if (pageType === 'tour') {
                    $('.header__search').classList.add('header__search-input-tour');
                    headerImg.style.display = 'block';
                    headerContent.style.display = 'flex';
                    headerSearchInput.style.display = 'flex';
                } else if (pageType === 'topLocation' || pageType === 'hotelLocation' || pageType === 'tourLocation' || pageType === 'article') {;
                    headerImg.style.display = 'block';
                    locationHeader.style.display = 'block';
                    locationHeader.innerHTML = `
                        <h2 class="location__name">Location</h2>
                        <ul class="header__breadcrumb">
                            <li><a href="../html/index.html" class="header__breadcrumb-link">Trang chủ</a></li>
                            <li><a href="${data[pageType].locationHref}" class="header__breadcrumb-link">${data[pageType].locationBreadcrumbName}</a></li>
                            <li class="header__breadcrumb-final">Đà Nẵng</li>
                        </ul>
                    `;

                    if (pageType === 'article') {
                        locationHeader.classList.add('location__header-article')
                    }
                } else if (pageType === 'blog' || pageType === 'contact' || pageType === 'article') {
                    document.querySelector('.header__img-background').style.display = 'none';
                }

            }

        })
        .catch(error => console.error('Error loading JSON', error));
}

// Đóng mở form đăng ký, đăng nhập
function initFormEvents() {
    const formNames = $$('.auth-form__header-name');
    const formBodys = $$('.auth-form__body');
    const passwordInputs = $$('.auth-form__body-input.password-input')
    const showPasswordIcons = $$('.show-password-icon');
    const hidePasswordIcons = $$('.hide-password-icon');
    const formOverlay = $('.form-overlay');
    const closeFormIcon = $('#auth-form__header-icon');
    const authForm = $('.auth-form')
    const openLogin = $('#open-login');
    const openRegister = $('#open-register');
    const formLogin = $('.form-login');
    const formRegister = $('.form-register');
    const loginHeader = $$('.auth-form__header-name')[0];
    const registerHeader = $$('.auth-form__header-name')[1];
    const navBtnTM = $('#navbar__btn-tm');
    const navMenuBtnM = $('.navbar__menu-mobile-btn');
    const navMenuCloseM = $('.navbar__menu--close');
    const navMenuOverlayM = $('.navbar__menu-overlay');
    const navMenuContentM = $('.navbar__menu-mobile-text');
    const navMenuLinksM = $$('.navbar__menu-mobile-link');

    // chuyển giữ đăng ký và đăng nhập
    function showLoginForm() {
        formLogin.classList.add('auth-form__body--active');
        formRegister.classList.remove('auth-form__body--active');
        formOverlay.classList.add('active');
        formOverlay.style.display = 'flex';
        authForm.classList.remove('hide');

        loginHeader.classList.add('auth-form__header-name--active');
        registerHeader.classList.remove('auth-form__header-name--active');
    }

    function showRegisterForm() {
        formLogin.classList.remove('auth-form__body--active');
        formRegister.classList.add('auth-form__body--active');
        formOverlay.classList.add('active');
        formOverlay.style.display = 'flex';
        authForm.classList.remove('hide');

        loginHeader.classList.remove('auth-form__header-name--active');
        registerHeader.classList.add('auth-form__header-name--active');
    }

    formNames.forEach((formName, index) => {
        const formBody = formBodys[index];
        formName.addEventListener('click', () => {
            $('.auth-form__header-name.auth-form__header-name--active').classList.remove('auth-form__header-name--active');
            formName.classList.add('auth-form__header-name--active');

            $('.auth-form__body.auth-form__body--active').classList.remove('auth-form__body--active');
            formBody.classList.add('auth-form__body--active');

        })
    })

    openLogin.addEventListener('click', showLoginForm);
    openRegister.addEventListener('click', showRegisterForm);


    navBtnTM.addEventListener('click', () => {
        formOverlay.classList.add('active');
        formOverlay.style.display = 'flex';
        authForm.classList.remove('hide');
    })

    // ẩn hiện password
    showPasswordIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            passwordInputs[index].type = 'password';
            showPasswordIcons[index].classList.add('input-password--hidden');
            hidePasswordIcons[index].classList.remove('input-password--hidden');
        })
    })

    hidePasswordIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            passwordInputs[index].type = 'text';
            hidePasswordIcons[index].classList.add('input-password--hidden');
            showPasswordIcons[index].classList.remove('input-password--hidden');
        })
    })

    // close - open form 
    function hideForm() {
        authForm.classList.add('hide');
        setTimeout(() => {
            formOverlay.style.display = 'none';
        }, 250)
    };

    closeFormIcon.addEventListener('click', hideForm);
    formOverlay.addEventListener('click', function (e) {
        if (e.target === formOverlay) hideForm();
    });

    // close - open menu on mobile
    function hideMenu() {
        navMenuContentM.classList.add('hide');
        setTimeout(() => {
            navMenuOverlayM.style.display = 'none'
        }, 250)
    }

    navMenuCloseM.addEventListener('click', hideMenu);
    navMenuOverlayM.addEventListener('click', function (e) {
        if (e.target === navMenuOverlayM) hideMenu();
    });

    navMenuBtnM.addEventListener('click', () => {
        navMenuOverlayM.style.display = 'block';
        navMenuContentM.classList.remove('hide');
    })

    navMenuLinksM.forEach((navMenuLinkM, index) => {
        navMenuLinkM.onclick = function () {
            $('.navbar__menu-mobile-link.navbar__menu-link--active').classList.remove('navbar__menu-link--active')
            this.classList.add('navbar__menu-link--active');
        }
    })
}

function headerNavigation(pageType) {
    $('.navbar__menu-item.navbar__menu-item--active').classList.remove('navbar__menu-item--active');
    $('.navbar__menu-mobile-link.navbar__menu-link--active').classList.remove('navbar__menu-link--active');
    const menuItems = $$('.navbar__menu-item');
    const menuItemActive = $('.navbar__menu-item--active');
    const line = $('.navbar__menu-item-line');
    if (menuItemActive) {
        line.style.left = menuItemActive.offsetLeft + 'px';
        line.style.width = menuItemActive.offsetWidth + 'px';
    }

    if (pageType === "index" || pageType === "topLocation") {
        const navbarItemChecked = $('.navbar__menu-item[data-pagination="1"]');
        navbarItemChecked.classList.add('navbar__menu-item--active');

        const navbarItemMobileChecked = $('.navbar__menu-mobile-link[data-pagination="1"]');
        navbarItemMobileChecked.classList.add('navbar__menu-link--active');
    } else if (pageType === "hotel" || pageType === "hotelLocation") {
        const navbarItemChecked = $('.navbar__menu-item[data-pagination="2"]');
        navbarItemChecked.classList.add('navbar__menu-item--active');

        const navbarItemMobileChecked = $('.navbar__menu-mobile-link[data-pagination="2"]');
        navbarItemMobileChecked.classList.add('navbar__menu-link--active');
    } else if (pageType === "tour" || pageType === "tourLocation") {
        const navbarItemChecked = $('.navbar__menu-item[data-pagination="3"]');
        navbarItemChecked.classList.add('navbar__menu-item--active');

        const navbarItemMobileChecked = $('.navbar__menu-mobile-link[data-pagination="3"]');
        navbarItemMobileChecked.classList.add('navbar__menu-link--active');
    } else if (pageType === "blog" || pageType === "article") {
        const navbarItemChecked = $('.navbar__menu-item[data-pagination="4"]');
        navbarItemChecked.classList.add('navbar__menu-item--active');

        const navbarItemMobileChecked = $('.navbar__menu-mobile-link[data-pagination="4"]');
        navbarItemMobileChecked.classList.add('navbar__menu-link--active');
    } else if (pageType === "contact") {
        const navbarItemChecked = $('.navbar__menu-item[data-pagination="5"]');
        navbarItemChecked.classList.add('navbar__menu-item--active');

        const navbarItemMobileChecked = $('.navbar__menu-mobile-link[data-pagination="5"]');
        navbarItemMobileChecked.classList.add('navbar__menu-link--active');
    }
    menuItems.forEach(item => {
        if (item.classList.contains('navbar__menu-item--active')) {
            line.style.left = item.offsetLeft + 'px';
            line.style.width = item.offsetWidth + 'px';
        }
    })
}

function headerSearchInput() {
    const headerSearchItems = $$('.header__search-form-item');
    headerSearchItems.forEach(item => {
        if (item.classList.contains('header__search-form-item-date')) {
            const headerSearchItemDates = item.querySelectorAll('.header__search-form-item-wrap');
            headerSearchItemDates.forEach(date => {
                date.addEventListener('click', () => {
                    const headerSearchDateInput = date.querySelector('.header__search-item-content input');
                    headerSearchDateInput.focus();
                })
            })
        } else {
            item.addEventListener('click', () => {
                const headerSearchItemInput = item.querySelector('.header__search-item-content input');
                headerSearchItemInput.focus();
            })
        }
    })

}

// tải nội dung cho page từ file header và footer
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent('header.html', 'header-placeholder')
    await loadContent('footer.html', 'footer-placeholder');

    if (document.documentElement.getAttribute('data-page') === 'hotelLocation') {
        loadHotelData(hotelId);
    } else if (document.documentElement.getAttribute('data-page') === 'topLocation') {
        loadTopLocationData(topLocationId);
    } else if (document.documentElement.getAttribute('data-page') === 'tourLocation') {
        loadTourLocationData(tourId);
    } else if (document.documentElement.getAttribute('data-page') === 'article') {
        loadArticleData(articleId);
    }


    flatpickr(".selector", {
        dateFormat: "d-m-Y",
        minDate: "today",
        disableMobile: true,

        position: "below",
        allowInput: true,
        onOpen: function () {
            const calendar = $('.flatpickr-calendar');
            const input = $('.selector');

            // Tính toán khoảng cách từ ô input đến mép dưới của màn hình
            const inputRect = input.getBoundingClientRect();
            const spaceBelow = window.innerHeight - inputRect.bottom;

            const calendarHeight = 310;

            if (spaceBelow < calendarHeight) {
                const scrollAmount = calendarHeight - spaceBelow;

                //cuộn trang lên để hiển thị đầy đủ lịch
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
                calendar.style.top = `${inputRect.bottom + window.scrollY}px`;
            } else {
                calendar.style.top = `${inputRect.bottom + window.scrollY}px`;
            }
        }
    });
});


window.addEventListener('reset', headerNavigation)
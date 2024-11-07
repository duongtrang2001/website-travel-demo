const recommendBtns = document.querySelectorAll('.recommend__button');
const recommendBtnLikes = document.querySelectorAll('.recommend__item-like');

const services = {
    hotel: [
        {
            name: "Diamond",
            imgSrc: "assits/img/hotel/Diamond hotel.jpg",
            alt: "Diamond",
            discount: "-10%",
            liked: false,
            stars: 5,
            location: "Đà Nẵng",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "750.000 VND",
            locationHref: "hotel-location.html?id=1"
        },

        {
            name: "Emerald Bay",
            imgSrc: "assits/img/hotel/Emerald Bay hotel.jpg",
            alt: "Emerald Bay",
            discount: "",
            liked: false,
            stars: 5,
            location: "Vịnh Hạ Long",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "1.700.000 VND",
            locationHref: "hotel-location.html?id=2"
        },

        {
            name: "Garden",
            imgSrc: "assits/img/hotel/Garden hotel.jpeg",
            alt: "Garden",
            discount: "",
            liked: false,
            stars: 5,
            location: "Nha Trang",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "2.000.000 VND",
            locationHref: "hotel-location.html?id=3"
        },

        {
            name: "Grand Sapphire",
            imgSrc: "assits/img/hotel/Grand Sapphire hotel.jpg",
            alt: "Grand Sapphire",
            discount: "",
            liked: false,
            stars: 4,
            location: "Hội An",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "800.000 VND",
            locationHref: "hotel-location.html?id=4"
        },

        {
            name: "Ruby",
            imgSrc: "assits/img/hotel/Ruby hotel.jpg",
            alt: "Ruby",
            discount: "",
            liked: false,
            stars: 4,
            location: "Nha Trang",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "1.300.000 VND",
            locationHref: "hotel-location.html?id=5"
        },

        {
            name: "The Muse",
            imgSrc: "assits/img/hotel/The Muse hotel.jpeg",
            alt: "The Muse",
            discount: "",
            liked: false,
            stars: 5,
            location: "Đà Nẵng",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "1.500.000 VND",
            locationHref: "hotel-location.html?id=6"
        },

        {
            name: "The Onyx",
            imgSrc: "assits/img/hotel/The Onyx hotel.jpeg",
            alt: "The Onyx",
            discount: "",
            liked: false,
            stars: 5,
            location: "Phú Quốc",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "1.500.000 VND",
            locationHref: "hotel-location.html?id=7"
        },

        {
            name: "The Royal Orchid",
            imgSrc: "assits/img/hotel/The Royal Orchid hotel.jpg",
            alt: "The Royal Orchid",
            discount: "",
            liked: false,
            stars: 5,
            location: "Phú Quốc",
            rate: {
                score: "5/5",
                text: "Rất tốt",
                views: "10 đánh giá"
            },
            price: "1.500.000 VND",
            locationHref: "hotel-location.html?id=8"
        },

    ],

    tour: [
        {
            name: "1 ngày",
            imgSrc: "assits/img/tour/du lich Vinh Ha Long.png",
            alt: "1 ngày",
            discount: "",
            liked: false,
            location: "Vịnh Hạ Long",
            rate: {
                text: "5",
                views: "16 đánh giá"
            },
            cost: {
                price: "900.000 đồng",
                time: "24 giờ"
            },
            locationHref: "tour-location.html?id=1"
        },
        {
            name: "Tour 2 ngày 1 đêm",
            imgSrc: "assits/img/tour/du lich Da Nang.jpg",
            alt: "Tour 2 ngày 1 đêm",
            discount: "",
            liked: false,
            location: "Đà Nẵng",
            rate: {
                text: "5",
                views: "16 đánh giá"
            },
            cost: {
                price: "1.500.000 đồng",
                time: "32 giờ"
            },
            locationHref: "tour-location.html?id=2"
        },
        {
            name: "1 ngày",
            imgSrc: "assits/img/tour/du lich Hoi An.png",
            alt: "1 ngày",
            discount: "",
            liked: false,
            location: "Hội An",
            rate: {
                text: "5",
                views: "16 đánh giá"
            },
            cost: {
                price: "800.000 đồng",
                time: "24 giờ"
            },
            locationHref: "tour-location.html?id=3"
        },
        {
            name: "Tour 2 ngày 1 đêm",
            imgSrc: "assits/img/tour/du lich Nha Trang.jpg",
            alt: "Tour 2 ngày 1 đêm",
            discount: "",
            liked: false,
            location: "Nha Trang",
            rate: {
                text: "5",
                views: "16 đánh giá"
            },
            cost: {
                price: "1.500.000 đồng",
                time: "32 giờ"
            },
            locationHref: "tour-location.html?id=4"
        },
        {
            name: "Tour 2 ngày 1 đêm",
            imgSrc: "assits/img/tour/du lich Phu Quoc.jpg",
            alt: "Tour 2 ngày 1 đêm",
            discount: "",
            liked: false,
            location: "Phú Quốc",
            rate: {
                text: "5",
                views: "16 đánh giá"
            },
            cost: {
                price: "3.000.000 đồng",
                time: "32 giờ"
            },
            locationHref: "tour-location.html?id=5"
        },
    ]
};

const categoryMapping = {
    '1': 'hotel',
    '2': 'tour'
};

function displayServices(category, selector, filterFn) {
    const servicesList = $(selector);
    servicesList.innerHTML = '';

    // kiểm tra nếu danh mục tồn tại trong services
    if (services[category]) {
        services[category]
            .filter(service => (filterFn ? filterFn(service) : true))
            .forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'recommend__item col l-3 m-6 c-6 recommend__' + category;

            // Tạo nội dung HTML khác nhau dựa trên từng danh mục
            if (category === 'hotel') {
                // Tạo nội dung cho danh mục hotel
                serviceItem.innerHTML = `
                    <div class="recommend__item-wrap">
                        <div class="recommend__item-img">
                            <a href="${service.locationHref}" class="recommend__item-img-link">
                                <img src="${service.imgSrc}" alt="${service.alt}">   
                            </a>
                            <div class="recommend__item-discount ${service.discount ? 'recommend__item-discount--active' : ''}">${service.discount}</div>
                            <i class="fa-solid fa-heart recommend__item-like ${service.liked ? 'recommend__item-like--active' : ''}"></i>
                        </div>
                        <div class="recommend__item-info">
                            <div class="recommend__item-level">
                                ${'<i class="fa-solid fa-star recommend__item-level-icon"></i>'.repeat(service.stars)}
                            </div>
                            <div class="recommend__item-name recommend__hotel-name">${service.name}</div>
                            <div class="recommend__item-location">
                                <span class="material-symbols-outlined recommend__item-location-icon">
                                    location_on
                                </span>
                                ${service.location}
                            </div>
                            <div class="recommend__item-rate">
                                <span class="recommend__item-rate-score">${service.rate.score}</span>
                                <span class="recommend__item-rate-text">${service.rate.text}</span>
                                <div class="recommend__item-rate-views">(${service.rate.views})</div>
                            </div>
                            <div class="recommend__item-price"> Giá từ: <span>${service.price}</span> /đêm</div>
                        </div>

                    </div>
                `;
            } else if (category === "tour") {
                // tạo nội dung cho danh mục tour
                serviceItem.innerHTML = `
                    <div class="recommend__item-wrap">
                        <div class="recommend__item-img">
                            <a href="${service.locationHref}" class="recommend__item-img">
                                <img src="${service.imgSrc}" alt="${service.alt}">   
                            </a>
                            <div class="recommend__item-discount ${service.discount ? 'recommend__item-discount--active' : ''}">${service.discount}</div>
                            <i class="fa-solid fa-heart recommend__item-like ${service.liked ? 'recommend__item-like--active' : ''}"></i>
                        </div>
                        <div class="recommend__item-info">
                            <div class="recommend__item-location">
                                <span class="material-symbols-outlined recommend__item-location-icon">
                                    location_on
                                </span>
                                ${service.location}
                            </div>
                            <div class="recommend__item-name recommend__tour-name">${service.name}</div>
                            <div class="recommend__item-rate recommend__tour-rate">
                                <i class="fa-solid fa-star recommend__item-level-icon"></i>
                                <span class="recommend__item-rate-text recommend__tour-rate-text">${service.rate.text}</span>
                                <div class="recommend__item-rate-views">(${service.rate.views})</div>
                            </div>
                            <div class="recommend__tour-cost">
                                <div class="recommend__tour-price">${service.cost.price}</div>
                                <div class="recommend__tour-time">
                                    <span class="material-symbols-outlined recommend__tour-time-icon">
                                        schedule
                                    </span>
                                    ${service.cost.time}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            servicesList.appendChild(serviceItem);
        });

        // thêm sự kiện lắng nghe cho icon like
        const likeIcons = $$('.recommend__item-like');
        likeIcons.forEach((icon, index) => {
            icon.addEventListener('click', function() {
                services[category][index].liked = !services[category][index].liked;

                this.classList.toggle('recommend__item-like--active');
            });
        });
    } else {
        console.log('Danh mục không tồn tại!');
    }
}

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
        if (categoryMapping[category]) {
            displayServices(categoryMapping[category], '#recommend__list');
        }
        
    });
});

window.onload = () => {
    const defaulBtn = $('.recommend__button[data-category="1"]');
    defaulBtn.classList.add('recommend__button--active');
    displayServices('hotel', '#recommend__list');
}



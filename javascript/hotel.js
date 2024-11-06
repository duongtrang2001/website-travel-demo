import * as shared from './shared.js';
const items = [
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Ha-Noi.jpg",
        alt: "Hà Nội",
        name: "Hà Nội",
        text: "7 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Ha-Long.jpg",
        alt: "Hạ Long",
        name: "Hạ Long",
        text: "5 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Sapa.jpg",
        alt: "Sapa",
        name: "Sapa",
        text: "5 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Ninh-Binh.jpg",
        alt: "Ninh Bình",
        name: "Ninh Bình",
        text: "8 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Hue.jpg",
        alt: "Huế",
        name: "Huế",
        text: "6 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Da-Nang.jpg",
        alt: "Đà Nẵng",
        name: "Đà Nẵng",
        text: "10 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Hoi-An.png",
        alt: "Hội An",
        name: "Hội An",
        text: "4 Khách sạn"
    },
    {
        imgSrc: "/assits/img/hotel-page/top-destinations/Ho-Chi-Minh.jpg",
        alt: "Hồ Chí Minh",
        name: "Hồ Chí Minh",
        text: "12 Khách sạn"
    },
];



document.addEventListener('DOMContentLoaded', () => {

    shared.initPage({
        items: items,
        itemsContainerSelector: '.items-container',
        dotContainerSelector: '.dot-container',
        prevBtnSelector: '#top-prev',
        nextBtnSelector: '#top-next'
    });

    displayServices('hotel', '#recommend__list-all');
    displayServices('hotel', '#recommend__list-filtered', service => {
        return service.rate.score === '4/5' || service.rate.score === '5/5';
    })

    const recommendList = $('.hotel-recommend__list');
    setTimeout(() => {
        const recommendItem = recommendList.querySelectorAll('.recommend__item');

        let itemCurrent = 0;
        const itemMaxShow = getItemMaxShow();
        const prevBtn = $('#prev-btn');
        const nextBtn = $('#next-btn');
        
        function navigationRight() {
            if (itemCurrent + itemMaxShow < recommendItem.length) {
                itemCurrent++;
            } else {
                itemCurrent = 0;
            }
            updateRecommendListPosition();
        }
        
        function navigationLeft() {
            if (itemCurrent > 0) {
                itemCurrent--
            } else {
                itemCurrent = recommendItem.length - itemMaxShow;
            }
            updateRecommendListPosition();
        }

        function updateRecommendListPosition() {
            const offset = -itemCurrent * (100 / itemMaxShow);
            recommendList.style.transform = `translateX(${offset}%)`;
        }
        
        function getItemMaxShow() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1024) {
                return 4;
            } else if (screenWidth >= 768) {
                return 2;
            } else {
                return 2;
            }
        }
        
        prevBtn.addEventListener('click', navigationLeft);
        nextBtn.addEventListener('click', navigationRight);
    }, 0);



    addLikeEventListeners()
    
})

function addLikeEventListeners() {
    const likeIcons = $$('.recommend__item-like');
        likeIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                this.classList.toggle('recommend__item-like--active');
            });
        });
}





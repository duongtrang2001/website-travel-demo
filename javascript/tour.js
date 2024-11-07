import * as shared from './shared.js';

const topTours = [
    {
        imgSrc: "assits/img/tour-page/top-destinations/du lich Vinh Ha Long.png",
        alt: "Vịnh Hạ Long",
        name: "Vịnh Hạ Long",
        text: "4 tour"
    },
    {
        imgSrc: "assits/img/tour-page/top-destinations/du lich Da Nang.jpg",
        alt: "Đà Nẵng",
        name: "Đà Nẵng",
        text: "6 tour"
    },
    {
        imgSrc: "assits/img/tour-page/top-destinations/du lich Hoi An.png",
        alt: "Hội An",
        name: "Hội An",
        text: "4 tour"
    },
    
    {
        imgSrc: "assits/img/tour-page/top-destinations/du lich Nha Trang.jpg",
        alt: "Nha Trang",
        name: "Nha Trang",
        text: "5 tour"
    },
    {
        imgSrc: "assits/img/tour-page/top-destinations/du lich Phu Quoc.jpg",
        alt: "Phú Quốc",
        name: "Phú Quốc",
        text: "3 tour"
    },
]

document.addEventListener('DOMContentLoaded', () => {

    shared.initPage({
        items: topTours,
        itemsContainerSelector: '.items-container',
        dotContainerSelector: '.dot-container',
        prevBtnSelector: '#top-prev',
        nextBtnSelector: '#top-next'
    })

    displayServices('tour', '#recommend__list-all');
    displayServices('tour', '#recommend__list-filtered', service => {
        return service.rate.text >= '4.5';
    })

    const recommendList = $('.tour-recommend__list');
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






    addLikeEventListeners();
})

function addLikeEventListeners() {
    const likeIcons = $$('.recommend__item-like');
        likeIcons.forEach((icon, index) => {
            icon.addEventListener('click', function() {
                this.classList.toggle('recommend__item-like--active');
            });
        });
}
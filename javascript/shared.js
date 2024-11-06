export function initPage({
    items,
    itemsContainerSelector,
    dotContainerSelector,
    prevBtnSelector,
    nextBtnSelector
}) {
    let currentIndex = 0;
    let maxVisible = getMaxVisible();
    const itemsContainer = $(itemsContainerSelector);
    const dotContainer = $(dotContainerSelector);
    const prevBtn = $(prevBtnSelector);
    const nextBtn = $(nextBtnSelector);

    //render items ban đầu
    renderItems({ items, currentIndex, maxVisible, itemsContainer, dotContainer });

    //nếu số lượng item ít hơn hoặc bằng maxVisible thì nút prev và next sẽ bị ẩn đi
    if (items.length <= maxVisible) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dotContainer.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        dotContainer.style.display = 'flex';
    }

    //Thêm sự kiện cho nút next
    $(nextBtnSelector).addEventListener('click', function(event) {
        currentIndex = nextItem({ items, currentIndex, maxVisible, itemsContainer, dotContainer})
    });

    //Thêm sự kiện cho nút prev
    $(prevBtnSelector).addEventListener('click', function(event) {
        currentIndex = prevItem({ items, currentIndex, maxVisible, itemsContainer, dotContainer });
    });

    // Xử lý khi thay đổi kích thước màn hình
    window.addEventListener('resize', function() {
        currentIndex = 0;
        maxVisible = getMaxVisible();
        renderItems({ items, currentIndex, maxVisible, itemsContainer, dotContainer });
    });

    if (items.length <= maxVisible) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dotContainer.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        dotContainer.style.display = 'flex';
    }
}

export function renderItems({items, currentIndex, maxVisible, itemsContainer, dotContainer}) {
    maxVisible = getMaxVisible(); // cập nhật maxVisible mỗi khi render lại item
    itemsContainer.innerHTML = '';
    const visibleItems = items.slice(currentIndex, currentIndex + maxVisible);

    visibleItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('top-location__item', 'col', 'l-2', 'm-3', 'c-4');
        itemElement.innerHTML = `
            <a href="###" class="top-location__item-img">
                <img src="${item.imgSrc}" alt="${item.alt}">
            </a>
            <div class="top-location__content">
                <h3 class="top-location__item-name">${item.name}</h3>
                <span class="top-location__item-text">${item.text}</span>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    })
    createDots(items.length, currentIndex, maxVisible, dotContainer); //hiển thị các chấm tròn khi render
    updateDots(currentIndex, dotContainer); //cập nhật chấm tròn mỗi khi render
}

export function createDots(totalItems, currentIndex, maxVisible, dotContainer) {
    dotContainer.innerHTML = '';
    // Tính số lượng chấm tròn cần hiển thị
    const totalDots = Math.max(0, totalItems - maxVisible);
    
    for (let i = 0; i <= totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        if (i === (currentIndex % totalDots)) {
            dot.classList.add('active');
        }
        dotContainer.appendChild(dot);
    }
}

export function updateDots(currentIndex, dotContainer) {
    const dots = dotContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex % dots.length) {
            dot.classList.add('active');
        }
    })
}

export function nextItem({items, currentIndex, maxVisible, itemsContainer, dotContainer}) {
    if (currentIndex + maxVisible < items.length) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    renderItems({items, currentIndex, maxVisible, itemsContainer, dotContainer});
    return currentIndex; // cập nhật lại currentIndex
}

export function prevItem({items, currentIndex, maxVisible, itemsContainer, dotContainer}) {
    if (currentIndex > 0) {
        currentIndex--;
    }  else {
        currentIndex = items.length - maxVisible;
    }
    renderItems({items, currentIndex, maxVisible, itemsContainer, dotContainer});
    return currentIndex
}

export function getMaxVisible() {
    const screenWidth = window.innerWidth;
    if(screenWidth >= 1024) {
        return 6;
    } else if (screenWidth >= 768) {
        return 4;
    } else {
        return 3;
    }
}
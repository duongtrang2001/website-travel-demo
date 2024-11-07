async function loadIndex() {
    const response = await fetch('header.html');
    const headerHTML = await response.text();
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    // navbar color
    window.addEventListener('scroll', function() {
        const navbarBackground = $('#header__navbar-container');
        if(window.scrollY > 0) {
            navbarBackground.classList.add('header__navbar-container--scrolled')
        } else {
            navbarBackground.classList.remove('header__navbar-container--scrolled')
        }
        })
}

loadIndex();


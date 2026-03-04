/* ================= Toggle Icon Navbar ================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ================= Scroll Sections Active Link ================= */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* ================= Sticky Navbar ================= */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ================= Remove Toggle Icon and Navbar when click navbar link (scroll) ================= */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ================= ScrollReveal Animations ================= */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ================= Typed JS for Typewriter effect ================= */
const typed = new Typed('.multiple-text', {
    strings: ['Embedded Systems Engineer', 'Hardware Firmware Developer', 'IoT Enthusiast', 'PCB Designer'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

/* ================= Vanilla Tilt (3D Effects) Initialization ================= */
// The data-tilt attributes in HTML already handle initialization if the library is loaded via script tag at the end.
// By default VanillaTilt scans for elements with data-tilt on load.
// We've customized settings like data-tilt-max, data-tilt-speed via HTML attributes to create the beautiful floating card feel.

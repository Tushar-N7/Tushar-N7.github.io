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

/* ================= Particles JS Initialization ================= */
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00ffee" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#00ffee", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });
}

/* ================= Custom Cursor ================= */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

if (cursor && cursor2) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursor2.style.left = e.clientX + 'px';
            cursor2.style.top = e.clientY + 'px';
        }, 50);
    });

    const hoverElements = document.querySelectorAll('a, .btn, input, textarea, .bx, .project-box, .skill-box');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursor2.classList.add('cursor2-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursor2.classList.remove('cursor2-hover');
        });
    });
}

/* ================= Project Details Modal Logic ================= */
const projectData = {
    'smart-home': {
        title: 'AI-Powered Smart Home Automation',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'Python', 'OpenCV', 'Firebase', 'MQTT'],
        description: 'A comprehensive smart home ecosystem featuring AI-driven automation. The system uses local computer vision for face recognition and animal threat detection, integrated with a custom ESP32-based sensor network.',
        highlights: [
            'Real-time face recognition for secure entry',
            'Animal threat detection using localized AI models',
            'Cross-platform app control via Firebase',
            'Self-learning automation routines based on user habits'
        ]
    },
    'women-safety': {
        title: 'Women Safety Analytics',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Python', 'OpenCV', 'TensorFlow', 'Twilio'],
        description: 'An intelligent surveillance system designed for public safety. It predicts age and gender in real-time and calculates proximity between individuals to detect potential harassment or suspicious behavior.',
        highlights: [
            'Real-time Gender and Age Prediction',
            'Suspicious activity detection using distance calculation',
            'Automated alerts to nearby authorities via Twilio',
            'Heatmap generation for high-risk zones'
        ]
    },
    'inventory-mgmt': {
        title: 'Smart Inventory Management System',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'RFID', 'HX711 Load Cell', 'YOLOv8', 'Firebase'],
        description: 'A hybrid inventory system combining RFID tracking with computer vision. It uses weighing scales (HX711) for precise stock monitoring and YOLOv8 for visual verification of items.',
        highlights: [
            'Dual-method tracking (RFID + CV) for 99.9% accuracy',
            'Automated restock alerts based on weight thresholds',
            'Offline-first tracking with Firebase cloud sync',
            'Top 9 Finish in 24Hr National Hackathon'
        ]
    },
    'elderion-x': {
        title: 'Elderion-X: Smart Elder-Care',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'MPU6050', 'ESP-NOW Mesh', 'C++'],
        description: 'A wearable health and safety device for the elderly. It utilizes a mesh network to ensure connectivity within a large home without relying on centralized WiFi, providing fall detection and vital signs monitoring.',
        highlights: [
            'Reliable Fall Detection using 6-axis IMU sensors',
            'ESP-NOW Mesh network for robust intra-home communication',
            'Low-power optimization for 1-week battery life',
            'MSME Presented & SIH 2025 shortlisted project'
        ]
    },
    'rail-fault': {
        title: 'Railway Track Fault Detection Bot',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Raspberry Pi 5', 'Acoustic Sensors', 'Computer Vision', 'LiDAR'],
        description: 'Autonomous inspection bot winning 1st Place at ELECTROTHON 2026. It detects microscopic cracks in rails using a combination of acoustic resonance analysis and high-speed infrared imaging.',
        highlights: [
            '🥇 1st Place Winner - ELECTROTHON 2026',
            'Autonomous track navigation and fault marking',
            'Micro-crack detection via Acoustic Sensing',
            'High-precision GPS logging of detected faults'
        ]
    },
    'secure-telemetry': {
        title: 'Anomaly Detection & Secure Telemetry',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Custom PCB', 'ESP32', 'Cloud ML', 'Python'],
        description: 'A secure hardware-to-cloud bridge featuring a custom-designed ESP32 expansion board. It monitors industrial equipment health by streaming high-frequency sensor data to cloud-based ML models for anomaly detection.',
        highlights: [
            'Custom PCB designed for high-noise industrial environments',
            'Secure telemetry with hardware-level encryption',
            'Integration with Cloud ML for predictive maintenance',
            'Multi-COM port analysis tool built with Python'
        ]
    },
    'rc-system': {
        title: 'Custom RC System (Tx/Rx)',
        image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'NRF24L01+', 'PWM', 'LiPo Management'],
        description: 'A robust, DIY Radio Control system built from scratch. It features high-range communication using external antennas and a custom firmware stack for ultra-low latency servo and motor control.',
        highlights: [
            '2.4GHz high-gain NRF24L01+ communication',
            'Custom telemetry feedback on OLED display',
            'Integrated LiPo battery charging and monitoring',
            'Used for custom UAV and robotics control'
        ]
    },
    'safety-monitoring': {
        title: 'Industrial Safety Monitoring System',
        image: 'https://images.unsplash.com/photo-1541888086925-eb2c1e4c965e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'MQ Sensors', 'OpenCV', 'Twilio'],
        description: 'An AI+IoT guardian for industrial workshops. It combines chemical gas sensing with visual flame detection to provide early warnings for fire or toxic leaks.',
        highlights: [
            'Gas leak detection (CO, Smoke, LPG) using MQ-series sensors',
            'Visual Flame detection using optimized OpenCV scripts',
            'Twilio SMS and Voice call alerts for emergency responders',
            'Local OLED display and industrial-grade relay triggers'
        ]
    },
    'swarm-bot': {
        title: 'Smarter Swarm Bot System',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'ESP32-CAM', 'NRF24L01', 'Wireless Mesh'],
        description: 'A scalable swarm robotics framework allowing multiple bots to coordinate tasks. Features a Master-Slave architecture where the leader executes complex pathfinding and shares coordinates with the swarm.',
        highlights: [
            'Synchronized movement across 5+ robot nodes',
            'Leader-follower coordination via ESP-NOW',
            'Visual obstacle sharing using leader-mounted ESP32-CAM',
            'Scalable architecture for adding/removing bots on the fly'
        ]
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalHighlights = document.getElementById('modal-highlights');
const closeBtn = document.querySelector('.close-modal');

// Open Modal logic
document.querySelectorAll('.project-box').forEach(box => {
    box.onclick = () => {
        const projectId = box.getAttribute('data-project-id');
        const data = projectData[projectId];

        if (data) {
            modalTitle.innerText = data.title;
            modalImg.src = data.image;
            modalDesc.innerText = data.description;

            // Clear and add tech badges with staggered animation delay
            modalTech.innerHTML = '';
            data.tech.forEach((t, index) => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.style.setProperty('--i', index);
                badge.innerText = t;
                modalTech.appendChild(badge);
            });

            // Clear and add highlights with staggered animation delay
            modalHighlights.innerHTML = '<h4>Key Highlights</h4>';
            data.highlights.forEach((h, index) => {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.style.setProperty('--i', index);
                item.innerHTML = `<i class='bx bx-check-double'></i> ${h}`;
                modalHighlights.appendChild(item);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
        }
    };
});

// Close Modal logic
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scroll
};

closeBtn.onclick = closeModal;

// Close on background click
window.onclick = (e) => {
    if (e.target == modal) {
        closeModal();
    }
};

// Close on Escape key
window.onkeydown = (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};

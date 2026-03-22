/* ================= GSAP & ScrollTrigger Setup ================= */
gsap.registerPlugin(ScrollTrigger);

/* ================= Custom Cursor Logic ================= */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let cursor2X = 0, cursor2Y = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation loop
function animateCursor() {
    // Smooth follow for cursor 1
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Slower smooth follow for cursor 2 (the ring)
    cursor2X += (mouseX - cursor2X) * 0.1;
    cursor2Y += (mouseY - cursor2Y) * 0.1;
    cursor2.style.transform = `translate(${cursor2X}px, ${cursor2Y}px)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Magnetic Effect Logic
const magneticElements = document.querySelectorAll('a, .btn, .social-links a, .bx, .project-box, .skill-box');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });

        cursor.classList.add('cursor-hover');
        cursor2.classList.add('cursor2-hover');
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
        cursor.classList.remove('cursor-hover');
        cursor2.classList.remove('cursor2-hover');
    });
});

/* ================= Three.js 3D Background ================= */
const initThreeJS = () => {
    const container = document.getElementById('particles-js'); // Reuse container
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create a 3D points/grid field
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
        colors[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 5;

    let targetX = 0, targetY = 0;
    const orbs = document.querySelectorAll('.bg-orb');

    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.0005;
        targetY = (e.clientY - window.innerHeight / 2) * 0.0005;

        // Parallax orbs
        const xMove = (e.clientX - window.innerWidth / 2) * 0.05;
        const yMove = (e.clientY - window.innerHeight / 2) * 0.05;
        
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.2;
            gsap.to(orb, {
                x: xMove * speed,
                y: yMove * speed,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    const animate = () => {
        requestAnimationFrame(animate);

        points.rotation.y += 0.001;
        points.rotation.x += (targetY - points.rotation.x) * 0.05;
        points.rotation.y += (targetX - points.rotation.y) * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initThreeJS();

/* ================= GSAP Animations ================= */

// Initial Page Load
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

// Set initial positions
gsap.set(".logo, .navbar a, .home-content h3, .home-content h1, .home-content p, .social-links a, .home-content .btn, .home-img", { visibility: "visible" });

tl.from(".logo", { autoAlpha: 0, x: -100, duration: 1.2 })
  .from(".navbar a", { autoAlpha: 0, y: -50, stagger: 0.1, duration: 0.8 }, "-=0.8")
  .from(".home-content h3", { autoAlpha: 0, y: 30, duration: 0.8 }, "-=0.5")
  .from(".home-content h1", { autoAlpha: 0, x: -50, duration: 1 }, "-=0.6")
  .from(".home-content p", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.7")
  .from(".social-links a", { autoAlpha: 0, scale: 0, stagger: 0.1, duration: 0.5 }, "-=0.5")
  .from(".home-content .btn", { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.3")
  .from(".home-img", { autoAlpha: 0, scale: 0.8, rotate: 10, duration: 1.5 }, "-=1");

// Scroll Reveal with GSAP
const sectionsReveal = document.querySelectorAll('section:not(#home)');
sectionsReveal.forEach(section => {
    gsap.from(section.querySelectorAll('.heading, .about-content, .skills-container, .projects-container, .contact form'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        autoAlpha: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out"
    });
});

/* ================= Toggle Icon Navbar ================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ================= Typed JS for Typewriter effect ================= */
const typed = new Typed('.multiple-text', {
    strings: ['Embedded Systems Engineer', 'Hardware Firmware Developer', 'IoT Enthusiast', 'PCB Designer'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

/* ================= Project Details Modal Logic ================= */
const projectData = {
    'smart-home': {
        title: 'AI-Powered Smart Home Automation',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'Python', 'OpenCV', 'Firebase', 'MQTT'],
        description: 'A comprehensive smart home ecosystem featuring AI-driven automation...',
        highlights: ['Real-time face recognition', 'Animal threat detection', 'Cloud control', 'Self-learning']
    },
    'women-safety': {
        title: 'Women Safety Analytics',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Python', 'OpenCV', 'TensorFlow', 'Twilio'],
        description: 'An intelligent surveillance system designed for public safety...',
        highlights: ['Gender prediction', 'Proximity alerts', 'Twilio integration', 'Heatmaps']
    },
    'inventory-mgmt': {
        title: 'Smart Inventory Management System',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'RFID', 'HX711', 'YOLOv8', 'Firebase'],
        description: 'A hybrid inventory system combining RFID tracking with computer vision...',
        highlights: ['Dual tracking', 'Automated restock', 'Cloud sync', 'Hackathon top-9']
    },
    'elderion-x': {
        title: 'Elderion-X: Smart Elder-Care',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'MPU6050', 'ESP-NOW Mesh', 'C++'],
        description: 'A wearable health and safety device for the elderly...',
        highlights: ['Fall detection', 'Mesh network', 'Low power', 'SIH 2025 candidate']
    },
    'rail-fault': {
        title: 'Railway Track Fault Detection Bot',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Raspberry Pi 5', 'Acoustic Sensors', 'Computer Vision', 'LiDAR'],
        description: 'Autonomous inspection bot winning 1st Place at ELECTROTHON 2026...',
        highlights: ['1st Place Winner', 'Acoustic sensing', 'Autonomous navigation', 'High-precision logging']
    },
    'secure-telemetry': {
        title: 'Anomaly Detection & Secure Telemetry',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['Custom PCB', 'ESP32', 'Cloud ML', 'Python'],
        description: 'A secure hardware-to-cloud bridge featuring a custom-designed ESP32 expansion board...',
        highlights: ['Custom PCB design', 'Secure encryption', 'ML integration', 'Telemetry analysis']
    },
    'rc-system': {
        title: 'Custom RC System (Tx/Rx)',
        image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'NRF24L01+', 'PWM', 'LiPo Management'],
        description: 'A robust, DIY Radio Control system built from scratch...',
        highlights: ['2.4GHz communication', 'Custom telemetry', 'Integrated charging', 'UAV control']
    },
    'safety-monitoring': {
        title: 'Industrial Safety Monitoring System',
        image: 'https://images.unsplash.com/photo-1541888086925-eb2c1e4c965e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'MQ Sensors', 'OpenCV', 'Twilio'],
        description: 'An AI+IoT guardian for industrial workshops...',
        highlights: ['Gas sensing', 'Flame detection', 'Twilio alerts', 'OLED display']
    },
    'swarm-bot': {
        title: 'Smarter Swarm Bot System',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tech: ['ESP32', 'ESP32-CAM', 'NRF24L01', 'Wireless Mesh'],
        description: 'A scalable swarm robotics framework allowing multiple bots to coordinate tasks...',
        highlights: ['Synchronized movement', 'ESP-NOW mesh', 'Visual sharing', 'Scalable architecture']
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalHighlights = document.getElementById('modal-highlights');
const closeBtn = document.querySelector('.close-modal');

// Open Modal with GSAP
document.querySelectorAll('.project-box').forEach(box => {
    box.onclick = () => {
        const projectId = box.getAttribute('data-project-id');
        const data = projectData[projectId];

        if (data) {
            modalTitle.innerText = data.title;
            modalImg.src = data.image;
            modalDesc.innerText = data.description;

            modalTech.innerHTML = '';
            data.tech.forEach((t, i) => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.innerText = t;
                modalTech.appendChild(badge);
            });

            modalHighlights.innerHTML = '<h4>Key Highlights</h4>';
            data.highlights.forEach((h, i) => {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.innerHTML = `<i class='bx bx-check-double'></i> ${h}`;
                modalHighlights.appendChild(item);
            });

            modal.classList.add('active');
            gsap.from(".modal-content", { y: 100, opacity: 0, duration: 0.5, ease: "power2.out" });
            document.body.style.overflow = 'hidden';
        }
    };
});

// Close Modal logic
const closeModal = () => {
    gsap.to(".modal-content", { 
        y: 100, 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        } 
    });
};

closeBtn.onclick = closeModal;
window.onclick = (e) => { if (e.target == modal) closeModal(); };
window.onkeydown = (e) => { if (e.key === 'Escape') closeModal(); };

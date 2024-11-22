// DOM Elements
const loginModal = document.getElementById('loginModal');
const loginBtn = document.querySelector('.btn-login');
const registerBtn = document.querySelector('.btn-register');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const startCameraBtn = document.getElementById('startCamera');
const stopCameraBtn = document.getElementById('stopCamera');
const webcamElement = document.getElementById('webcam');
const lessonContent = document.getElementById('lessonContent');

// Navigation highlight
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// QR Scanner variables
let scanner = null;
let stream = null;

// Modal functions
function openModal() {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
loginBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal();
    }
});

// Form handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
    closeModal();
});

// Scroll spy for navigation
function updateActiveNavLink() {
    let fromTop = window.scrollY + 100;

    sections.forEach(section => {
        const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (!link) return;

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// QR Scanner functions
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        });
        webcamElement.srcObject = stream;
        initQRScanner();
        startCameraBtn.disabled = true;
        stopCameraBtn.disabled = false;
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
    }
}

function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        webcamElement.srcObject = null;
        if (scanner) {
            scanner.clear();
            scanner = null;
        }
        startCameraBtn.disabled = false;
        stopCameraBtn.disabled = true;
    }
}

function initQRScanner() {
    if (!scanner) {
        scanner = new QRCode(webcamElement, {
            text: "Initializing...",
            width: 128,
            height: 128,
        });
        
        // This is a mock function since we can't actually scan QR codes without additional libraries
        // In a real implementation, you would use a library like jsQR or zxing
        scanQRCode();
    }
}

function scanQRCode() {
    // Mock QR code scanning
    // In a real implementation, this would continuously scan for QR codes
    console.log('Scanning for QR codes...');
}

function updateLessonContent(data) {
    lessonContent.innerHTML = `
        <div class="lesson-content">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            ${data.content}
        </div>
    `;
}

// Camera control event listeners
startCameraBtn.addEventListener('click', startCamera);
stopCameraBtn.addEventListener('click', stopCamera);

// Animation for feature cards
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Resource download handling
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const resourceName = this.closest('.resource-card').querySelector('h3').textContent;
        alert(`Đang tải xuống tài liệu: ${resourceName}`);
        // Add actual download logic here
    });
});

// Mobile menu handling (you might want to add a hamburger menu for mobile)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });
    
    navbar.insertBefore(mobileMenuBtn, navbar.firstChild);
}

// Call mobile menu setup on load
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    } else {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
        document.querySelector('.nav-links').classList.remove('show');
    }
});
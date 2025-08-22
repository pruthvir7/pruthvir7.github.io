// Global variables
let isLoading = true;
let particles = [];
let animationId;

// Project data for modals - Updated with all 6 projects and GitHub links
const projectData = {
    parking: {
        title: "Smart Parking Management System",
        description: "Comprehensive parking solution using advanced computer vision for real-time parking space detection and automated license plate recognition. Integrated with cloud infrastructure for scalable management.",
        details: [
            "Built a Smart Parking Management System with computer vision, boosting efficiency 30% and cutting parking time 80%",
            "Developed Flask RESTful APIs for 50+ vehicles, integrating License Plate Recognition (LPR) for automated management",
            "Deployed on AWS (EC2, S3, RDS MySQL) with 96% accurate anomaly detection"
        ],
        technologies: ["Computer Vision", "Flask", "AWS EC2", "AWS S3", "AWS RDS", "MySQL", "License Plate Recognition", "Python", "OpenCV"],
        highlights: ["50+ vehicles supported", "30% efficiency boost", "80% parking time reduction", "96% accurate anomaly detection", "Flask RESTful APIs"],
        category: "AI/ML",
        status: "Completed",
        github: "https://github.com/pruthvir7/ParkingManagement"
    },
    retrovest: {
        title: "RetroVest - Smart Investment Simulator",
        description: "Advanced investment simulation platform with AI-powered risk analysis and live market data integration. Features educational tools for interactive learning and historical market scenario testing.",
        details: [
            "Built Time Machine Mode to simulate past market scenarios (2013-2025), enabling investment decision-making and outcome evaluation",
            "Integrated AI-powered risk analysis with live market data and educational tools for real-time updates and interactive learning",
            "Achieved Best FinTech Project Award at HackFest 2025 for contributions to system functionality and design"
        ],
        technologies: ["AI/ML", "Risk Analysis", "Market Data APIs", "Python", "TensorFlow", "React.js", "Node.js"],
        highlights: ["Best FinTech Project Award at HackFest 2025", "Time Machine Mode (2013-2025)", "AI-powered risk analysis", "Real-time market data", "Educational tools"],
        category: "FinTech",
        status: "Award Winner",
        github: "https://github.com/pruthvir7/RetroVest"
    },
    office: {
        title: "Office Seat Manager",
        description: "AI-powered seat and conference room booking system with real-time selection UI and advanced authentication. Deployed on AWS with high availability and scalability.",
        details: [
            "Developed a seat and conference room booking system using React.js, FastAPI, and MySQL, handling 50+ daily reservations",
            "Built an AI-powered seat allocation system with real-time seat selection UI, improving efficiency by 30% and reducing booking conflicts by 20%",
            "Deployed on AWS (EC2, RDS MySQL, S3) with JWT-based authentication, supporting 100+ users and achieving 95% uptime during testing"
        ],
        technologies: ["React.js", "FastAPI", "MySQL", "AWS EC2", "AWS RDS", "AWS S3", "JWT Authentication", "AI/ML"],
        highlights: ["50+ daily reservations", "30% efficiency improvement", "20% conflict reduction", "100+ users supported", "95% uptime"],
        category: "Web Development",
        status: "Production",
        github: "#"
    },
    movie: {
        title: "Movie Collection Tracker",
        description: "Built a responsive UI with dynamic card layouts for adding, viewing, and deleting movies. Implemented backend APIs (add, fetch, delete) for seamless database integration. Showcased end-to-end web development, combining frontend interactivity with backend data handling.",
        details: [
            "Developed a full-stack CRUD web app using HTML, CSS, JavaScript, PHP, and MySQL to manage personal movie collections",
            "Built responsive UI with dynamic card layouts for adding, viewing, and deleting movies",
            "Implemented backend APIs (add, fetch, delete) for seamless database integration"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "CRUD APIs", "Responsive Design"],
        highlights: ["Full-stack CRUD operations", "Dynamic card layouts", "Responsive UI design", "Backend API integration", "Database management"],
        category: "Web Development",
        status: "Completed",
        github: "https://github.com/pruthvir7/MovieTracker"
    },
    facial: {
        title: "Facial Recognition System",
        description: "Advanced facial recognition system developed during IEEE internship. Reduced training time by 30% with efficient data pre-processing and hyperparameter tuning. Enhanced model accuracy by 20%, improving efficiency and suitability for real-time applications.",
        details: [
            "Engineered a Siamese Neural Network for facial recognition, achieving 92% accuracy on 1,000+ images",
            "Reduced training time by 30% with efficient data pre-processing and hyperparameter tuning",
            "Enhanced model accuracy by 20%, improving efficiency and suitability for real-time applications",
            "Implemented the model using Python, TensorFlow, Keras, and OpenCV, increasing verification accuracy by 40% and reducing processing time by 30%"
        ],
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Siamese Neural Networks", "Machine Learning"],
        highlights: ["92% accuracy on 1,000+ images", "30% training time reduction", "20% accuracy enhancement", "Real-time applications", "IEEE project"],
        category: "AI/ML",
        status: "Completed",
        github: "#"
    },
    school: {
        title: "Government School Website",
        description: "Implemented responsive design and interactive elements (navigation menus, gallery, forms) to improve usability. Selected among the top 20 teams in a web development competition for innovative design and functionality. Emphasized accessibility and user-friendly layout, ensuring the site catered to students, parents, and staff.",
        details: [
            "Built a prototype government school website using HTML, CSS, and JavaScript with sections for admissions, faculty, events, and announcements",
            "Implemented responsive design and interactive elements (navigation menus, gallery, forms) to improve usability",
            "Selected among the top 20 teams in a web development competition for innovative design and functionality",
            "Emphasized accessibility and user-friendly layout, ensuring the site catered to students, parents, and staff"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "Accessibility Features", "Interactive Elements"],
        highlights: ["Top 20 teams in competition", "Responsive design", "Accessibility focused", "Interactive elements", "Multi-user catering"],
        category: "Web Development",
        status: "Competition Winner",
        github: "#"
    }
};

// DOM Content Loaded - Setup modal immediately
document.addEventListener('DOMContentLoaded', function() {
    setupProjectModal(); // Set up modal immediately
    initializeApp();
});

// Initialize application
function initializeApp() {
    showLoadingScreen();
    initializeParticles();
    setupEventListeners();
    setupScrollAnimations();
    startTypingAnimation();
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        hideLoadingScreen();
        animateStatsCounters();
        isLoading = false;
    }, 3000);
}

// Project Modal - Fixed implementation with immediate setup
function setupProjectModal() {
    console.log('Setting up project modal...'); // Debug log
    
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    
    // Ensure modal elements exist
    if (!modal || !modalOverlay || !modalClose || !modalBody) {
        console.error('Modal elements not found:', { modal, modalOverlay, modalClose, modalBody });
        return;
    }
    
    console.log('Modal elements found, setting up event listeners...');
    
    // Function to show modal
    function showProjectModal(project) {
        console.log('Showing modal for:', project.title);
        
        modalBody.innerHTML = generateModalContent(project);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to hide modal
    function hideProjectModal() {
        console.log('Hiding modal');
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Set up project card click handlers with event delegation
    document.addEventListener('click', function(e) {
        // Check if clicked element is a view details button
        if (e.target && e.target.classList.contains('btn-view-details')) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('View details button clicked');
            
            // Find the parent project card
            const projectCard = e.target.closest('.project-card');
            if (!projectCard) {
                console.error('Project card not found');
                return;
            }
            
            const projectKey = projectCard.getAttribute('data-project');
            const project = projectData[projectKey];
            
            console.log('Project key:', projectKey, 'Project data:', project);
            
            if (project) {
                showProjectModal(project);
            } else {
                console.error('Project not found:', projectKey);
            }
        }
    });
    
    // Close modal events
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        hideProjectModal();
    });
    
    modalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        hideProjectModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideProjectModal();
        }
    });
    
    console.log('Project modal setup complete');
}

// Updated modal content generation with GitHub link
function generateModalContent(project) {
    const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
    
    return `
        <div class="modal-header">
            <h2 style="color: var(--accent-primary); margin-bottom: 1rem; font-size: 2rem;">${project.title}</h2>
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <span class="project-status status-${statusClass}">${project.status}</span>
                <span style="padding: 0.3rem 1rem; background: rgba(0, 212, 255, 0.1); color: var(--accent-primary); border-radius: 20px; font-size: 0.8rem;">${project.category}</span>
            </div>
        </div>
        
        <div class="modal-description" style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Project Overview</h3>
            <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>
        </div>
        
        <div class="modal-details" style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Key Achievements</h3>
            <ul style="list-style: none; padding: 0;">
                ${project.details.map(detail => `
                    <li style="color: var(--text-secondary); margin-bottom: 0.8rem; padding-left: 1.5rem; position: relative; line-height: 1.6;">
                        <span style="position: absolute; left: 0; color: var(--accent-primary);">▶</span>
                        ${detail}
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="modal-highlights" style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Project Highlights</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem;">
                ${project.highlights.map(highlight => `
                    <span style="padding: 0.4rem 1rem; background: rgba(255, 255, 255, 0.05); color: var(--text-tertiary); border-radius: 20px; font-size: 0.85rem; border: 1px solid var(--border-color);">
                        ${highlight}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-tech" style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem;">
                ${project.technologies.map(tech => `
                    <span style="padding: 0.4rem 1rem; background: rgba(0, 212, 255, 0.1); color: var(--accent-primary); border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(0, 212, 255, 0.2); font-weight: 500;">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-footer" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color); display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 1rem 2rem; font-size: 1rem; font-weight: 600; border: 2px solid var(--accent-primary); border-radius: 50px; cursor: pointer; transition: all 0.3s ease; color: var(--accent-primary); background: transparent;" target="_blank">
                <span>GitHub</span>
            </a>
            <button class="btn btn-primary" onclick="closeModalAndGoToContact()" style="display: inline-flex; align-items: center; justify-content: center; padding: 1rem 2rem; font-size: 1rem; font-weight: 600; text-decoration: none; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; background: var(--gradient-primary); color: var(--bg-primary); box-shadow: var(--shadow-primary);">
                <span>Get In Touch</span>
                <div class="btn-glow"></div>
            </button>
        </div>
    `;
}

// Helper function for closing modal and going to contact
function closeModalAndGoToContact() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Scroll to contact section
    setTimeout(() => {
        document.querySelector('#contact').scrollIntoView({behavior: 'smooth'});
    }, 400);
}

// Loading Screen
function showLoadingScreen() {
    const loadingBar = document.getElementById('loading-bar');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
    
    // Remove from DOM after transition
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

// Typing Animation
function startTypingAnimation() {
    const text = "PRUTHVI R";
    const typingElement = document.getElementById('typing-text');
    let index = 0;
    
    function typeCharacter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 150);
        }
    }
    
    // Start typing after loading screen
    setTimeout(typeCharacter, 3500);
}

// Particle System
function initializeParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    animateParticles();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = '#00d4ff';
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    particle.style.pointerEvents = 'none';
    
    resetParticle(particle);
    document.getElementById('particles-container').appendChild(particle);
    
    particles.push({
        element: particle,
        x: parseFloat(particle.style.left),
        y: parseFloat(particle.style.top),
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 2 + 1,
        size: parseFloat(particle.style.width)
    });
}

function resetParticle(particle) {
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
}

function animateParticles() {
    particles.forEach(particle => {
        particle.y -= particle.speedY;
        particle.x += particle.speedX;
        
        if (particle.y < -10) {
            particle.y = window.innerHeight + 10;
            particle.x = Math.random() * window.innerWidth;
        }
        
        if (particle.x < -10 || particle.x > window.innerWidth + 10) {
            particle.x = Math.random() * window.innerWidth;
        }
        
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    });
    
    if (!isLoading) {
        requestAnimationFrame(animateParticles);
    }
}

// Event Listeners
function setupEventListeners() {
    // Mobile navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (mobileMenu && navMenu) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Update active link
                updateActiveNavLink(link);
            }
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavbarBackground();
        updateActiveNavOnScroll();
        animateOnScroll();
    });
    
    // Contact form
    setupContactForm();
    
    // Skill item interactions
    setupSkillInteractions();
}

// Scroll Progress
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
}

// Navbar Background
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active Navigation
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(navLink);
        }
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function animateOnScroll() {
    // Additional scroll-triggered animations can be added here
}

// Statistics Counter Animation - Updated for only 2 stats
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 60; // 60 frames for 1 second at 60fps
        const isDecimal = target % 1 !== 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                if (isDecimal) {
                    stat.textContent = current.toFixed(2);
                } else {
                    stat.textContent = Math.floor(current);
                }
                
                // Add suffix based on target value
                if (target === 250) {
                    stat.textContent += '+';
                }
                
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
}

// Skill Interactions
function setupSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const level = item.getAttribute('data-level');
            item.style.background = `linear-gradient(90deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) ${level}%, rgba(255, 255, 255, 0.02) ${level}%, rgba(255, 255, 255, 0.02) 100%)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(255, 255, 255, 0.02)';
        });
    });
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Reset previous error states
        clearFormErrors();
        
        // Validation
        let hasErrors = false;
        
        if (!name) {
            showFieldError('name', 'Name is required');
            hasErrors = true;
        }
        
        if (!email) {
            showFieldError('email', 'Email is required');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            hasErrors = true;
        }
        
        if (!subject) {
            showFieldError('subject', 'Subject is required');
            hasErrors = true;
        }
        
        if (!message) {
            showFieldError('message', 'Message is required');
            hasErrors = true;
        }
        
        if (hasErrors) {
            showNotification('Please correct the errors in the form.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.querySelector('span').textContent;
        
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            clearFormErrors();
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Form validation helpers
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#ff4444';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            animation: fadeIn 0.3s ease;
        `;
        field.parentNode.appendChild(errorElement);
    }
}

function clearFormErrors() {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = 'var(--border-color)';
            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 1.2rem;">${getNotificationIcon(type)}</span>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: var(--glassmorphism);
        backdrop-filter: blur(20px);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 15px;
        border: 1px solid var(--glassmorphism-border);
        box-shadow: var(--shadow-secondary);
        z-index: 10001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 0.9rem;
        line-height: 1.5;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #00ff00';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #ff4444';
    } else {
        notification.style.borderLeft = '4px solid var(--accent-primary)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return '✓';
        case 'error':
            return '✕';
        default:
            return 'ℹ';
    }
}

// Smooth scrolling for hero buttons
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Enhanced scroll effects
function addParallaxEffect() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', addParallaxEffect);

// Add CSS animations dynamically
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .field-error {
        animation: fadeIn 0.3s ease;
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateScrollProgress();
    updateNavbarBackground();
    updateActiveNavOnScroll();
}, 16)); // ~60fps

// Add intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.skill-item, .project-card, .achievement-card, .timeline-item');
    elementsToAnimate.forEach(el => {
        elementObserver.observe(el);
    });
});

// Add resize event listener for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Adjust particle positions if needed
    if (particles.length > 0) {
        particles.forEach(particle => {
            if (particle.x > window.innerWidth) {
                particle.x = window.innerWidth - 10;
            }
        });
    }
}, 100));

console.log('🚀 Portfolio loaded successfully!');
console.log('💻 Built with passion by Pruthvi R');
console.log('🔗 LinkedIn: https://linkedin.com/in/pruthvi-r-33a66b254');
console.log('📧 Email: pruthviramesh7@gmail.com');

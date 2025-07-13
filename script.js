// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to the follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Change cursor size when hovering over clickable elements
const clickableElements = document.querySelectorAll('a, button, .btn, input, textarea, .navbar a, #menu-icon');
clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            
            // Active sections for animation on scroll
            sec.classList.add('show-animate');
            
            // Animate skills when skills section is in view
            if(id === 'skills') {
                animateSkills();
            }
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Animate Skills
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    
    // Bar skills
    const barSkills = [
        { element: document.querySelector('.html'), percent: 90 },
        { element: document.querySelector('.css'), percent: 85 },
        { element: document.querySelector('.javascript'), percent: 80 },
        { element: document.querySelector('.react'), percent: 75 }
    ];
    
    barSkills.forEach(skill => {
        skill.element.style.width = skill.percent + '%';
        let percentElement = skill.element.parentElement.parentElement.querySelector('.percent');
        let count = 0;
        let interval = setInterval(() => {
            if(count >= skill.percent) {
                clearInterval(interval);
            } else {
                count++;
                percentElement.textContent = count + '%';
            }
        }, 15);
    });
    
    // Circular skills
    const circleSkills = document.querySelectorAll('.circle-progress');
    circleSkills.forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const circleElement = circle.querySelector('.progress-ring-circle');
        const percentElement = circle.querySelector('.circle-percent');
        
        // Calculate the stroke dashoffset
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (percent / 100) * circumference;
        
        circleElement.style.strokeDashoffset = offset;
        
        // Animate the percentage count
        let count = 0;
        let interval = setInterval(() => {
            if(count >= percent) {
                clearInterval(interval);
            } else {
                count++;
                percentElement.textContent = count + '%';
            }
        }, 15);
    });
}

// Project Card Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-left img');
        img.style.transform = 'scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-left img');
        img.style.transform = 'scale(1)';
    });
});

// Education Card Animation
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 171, 240, 0.3)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 171, 240, 0.1)';
    });
});

// Initialize animations on page load and scroll
function checkScroll() {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;
        
        if(top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        }
    });
}

// Run checkScroll on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Trigger animations for initially visible sections
document.addEventListener('DOMContentLoaded', function() {
    checkScroll();
    
    // Check if skills section is already in view on page load
    const skillsSection = document.getElementById('skills');
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    
    if(window.scrollY + window.innerHeight > skillsSectionTop && 
       window.scrollY < skillsSectionTop + skillsSectionHeight) {
        animateSkills();
    }
});
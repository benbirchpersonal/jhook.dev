// Particle settings
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 100;
let mouse = { x: null, y: null };
const maxDistance = 100;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize particles
function initParticles() {
    particles.length = 0; // Clear particles
    for (let i = 0; i < numParticles; i++) {
        let radius = 2;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2; // Random velocity
        let speedY = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, speedX, speedY, radius));
    }
}

// Draw lines between nearby particles and mouse interaction
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.closePath();
            }
        }

        // Draw line to mouse if close enough
        const mouseDx = particles[i].x - mouse.x;
        const mouseDy = particles[i].y - mouse.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        if (mouseDistance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - mouseDistance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

// Update particles and draw scene
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    drawLines();
    requestAnimationFrame(animate);
}

// Handle mouse movement
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Resize canvas on window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Reinitialize particles on resize
});

// Initialize particles and start animation
initParticles();
animate();

const scrollIndicator = document.getElementById('scrollIndicator');

function updateScrollIndicator() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const indicatorWidth = (scrollPosition / scrollableHeight) * 100;
    scrollIndicator.style.width = `${indicatorWidth}%`;
}

// Update scroll indicator on scroll
window.addEventListener('scroll', updateScrollIndicator);

// Initialize scroll indicator on page load
updateScrollIndicator();

// Handle "More Info" button clicks
document.querySelectorAll('.more-info').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

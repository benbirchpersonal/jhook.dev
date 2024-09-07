// Particle settings
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 50;
let mouse = { x: null, y: null };
const maxDistance = 100;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y, speedX, speedY, radius, brightness) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
        this.brightness = brightness;
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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize particles
function initParticles() {
    particles.length = 0; // Clear particles
    for (let i = 0; i < numParticles; i++) {
        let radius = Math.random() * 3 + 1; // Random size between 1 and 4
        let brightness = Math.random() * 0.5 + 0.5; // Random brightness between 0.5 and 1
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2; // Random velocity
        let speedY = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, speedX, speedY, radius / 2, brightness / 2));
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

// Smooth scroll to projects section or back to the top
document.getElementById('scrollButtonDown').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

document.getElementById('scrollButtonUp').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

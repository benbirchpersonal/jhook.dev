
function animMenu(){

	$(".btn1").animate(
	{
		opacity: 1,
    	left:0,}, 500, function() {

  		});

}

const particleCount = 100;  // Number of particles to create

// Function to create particles
function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.setProperty('--x', Math.random());  // Random position on x-axis
        particle.style.setProperty('--speed', 0.5 + Math.random() * 0.5);  // Random speed
        document.getElementById('particles').appendChild(particle);
    }
}

// Initialize particles on page load
window.onload = createParticles;

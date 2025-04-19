document.addEventListener('click', function (e) {
  const particles = [];
  const particleCount = 20;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 2;
    const lifetime = 1000; // 粒子存在时间（毫秒）

    particles.push({
      element: particle,
      x: e.clientX,
      y: e.clientY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      lifetime: lifetime
    });
  }

  function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.lifetime -= 16; // 每帧减少的时间（约60fps）

      p.element.style.left = p.x + 'px';
      p.element.style.top = p.y + 'px';
      p.element.style.opacity = p.lifetime / 1000;

      if (p.lifetime <= 0) {
        document.body.removeChild(p.element);
        particles.splice(i, 1);
        i--;
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(updateParticles);
    }
  }

  updateParticles();
});
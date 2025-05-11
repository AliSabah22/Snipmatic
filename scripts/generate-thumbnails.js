const fs = require('fs');
const { createCanvas } = require('canvas');

const thumbnails = [
  { title: 'AI Video Creation', color: '#4f46e5' },
  { title: 'Smart Editing', color: '#7c3aed' },
  { title: 'Viral Content', color: '#db2777' },
  { title: 'Auto Captions', color: '#059669' },
  { title: 'Social Media Ready', color: '#d97706' }
];

// Create thumbnails directory if it doesn't exist
if (!fs.existsSync('./public/thumbnails')) {
  fs.mkdirSync('./public/thumbnails', { recursive: true });
}

// Generate thumbnails
thumbnails.forEach((thumbnail, index) => {
  const canvas = createCanvas(512, 288);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = thumbnail.color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(thumbnail.title, canvas.width / 2, canvas.height / 2);

  // Save the thumbnail
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(`./public/thumbnails/video${index + 1}.jpg`, buffer);
});

console.log('Thumbnails generated successfully!'); 
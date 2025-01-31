const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const urls = [
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80'
];

const directory = path.join(__dirname, 'src', 'assets', 'images');

// Create directory if it doesn't exist
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

Promise.all(
  urls.map((url, index) => 
    downloadImage(url, path.join(directory, `placeholder${index + 1}.jpg`))
  )
).then(() => {
  console.log('All images downloaded successfully!');
}).catch(err => {
  console.error('Error downloading images:', err);
}); 
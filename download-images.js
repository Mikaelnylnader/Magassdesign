import https from 'https';
import fs from 'fs';
import path from 'path';

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
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
  'https://images.unsplash.com/photo-1494905998402-395d579af36f',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
];

const directory = './src/assets/images';

Promise.all(
  urls.map((url, index) => 
    downloadImage(url, path.join(directory, `placeholder${index + 1}.jpg`))
  )
).then(() => {
  console.log('All images downloaded successfully!');
}).catch(err => {
  console.error('Error downloading images:', err);
}); 
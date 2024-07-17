const { IgApiClient } = require('instagram-private-api'); //3rd party api for posting on instagram
const fs = require('fs'); // to access and read files

const ig = new IgApiClient();

//you can also use env file
const username = 'your_username';
const password = 'your_password';


const imagePath = '/test.jpg';

async function login() {
  ig.state.generateDevice(username);
  await ig.account.login(username, password);
  console.log('Logged in successfully!');
}

async function uploadPhoto() {
  const imageBuffer = fs.readFileSync(imagePath);
  const publish = await ig.publish.photo({
    file: imageBuffer,
    caption: 'Hello from Node.js!',
  });
  console.log('Post published successfully:', publish);
}

(async () => {
  try {
    await login();
    await uploadPhoto();
  } catch (err) {
    console.error('Error:', err);
  }
})();

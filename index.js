const { IgApiClient } = require('instagram-private-api'); // 3rd party api for posting on instagram
const fs = require('fs'); // to access and read files
const schedule = require('node-schedule'); // for scheduling tasks

const ig = new IgApiClient();

// you can also use env file
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

async function schedulePost() {
  const job = schedule.scheduleJob('*/5 * * * *', async () => { // runs every 5 minutes
    try {
      await login();
      await uploadPhoto();
    } catch (err) {
      console.error('Error:', err);
    }
  });
  console.log('Post scheduled successfully!');

schedulePost(); 

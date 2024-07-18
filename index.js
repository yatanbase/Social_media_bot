require('dotenv').config(); // to save id and password
const axios = require('axios');  //for connecting to internet and posting
const cron = require('node-cron');  //for scheduling



const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID
;

const postPhoto = async (imageUrl, caption) => {
  try {
        const response = await axios.post(
      `https://graph.facebook.com/v12.0/${USER_ID}/media`,
        {
        image_url: imageUrl,
        caption: caption,
        access_token: ACCESS_TOKEN,
      }
    );

const creationId = response.data.id;

    
    await axios.post(
      `https://graph.facebook.com/v12.0/${USER_ID}/media_publish`,
      {
        creation_id: creationId,
        access_token: ACCESS_TOKEN,
      });

    console.log('Posted photo:', caption);
  } 
  catch (error)
   {
    console.error('Error posting photo:', error.response.data);
  }};

// Scheduling
cron.schedule('0 12 * * *', () => {
  const imageUrl = '/home.jpeg';
  const caption = 'Carpe diem!';
  postPhoto(imageUrl, caption);
});

// Like scheduling
const likeMedia = async (mediaId) => {
  try {
    await axios.post(
      `https://graph.facebook.com/v12.0/${mediaId}/likes`,
      {
        access_token: ACCESS_TOKEN,
      }
    );
    console.log('Liked post:', mediaId);
  } catch (error) {
    console.error('Error occured:', error.response.data);
  }
};

// commenting
const commentOnMedia = async (mediaId, comment) => {
  try {
    await axios.post(
      `https://graph.facebook.com/v12.0/${mediaId}/comments`,
      {
        message: comment,
        access_token: ACCESS_TOKEN,
      }
    );
    console.log('Commented :', mediaId);
  } catch (error) {
    console.error('Error occured:', error.response.data);
  }
};


likeMedia('media_id_here');
commentOnMedia('media_id_here', 'This post looks lovely !');

export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'ADMIN Controls: Toogle if Tweet is deemed inappropriate',
      type:'boolean'
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Profile image',
      type: 'string',
    },
   
  ],

  
}

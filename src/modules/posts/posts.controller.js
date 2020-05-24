exports.getAllPosts = (req, res, next) => {
  return res.send({
    posts: [
      {
        title: 'new post',
        body:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
      },
    ],
  });
};

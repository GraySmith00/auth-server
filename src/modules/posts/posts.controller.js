const posts = [
  {
    id: '1',
    title: 'Post 1',
    body:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
  },
  {
    id: '2',
    title: 'Post 2',
    body:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
  },
  {
    id: '3',
    title: 'Post 3',
    body:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
  },
  {
    id: '4',
    title: 'Post 4',
    body:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
  },
  {
    id: '5',
    title: 'Post 5',
    body:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia vel delectus suscipit ex dolore ipsa odio iure a id quis.',
  },
];

exports.getAllPosts = (req, res) => {
  return res.send({
    posts,
  });
};

exports.getPostById = (req, res) => {
  const post = posts.find((post) => post.id === req.params.id);

  if (!post) {
    return res
      .status(404)
      .send({ error: `No post found with id: ${req.params.id}` });
  }
  return res.status(200).send(post);
};

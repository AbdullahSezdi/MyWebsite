// Blog yazılarını getir
app.get('/api/blogs', (req, res) => {
  try {
    const blogs = require('./data/blogs/blog-posts.json');
    res.json(blogs);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}); 
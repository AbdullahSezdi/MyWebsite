const fs = require('fs').promises;
const path = require('path');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const files = await fs.readdir(blogsDir);
    const blogs = [];

    for (const file of files) {
      if (file.endsWith('.json') && file !== 'blog-posts.json' && !file.startsWith('.')) {
        const content = await fs.readFile(path.join(blogsDir, file), 'utf8');
        const blog = JSON.parse(content);
        blogs.push(blog);
      }
    }

    // Sort blogs by publish date in descending order
    blogs.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    
    res.json(blogs);
  } catch (error) {
    console.error('Blog okuma hatası:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const files = await fs.readdir(blogsDir);
    const targetFile = files.find(file => file === `${req.params.slug}.json`);

    if (!targetFile) {
      return res.status(404).json({ message: 'Blog bulunamadı' });
    }

    const content = await fs.readFile(path.join(blogsDir, targetFile), 'utf8');
    const blog = JSON.parse(content);
    res.json(blog);
  } catch (error) {
    console.error('Blog okuma hatası:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = req.body;
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const filePath = path.join(blogsDir, `${blog.slug}.json`);

    await fs.writeFile(filePath, JSON.stringify(blog, null, 2));
    res.status(201).json(blog);
  } catch (error) {
    console.error('Blog yazma hatası:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const filePath = path.join(blogsDir, `${req.params.slug}.json`);

    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!exists) {
      return res.status(404).json({ message: 'Blog bulunamadı' });
    }

    const blog = { ...req.body, slug: req.params.slug };
    await fs.writeFile(filePath, JSON.stringify(blog, null, 2));
    res.json(blog);
  } catch (error) {
    console.error('Blog güncelleme hatası:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const filePath = path.join(blogsDir, `${req.params.slug}.json`);

    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!exists) {
      return res.status(404).json({ message: 'Blog bulunamadı' });
    }

    await fs.unlink(filePath);
    res.json({ message: 'Blog başarıyla silindi' });
  } catch (error) {
    console.error('Blog silme hatası:', error);
    res.status(500).json({ message: error.message });
  }
}; 
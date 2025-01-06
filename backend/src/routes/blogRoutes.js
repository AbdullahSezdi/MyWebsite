const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get single blog by slug
router.get('/:slug', blogController.getBlogBySlug);

// Create new blog
router.post('/', blogController.createBlog);

// Update blog
router.put('/:slug', blogController.updateBlog);

// Delete blog
router.delete('/:slug', blogController.deleteBlog);

module.exports = router; 
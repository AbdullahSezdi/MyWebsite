require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const Blog = require('../models/Blog');

async function seedBlogs() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('MongoDB\'ye başarıyla bağlandı');

    // Mevcut blog yazılarını temizle
    await Blog.deleteMany({});
    console.log('Mevcut blog yazıları temizlendi');

    // Blog yazılarını oku
    const blogsDir = path.join(__dirname, '../../data/blogs');
    const files = await fs.readdir(blogsDir);
    
    // JSON dosyalarını filtrele
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // Her dosyayı oku ve veritabanına ekle
    for (const file of jsonFiles) {
      const filePath = path.join(blogsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const blogData = JSON.parse(fileContent);
      
      await Blog.create(blogData);
      console.log(`${file} başarıyla eklendi`);
    }

    console.log('Blog yazıları başarıyla eklendi');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedBlogs(); 
'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Örnek blog yazıları
const posts = [
  {
    id: 1,
    title: 'Yapay Zeka ve Veri Biliminin Geleceği',
    summary: 'Yapay zeka ve veri bilimi alanındaki son gelişmeler ve gelecek trendleri hakkında detaylı bir analiz.',
    category: 'Yapay Zeka',
    tags: ['AI', 'Machine Learning', 'Future Tech'],
    image: '/blog/ai-future.svg',
    publishDate: '2024-02-20',
    readTime: '8 dk',
    slug: 'yapay-zeka-ve-veri-biliminin-gelecegi'
  },
  {
    id: 2,
    title: 'Python ile Veri Analizi: Pandas ve NumPy',
    summary: 'Python\'da veri analizi için kullanılan temel kütüphaneler ve pratik örneklerle kullanımları.',
    category: 'Veri Analizi',
    tags: ['Python', 'Pandas', 'NumPy'],
    image: '/blog/python-data-analysis.svg',
    publishDate: '2024-02-15',
    readTime: '10 dk',
    slug: 'python-ile-veri-analizi'
  },
  {
    id: 3,
    title: 'Deep Learning Modelleri ve Transfer Learning',
    summary: 'Derin öğrenme modellerinin transfer learning ile eğitilmesi ve pratik uygulamaları.',
    category: 'Deep Learning',
    tags: ['Neural Networks', 'Transfer Learning', 'PyTorch'],
    image: '/blog/deep-learning.svg',
    publishDate: '2024-02-10',
    readTime: '12 dk',
    slug: 'deep-learning-modelleri'
  }
]

const categories = ['Tümü', 'Yapay Zeka', 'Veri Analizi', 'Deep Learning', 'Machine Learning']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtreleme fonksiyonu
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <AnimatedSection className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400"
            >
              Veri bilimi, yapay zeka ve yazılım geliştirme üzerine yazılar
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Yazı veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded dark:bg-blue-900 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
} 
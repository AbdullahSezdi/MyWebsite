'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Blog {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
}

const categories = ['Tümü', 'Yapay Zeka', 'Veri Analizi', 'Deep Learning', 'Machine Learning']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        if (!response.ok) {
          throw new Error('Blog yazıları yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Blog yazıları yüklenirken bir hata oluştu');
        console.error('Blog yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filtreleme fonksiyonu
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Bir şeyler yanlış gitti!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

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
              {categories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
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
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              {loading ? 'Blog yazıları yükleniyor...' : 'Henüz blog yazısı bulunmuyor.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={`${post.slug}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/blog/default.svg';
                          }}
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>{new Date(post.publishDate).toLocaleDateString('tr-TR')}</span>
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
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
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
          )}
        </div>
      </AnimatedSection>
    </div>
  )
} 
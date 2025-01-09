'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'
import Image from 'next/image'
import { IoCalendarOutline, IoTimeOutline, IoFolderOpenOutline, IoSearchOutline } from 'react-icons/io5'

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

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<Blog[]>([])
  const [categories, setCategories] = useState<string[]>(['Tümü'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/data/blogs/blog-posts.json')
        if (!response.ok) {
          throw new Error('Blog yazıları yüklenirken bir hata oluştu')
        }
        const data = await response.json() as Blog[]
        setPosts(data)
        
        // Kategorileri blog verilerinden otomatik olarak çıkaralım
        const uniqueCategories = Array.from(new Set(data.map(post => post.category)))
        setCategories(['Tümü', ...uniqueCategories])
        
        setLoading(false)
      } catch (err) {
        setError('Blog yazıları yüklenirken bir hata oluştu')
        setLoading(false)
        console.error('Blog yükleme hatası:', err)
      }
    }

    fetchBlogPosts()
  }, [])

  // Filtreleme fonksiyonu
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <AnimatedSection className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Veri bilimi, yapay zeka ve yazılım geliştirme üzerine yazılar
          </p>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IoSearchOutline className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Yazı veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
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
              Arama kriterlerinize uygun blog yazısı bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div
                  key={`${post.slug}-${index}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* @ts-ignore */}
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {post.image && (
                        // @ts-ignore
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/blog/default.svg';
                          }}
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <IoCalendarOutline className="w-4 h-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoTimeOutline className="w-4 h-4" />
                          <span>{post.readTime} dk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoFolderOpenOutline className="w-4 h-4" />
                          <span>{post.category}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  )
} 
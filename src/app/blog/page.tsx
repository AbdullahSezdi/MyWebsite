'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { IoCalendarOutline, IoTimeOutline, IoSearchOutline } from 'react-icons/io5'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<Blog[]>([])
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
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
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
      
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-md mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Yazılarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-b border-gray-300 dark:border-gray-700 
                       bg-transparent text-gray-900 dark:text-white
                       focus:border-gray-900 dark:focus:border-gray-100
                       transition-colors duration-200"
            />
          </div>
        </div>
      </header>

      {/* Blog Posts List */}
      <main className="max-w-screen-md mx-auto px-4 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            Arama kriterlerinize uygun blog yazısı bulunamadı.
          </div>
        ) : (
          <div className="space-y-12">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Post Image */}
                    <div className="relative w-full md:w-1/3 aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/blog/default.svg';
                        }}
                      />
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <IoCalendarOutline className="w-4 h-4" />
                          <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <IoTimeOutline className="w-4 h-4" />
                          <span>{post.readTime} dk okuma</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 
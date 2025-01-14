'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { IoCalendarOutline, IoTimeOutline, IoArrowBack } from 'react-icons/io5'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import type { ReactNode } from 'react'

interface Blog {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
  content: string;
}

interface CodeProps {
  className?: string;
  children: ReactNode;
}

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/data/blogs/${params.slug}.json`)
        if (!response.ok) {
          throw new Error('Blog yazısı yüklenirken bir hata oluştu')
        }
        const data = await response.json()
        setPost(data)
        setLoading(false)
      } catch (err) {
        setError('Blog yazısı yüklenirken bir hata oluştu')
        setLoading(false)
        console.error('Blog yükleme hatası:', err)
      }
    }

    fetchBlogPost()
  }, [params.slug])

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

  if (error || !post) {
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <IoArrowBack className="w-4 h-4" />
            Blog'a dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-[60vh] min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <IoArrowBack className="w-4 h-4" />
            Blog'a dön
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-screen-md mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
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

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="max-w-screen-md mx-auto px-4 py-12">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] -mt-32 mb-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/blog/default.svg';
            }}
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { className, children } = props
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : ''
                const isInline = !match

                if (isInline) {
                  return <code className={className}>{children}</code>
                }

                return (
                  <div className="relative">
                    <div className="absolute right-4 top-4 text-xs text-gray-400 font-mono">
                      {language}
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      className="rounded-lg !mt-0 !bg-gray-900"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
} 
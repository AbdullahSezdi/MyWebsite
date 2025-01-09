'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { motion } from 'framer-motion'
import { IoCalendarOutline, IoTimeOutline, IoArrowBack } from 'react-icons/io5'
import Navbar from '@/components/layout/Navbar'

// Component aliases to fix TypeScript errors
const Image = NextImage as any
const Link = NextLink as any
const MotionDiv = motion.div as any
const CodeHighlighter = SyntaxHighlighter as any
const MarkdownRenderer = ReactMarkdown as any

interface BlogPost {
  slug: string
  title: string
  content: string
  publishDate: string
  readTime: string
  image: string
  category: string
  tags: string[]
  summary: string
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/data/blogs/${params.slug}.json`)
        if (!response.ok) throw new Error('Blog yazısı bulunamadı')
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError('Blog yazısı yüklenirken bir hata oluştu')
        console.error('Blog yükleme hatası:', err)
      }
    }
    fetchBlogPost()
  }, [params.slug])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Bir şeyler yanlış gitti!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <IoArrowBack className="mr-2" />
          Blog'a Dön
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            {post.summary}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <IoCalendarOutline className="w-4 h-4" />
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-4 h-4" />
              <span>{post.readTime} dk okuma</span>
            </div>
          </div>
        </MotionDiv>
      </header>

      {/* Featured Image */}
      <div className="w-full aspect-[21/9] relative mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="relative">
                    <div className="absolute right-4 top-4 text-xs text-gray-400 font-mono">
                      {match[1]}
                    </div>
                    <CodeHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg !mt-0 !bg-gray-900"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </CodeHighlighter>
                  </div>
                ) : (
                  <code className={`${className} px-1.5 py-0.5 rounded-md`} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </MarkdownRenderer>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
} 
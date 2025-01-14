import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: {
    slug: string
    title: string
    summary: string
    category: string
    readTime: string
    publishDate: string
    image: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="group bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="relative aspect-[16/9] overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/blog/default.svg';
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white bg-blue-500/80 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          {[
            { id: 'date', content: formattedDate },
            { id: 'dot', content: '•' },
            { id: 'readTime', content: `${post.readTime} dk okuma` }
          ].map(item => (
            <div key={`${post.slug}-${item.id}`}>{item.content}</div>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {post.summary}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <div className="flex items-center">
            <span>Devamını Oku</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
} 
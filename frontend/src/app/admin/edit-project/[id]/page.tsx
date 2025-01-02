'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { HiArrowLeft } from 'react-icons/hi'

// Dynamic import for the markdown editor
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface Project {
  id: number
  title: string
  shortDescription: string
  technologies: string
  category: string
  thumbnail: File | string | null
  projectDetails: {
    problem: string
    solution: string
    methodology: string
    results: string
    conclusions: string
  }
  links: {
    github: string
    demo: string
    documentation: string
  }
  charts: (File | string)[]
  createdAt: string
}

interface ProjectResponse {
  id: number
  title: string
  shortDescription: string
  technologies: string
  category: string
  thumbnail: string | null
  projectDetails: {
    problem: string
    solution: string
    methodology: string
    results: string
    conclusions: string
  }
  links: {
    github: string
    demo: string
    documentation: string
  }
  charts: string[]
  createdAt: string
}

export default function EditProject() {
  const params = useParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Project | null>(null)

  useEffect(() => {
    // Load project data
    const loadProject = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/projects/${params.id}`)
        if (!response.ok) {
          throw new Error('Proje yüklenirken bir hata oluştu')
        }
        const data: ProjectResponse = await response.json()
        
        // Convert response to form data format
        setFormData({
          ...data,
          thumbnail: data.thumbnail,
          charts: data.charts
        })
      } catch (error) {
        console.error('Error loading project:', error)
        router.push('/admin')
      }
    }

    if (params.id) {
      loadProject()
    }
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return

    const { name, value } = e.target
    
    // URL'lerin başında http:// veya https:// yoksa ekle
    let finalValue = value
    if (name.startsWith('links.') && value && !value.match(/^https?:\/\//)) {
      finalValue = `https://${value}`
    }

    if (name.includes('.')) {
      const [section, field] = name.split('.')
      setFormData(prev => {
        if (!prev) return prev
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as Record<string, unknown>),
            [field]: finalValue
          }
        }
      })
    } else {
      setFormData(prev => prev ? { ...prev, [name]: finalValue } : prev)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!formData) return

    const files = e.target.files
    if (field === 'charts' && files) {
      const fileUrls = Array.from(files)
      setFormData(prev => prev ? {
        ...prev,
        charts: fileUrls
      } : prev)
    } else if (field === 'thumbnail' && files?.[0]) {
      setFormData(prev => prev ? {
        ...prev,
        thumbnail: files[0]
      } : prev)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)

    try {
      // Form verilerini hazırla
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('technologies', formData.technologies)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('projectDetails', JSON.stringify(formData.projectDetails))
      formDataToSend.append('links', JSON.stringify(formData.links))

      if (formData.thumbnail && formData.thumbnail instanceof File) {
        formDataToSend.append('thumbnail', formData.thumbnail)
      }

      if (formData.charts) {
        formData.charts.forEach((chart, index) => {
          if (chart instanceof File) {
            formDataToSend.append(`charts`, chart)
          }
        })
      }

      // Backend'e gönder
      const response = await fetch(`http://localhost:5001/api/projects/${params.id}`, {
        method: 'PUT',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Proje güncellenirken bir hata oluştu')
      }

      // Admin paneline geri dön
      router.push('/admin')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Proje güncellenirken bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Proje yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <HiArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projeyi Düzenle</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Temel Bilgiler */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Temel Bilgiler</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proje Adı
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kısa Açıklama
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  <option value="yapay-zeka">Yapay Zeka</option>
                  <option value="veri-bilimi">Veri Bilimi</option>
                  <option value="makine-ogrenmesi">Makine Öğrenmesi</option>
                  <option value="derin-ogrenme">Derin Öğrenme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kullanılan Teknolojiler
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="Python, TensorFlow, scikit-learn, pandas"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proje Görseli
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="h-32 w-auto rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proje Detayları */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Proje Detayları</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Problem Tanımı
                </label>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Aşağıdaki başlıkları detaylı olarak açıklayınız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Projenin çözdüğü temel problem</li>
                    <li>Bu problemin önemi ve etkisi</li>
                    <li>Mevcut çözümlerin eksiklikleri</li>
                    <li>Hedef kullanıcı kitlesi</li>
                    <li>Problem hangi sektör veya alanı etkilemektedir</li>
                  </ul>
                  <p className="italic mt-2">Not: Madde işaretleri (•) kullanarak veya numaralandırarak yazabilirsiniz.</p>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.problem}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.problem', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.problem}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.problem', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Çözüm Yaklaşımı
                </label>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Aşağıdaki başlıkları detaylı olarak açıklayınız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Geliştirdiğiniz çözümün genel yaklaşımı</li>
                    <li>Çözümünüzü benzersiz kılan özellikler</li>
                    <li>Hangi teknolojileri neden seçtiniz</li>
                    <li>Çözümünüzün ana bileşenleri</li>
                    <li>Kullanıcılara sağladığınız temel faydalar</li>
                  </ul>
                  <p className="italic mt-2">Not: Madde işaretleri (•) kullanarak veya numaralandırarak yazabilirsiniz.</p>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.solution}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.solution', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.solution}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.solution', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Metodoloji
                </label>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Aşağıdaki başlıkları detaylı olarak açıklayınız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Projenin geliştirme aşamaları</li>
                    <li>Kullanılan teknolojiler ve araçların detaylı açıklaması</li>
                    <li>Veri toplama ve işleme yöntemleri</li>
                    <li>Algoritma ve model seçimleri</li>
                    <li>Karşılaşılan teknik zorluklar ve çözümleri</li>
                    <li>Sistem mimarisi ve bileşenleri</li>
                    <li>Test ve doğrulama yöntemleri</li>
                  </ul>
                  <p className="italic mt-2">Not: Madde işaretleri (•) kullanarak veya numaralandırarak yazabilirsiniz.</p>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.methodology}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.methodology', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.methodology}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.methodology', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sonuçlar
                </label>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Aşağıdaki başlıkları detaylı olarak açıklayınız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Projenin ölçülebilir sonuçları</li>
                    <li>Performans metrikleri ve başarı göstergeleri</li>
                    <li>A/B test sonuçları (varsa)</li>
                    <li>Kullanıcı geri bildirimleri ve değerlendirmeleri</li>
                    <li>Projenin etkisi ve katma değeri</li>
                    <li>İyileştirme önerileri ve gözlemler</li>
                  </ul>
                  <p className="italic mt-2">Not: Madde işaretleri (•) kullanarak veya numaralandırarak yazabilirsiniz.</p>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.results}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.results', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.results}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.results', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Çıkarımlar ve Sonuç
                </label>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Aşağıdaki başlıkları detaylı olarak açıklayınız:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Projeden çıkarılan ana dersler</li>
                    <li>Gelecekte yapılabilecek iyileştirmeler</li>
                    <li>Potansiyel yeni özellikler ve genişleme planları</li>
                    <li>Projenin sürdürülebilirliği</li>
                    <li>Benzer projeler için öneriler</li>
                    <li>Projenin geleceğe yönelik vizyonu</li>
                  </ul>
                  <p className="italic mt-2">Not: Madde işaretleri (•) kullanarak veya numaralandırarak yazabilirsiniz.</p>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.conclusions}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.conclusions', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.conclusions}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.conclusions', value: value || '' }
                    } as any)}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grafikler ve Görseller */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Grafikler ve Görseller</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grafik ve Görselleri Yükle
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'charts')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {formData.charts.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.charts.map((chart, index) => (
                    <img
                      key={index}
                      src={chart}
                      alt={`Chart ${index + 1}`}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Faydalı Linkler */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Faydalı Linkler</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Repo
                </label>
                <input
                  type="url"
                  name="links.github"
                  value={formData.links.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Demo URL
                </label>
                <input
                  type="url"
                  name="links.demo"
                  value={formData.links.demo}
                  onChange={handleInputChange}
                  placeholder="https://demo.example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dokümantasyon
                </label>
                <input
                  type="url"
                  name="links.documentation"
                  value={formData.links.documentation}
                  onChange={handleInputChange}
                  placeholder="https://docs.example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { HiArrowLeft } from 'react-icons/hi'

// Dynamic import for the markdown editor
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewProject() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    technologies: '',
    category: '',
    thumbnail: null as File | null,
    projectDetails: {
      problem: '',
      solution: '',
      methodology: '',
      results: '',
      conclusions: ''
    },
    links: {
      github: '',
      demo: '',
      documentation: ''
    },
    charts: [] as File[]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // URL'lerin başında http:// veya https:// yoksa ekle
    let finalValue = value
    if (name.startsWith('links.') && value && !value.match(/^https?:\/\//)) {
      finalValue = `https://${value}`
    }

    if (name.includes('.')) {
      const [section, field] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: finalValue
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: finalValue }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files
    if (field === 'charts' && files) {
      setFormData(prev => ({
        ...prev,
        charts: [...Array.from(files)]
      }))
    } else if (field === 'thumbnail' && files?.[0]) {
      setFormData(prev => ({
        ...prev,
        thumbnail: files[0]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Yeni projeyi hazırla
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('shortDescription', formData.shortDescription)
      formDataToSend.append('technologies', formData.technologies)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('projectDetails', JSON.stringify(formData.projectDetails))
      formDataToSend.append('links', JSON.stringify(formData.links))

      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail)
      }

      formData.charts.forEach((chart, index) => {
        formDataToSend.append(`charts`, chart)
      })

      // Backend'e gönder
      const response = await fetch('http://localhost:5001/api/projects', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Proje kaydedilirken bir hata oluştu')
      }

      // Admin paneline geri dön
      router.push('/admin')
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Proje kaydedilirken bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni Proje</h1>
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
                  <p className="italic mt-2">Formatlamayı aşağıdaki şekilde yapabilirsiniz:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Ana başlıklar için: 1. Başlık, 2. Başlık şeklinde numaralandırma</li>
                    <li>Alt maddeler için: • işareti ile maddeleme</li>
                    <li>Detaylı açıklamalar için: Normal paragraflar</li>
                    <li>Önemli noktaları vurgulamak için: **kalın** veya *italik* yazı</li>
                  </ul>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.problem}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.problem', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.problem}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.problem', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
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
                  <p className="italic mt-2">Formatlamayı aşağıdaki şekilde yapabilirsiniz:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Ana başlıklar için: 1. Başlık, 2. Başlık şeklinde numaralandırma</li>
                    <li>Alt maddeler için: • işareti ile maddeleme</li>
                    <li>Detaylı açıklamalar için: Normal paragraflar</li>
                    <li>Önemli noktaları vurgulamak için: **kalın** veya *italik* yazı</li>
                  </ul>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.solution}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.solution', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.solution}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.solution', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
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
                  <p className="italic mt-2">Formatlamayı aşağıdaki şekilde yapabilirsiniz:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Ana başlıklar için: 1. Başlık, 2. Başlık şeklinde numaralandırma</li>
                    <li>Alt maddeler için: • işareti ile maddeleme</li>
                    <li>Detaylı açıklamalar için: Normal paragraflar</li>
                    <li>Önemli noktaları vurgulamak için: **kalın** veya *italik* yazı</li>
                  </ul>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.methodology}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.methodology', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.methodology}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.methodology', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
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
                  <p className="italic mt-2">Formatlamayı aşağıdaki şekilde yapabilirsiniz:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Ana başlıklar için: 1. Başlık, 2. Başlık şeklinde numaralandırma</li>
                    <li>Alt maddeler için: • işareti ile maddeleme</li>
                    <li>Detaylı açıklamalar için: Normal paragraflar</li>
                    <li>Önemli noktaları vurgulamak için: **kalın** veya *italik* yazı</li>
                  </ul>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.results}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.results', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.results}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.results', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
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
                  <p className="italic mt-2">Formatlamayı aşağıdaki şekilde yapabilirsiniz:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Ana başlıklar için: 1. Başlık, 2. Başlık şeklinde numaralandırma</li>
                    <li>Alt maddeler için: • işareti ile maddeleme</li>
                    <li>Detaylı açıklamalar için: Normal paragraflar</li>
                    <li>Önemli noktaları vurgulamak için: **kalın** veya *italik* yazı</li>
                  </ul>
                </div>
                <div data-color-mode="light" className="dark:hidden">
                  <MDEditor
                    value={formData.projectDetails.conclusions}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.conclusions', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
                  />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <MDEditor
                    value={formData.projectDetails.conclusions}
                    onChange={(value) => handleInputChange({
                      target: { name: 'projectDetails.conclusions', value: value || '' }
                    } as any)}
                    height={400}
                    preview="edit"
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
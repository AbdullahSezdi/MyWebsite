require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Project = require('../models/Project');

const sampleProjects = [
  {
    title: "BG/NBD ve Gamma-Gamma Modelleri ile CLTV Tahmini",
    shortDescription: "FLO için BG/NBD ve Gamma-Gamma modellerini kullanarak Müşteri Yaşam Boyu Değeri (CLTV) tahmin modeli geliştirdim. Müşterileri CLTV'ye göre segmentlere ayırarak, yüksek değerli ve riskli segmentler için stratejik müşteri tutundurma aksiyonları önerdim.",
    technologies: "Python, Lifetimes, İstatistiksel Modelleme, Tahminsel Analitik, Veri Görselleştirme",
    category: "Veri Bilimi",
    thumbnail: "/images/projects/cltv-prediction.jpg",
    projectDetails: {
      problem: "Perakende sektöründe müşteri değerinin doğru tahmin edilmesi, şirketlerin kaynaklarını etkin kullanması ve müşteri ilişkilerini stratejik yönetmesi açısından kritik öneme sahiptir. FLO'nun karşılaştığı temel zorluk, müşterilerin gelecekteki değerlerini tahmin ederek, hangi müşterilere öncelik verilmesi ve hangi müşteriler için özel stratejiler geliştirilmesi gerektiğini belirlemekti.\n\nGeleneksel RFM analizi gibi geçmiş davranışlara dayalı yöntemler, müşterilerin gelecekteki potansiyelini tahmin etmekte yetersiz kalıyordu. Bu nedenle, daha sofistike ve ileriye dönük bir yaklaşıma ihtiyaç vardı.",
      solution: "Bu problemi çözmek için BG/NBD (Beta Geometric/Negative Binomial Distribution) ve Gamma-Gamma modellerini kullanarak kapsamlı bir CLTV tahmin sistemi geliştirdim. BG/NBD modeli, müşterilerin gelecekteki satın alma davranışlarını tahmin ederken, Gamma-Gamma modeli beklenen işlem değerlerini hesapladı.\n\nÇözümün ana bileşenleri:\n1. Veri ön işleme ve müşteri metriklerinin hesaplanması\n2. BG/NBD modeli ile satın alma sıklığı tahmini\n3. Gamma-Gamma modeli ile işlem değeri tahmini\n4. CLTV hesaplaması ve müşteri segmentasyonu\n5. Segment bazlı aksiyon önerileri",
      methodology: "Projenin metodolojisi şu adımları içerdi:\n\n1. Veri Hazırlama:\n- Eksik ve aykırı değerlerin temizlenmesi\n- Recency, Frequency, Monetary metriklerinin hesaplanması\n- Zaman bazlı özelliklerin çıkarılması\n\n2. Model Geliştirme:\n- BG/NBD modelinin eğitimi ve parametrelerinin optimizasyonu\n- Gamma-Gamma modelinin implementasyonu\n- Modellerin çapraz doğrulama ile değerlendirilmesi\n\n3. CLTV Hesaplama:\n- 6 aylık tahminler için model predictions\n- Segment eşiklerinin belirlenmesi\n- Müşterilerin segmentlere atanması",
      results: "Proje sonucunda elde edilen başlıca başarılar:\n\n1. Tahmin Doğruluğu:\n- Satın alma sıklığı tahminlerinde %85 doğruluk\n- İşlem değeri tahminlerinde %78 doğruluk\n- CLTV tahminlerinde %80 üzeri başarı\n\n2. İş Etkisi:\n- Yüksek değerli müşterilerin %90'ı doğru tanımlandı\n- Churn riski olan müşterilerin %75'i önceden tespit edildi\n- Pazarlama ROI'sinde %25 artış sağlandı",
      conclusions: "Proje, müşteri değeri tahmininde makine öğrenimi ve istatistiksel modellemenin gücünü başarıyla gösterdi. Önemli çıkarımlar:\n\n1. Probabilistik modeller, müşteri davranışlarını tahmin etmede deterministik yöntemlerden daha başarılı\n2. Segment bazlı stratejiler, genel yaklaşımlardan daha etkili\n3. Sürekli model güncellemesi ve yeni veri ile beslemesi önemli\n\nGelecek adımlar:\n- Real-time tahmin sistemine geçiş\n- Derin öğrenme modellerinin entegrasyonu\n- Kişiselleştirilmiş pazarlama otomasyonu"
    },
    links: {
      github: "https://github.com/yourusername/cltv-prediction",
      demo: "https://example.com/cltv-demo"
    }
  },
  {
    title: "RFM Analizi ile Müşteri Segmentasyonu",
    shortDescription: "FLO'nun omnichannel veri setinde RFM (Recency, Frequency, Monetary) analizi kullanarak müşteri segmentasyonu gerçekleştirdim. Farklı müşteri segmentleri tanımlayarak, yüksek değerli müşterilerin korunması için veri odaklı pazarlama stratejileri geliştirdim.",
    technologies: "Python, Pandas, Scikit-learn, RFM Analizi, Veri Görselleştirme, İstatistiksel Analiz",
    category: "Veri Analizi",
    thumbnail: "/images/projects/rfm-analysis.jpg",
    links: {
      github: "https://github.com/AbdullahSezdi/Customer-Segmentation-with-RFM",
      demo: ""
    },
    projectDetails: {
      problem: "FLO'nun müşterilerini etkili bir şekilde segmentlere ayırarak hedefli pazarlama stratejileri oluşturma ihtiyacı vardı.",
      solution: "Müşteri satın alma davranışlarına göre segmentlere ayırmak için RFM analizi uyguladım.",
      methodology: "Veri işleme için Python ve Pandas kullandım, RFM metrikleri hesaplaması yaptım.",
      results: "Müşteriler belirli özelliklere sahip farklı gruplara başarıyla ayrıldı.",
      conclusions: "Hedefli stratejiler sayesinde pazarlama kampanyalarının etkinliği artırıldı."
    }
  },
  {
    title: "Iyzico için Zaman Serisi Analizi ile İşlem Hacmi Tahmini",
    shortDescription: "Iyzico'nun iş ortakları için LightGBM kullanarak günlük işlem hacmi tahmini yaptım. Gelişmiş özellik mühendisliği (lag özellikleri, hareketli ortalama vb.) kullanarak, özel kayıp fonksiyonları ve çapraz doğrulama teknikleri ile kısa vadeli tahminler gerçekleştirdim.",
    technologies: "Python, LightGBM, Zaman Serisi Analizi, Özellik Mühendisliği, Çapraz Doğrulama",
    category: "Makine Öğrenmesi",
    thumbnail: "/images/projects/time-series.jpg",
    links: {
      github: "https://github.com/AbdullahSezdi/Iyzico-Time-Series",
      demo: ""
    },
    projectDetails: {
      problem: "Iyzico'nun planlama için doğru işlem hacmi tahminlerine ihtiyacı vardı.",
      solution: "LightGBM kullanarak zaman serisi tahmin modeli geliştirdim.",
      methodology: "Gelişmiş özellik mühendisliği ve özel kayıp fonksiyonları uyguladım.",
      results: "Kısa vadeli işlem hacmi tahminlerinde yüksek doğruluk elde edildi.",
      conclusions: "Operasyonel karar verme ve finansal planlama iyileştirildi."
    }
  },
  {
    title: "Amazon Yorumları Üzerinde Duygu Analizi",
    shortDescription: "Kozmos için Amazon yorumlarında duygu analizi gerçekleştirdim. Duygu çıkarımı ve yerelleştirme/küreselleştirme için NLTK kullanarak yorumları işledim. Müşteri duygularını belirlemek için sınıflandırma modelleri (Lojistik Regresyon, Random Forest) geliştirerek, hedefli ürün iyileştirmeleri yapılmasına ve müşteri memnuniyetinin artırılmasına katkıda bulundum.",
    technologies: "Python, NLTK, Makine Öğrenmesi, NLP, Scikit-learn, Metin İşleme",
    category: "Doğal Dil İşleme",
    thumbnail: "/images/projects/sentiment-analysis.jpg",
    links: {
      github: "https://github.com/AbdullahSezdi/Amazon-Sentiment-Analysis",
      demo: ""
    },
    projectDetails: {
      problem: "Amazon yorumlarından müşteri duygularının analiz edilmesi gerekiyordu.",
      solution: "NLP tabanlı duygu analizi modeli geliştirdim.",
      methodology: "Metin sınıflandırması için NLTK ve makine öğrenimi kullandım.",
      results: "Müşteri duyguları yüksek doğrulukla tespit edildi.",
      conclusions: "Ürün iyileştirme için değerli içgörüler sağlandı."
    }
  },
  {
    title: "Armut için Birliktelik Kuralı Tabanlı Öneri Sistemi",
    shortDescription: "Armut platformu için Birliktelik Kuralı Öğrenimi (ARL) ile öneri sistemi geliştirdim. Aylık kullanıcı hizmet geçmişinden 'sepetler' oluşturarak, sık satın alınan hizmet kombinasyonlarına dayalı hizmet önerileri ürettim. Bu sistem kullanıcı etkileşimini artırdı ve çapraz satış fırsatlarını geliştirdi.",
    technologies: "Python, Birliktelik Kuralı Öğrenimi, Market Sepet Analizi, Öneri Sistemleri",
    category: "Öneri Sistemleri",
    thumbnail: "/images/projects/recommender-system.jpg",
    links: {
      github: "https://github.com/AbdullahSezdi/Armut-ARL-Recommender",
      demo: ""
    },
    projectDetails: {
      problem: "Armut'un hizmet önerilerini iyileştirmesi gerekiyordu.",
      solution: "Birliktelik kuralı tabanlı öneri sistemi uyguladım.",
      methodology: "Hizmet kombinasyonlarına market sepet analizi uyguladım.",
      results: "Çapraz satış ve kullanıcı etkileşimi arttı.",
      conclusions: "Hizmet keşfi ve satışlar başarıyla iyileştirildi."
    }
  },
  {
    title: "Makine Öğrenmesi ve Gelişmiş Özellik Mühendisliği ile Ev Fiyat Tahmini",
    shortDescription: "XGBoost ve Random Forest kullanarak yüksek doğruluklu ev fiyat tahmini modeli geliştirdim. Veri normalizasyonu ve one-hot encoding ile 80'den fazla özelliği işleyerek kapsamlı özellik mühendisliği uyguladım. Hiperparametre optimizasyonu ile modeli iyileştirerek gayrimenkul değerleme faktörleri hakkında hassas içgörüler sağladım.",
    technologies: "Python, XGBoost, Random Forest, Özellik Mühendisliği, Hiperparametre Optimizasyonu",
    category: "Makine Öğrenmesi",
    thumbnail: "/images/projects/house-price.jpg",
    links: {
      github: "https://github.com/AbdullahSezdi/House-Price-Prediction",
      demo: ""
    },
    projectDetails: {
      problem: "Gayrimenkulde doğru fiyat tahminlerine ihtiyaç vardı.",
      solution: "Özellik mühendisliği ile gelişmiş regresyon modeli geliştirdim.",
      methodology: "Ensemble metodları ve kapsamlı özellik işleme kullandım.",
      results: "Fiyat tahminlerinde yüksek doğruluk elde edildi.",
      conclusions: "Gayrimenkul değerlemesi için değerli içgörüler sağlandı."
    }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB\'ye bağlandı');

    // Mevcut projeleri temizle
    await Project.deleteMany({});
    console.log('Mevcut projeler silindi');

    // Yeni projeleri ekle
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log('Projeler başarıyla eklendi:', createdProjects);

    mongoose.connection.close();
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedDatabase(); 
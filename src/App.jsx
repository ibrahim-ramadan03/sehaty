import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Hospital,
  MapPin,
  Menu,
  Pill,
  Search,
  ShieldCheck,
  Star,
  Stethoscope,
  X,
} from 'lucide-react'
import './App.css'

const doctors = [
  {
    name: 'د. سارة المصراتي',
    specialty: 'طب الأطفال',
    location: 'طرابلس · حي الأندلس',
    rating: '4.9',
    reviews: 128,
    price: '80 د.ل',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=85',
    available: 'اليوم، ٤:٣٠ م',
  },
  {
    name: 'د. أحمد الورفلي',
    specialty: 'طب القلب',
    location: 'بنغازي · البركة',
    rating: '4.8',
    reviews: 96,
    price: '100 د.ل',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=85',
    available: 'غداً، ١٠:٠٠ ص',
  },
  {
    name: 'د. مريم الترهوني',
    specialty: 'طب الأسنان',
    location: 'مصراتة · وسط المدينة',
    rating: '5.0',
    reviews: 74,
    price: '60 د.ل',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=85',
    available: 'اليوم، ٦:٠٠ م',
  },
]

const specialties = [
  { name: 'طب الأطفال', icon: Stethoscope, count: '٢٤ طبيب' },
  { name: 'طب القلب', icon: Heart, count: '١٨ طبيب' },
  { name: 'طب الأسنان', icon: BadgeCheck, count: '٣٢ طبيب' },
  { name: 'الجلدية', icon: ShieldCheck, count: '١٦ طبيب' },
  { name: 'طب العيون', icon: Search, count: '١٢ طبيب' },
  { name: 'العظام', icon: Hospital, count: '٢٠ طبيب' },
]

const pharmacies = [
  { name: 'صيدلية الشفاء', area: 'طرابلس · شارع النصر', stock: 'متوفر', distance: '١٫٢ كم', medications: ['بنادول', 'باراسيتامول'] },
  { name: 'صيدلية الحياة', area: 'طرابلس · حي الأندلس', stock: 'متوفر', distance: '٢٫٤ كم', medications: ['بنادول'] },
  { name: 'صيدلية الأمل', area: 'طرابلس · قرقارش', stock: 'كمية محدودة', distance: '٣٫١ كم', medications: ['باراسيتامول'] },
]

const navItems = [
  ['الرئيسية', '#home'],
  ['الأطباء', '#doctors'],
  ['المراكز الطبية', '#centers'],
  ['الصيدليات', '#pharmacies'],
  ['عن صحتي', '#about'],
]

function App() {
  const [activeTab, setActiveTab] = useState('الأطباء')
  const [specialty, setSpecialty] = useState('')
  const [city, setCity] = useState('')
  const [doctorQuery, setDoctorQuery] = useState('')
  const [medicineQuery, setMedicineQuery] = useState('')
  const [bookingDoctor, setBookingDoctor] = useState(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [favoriteDoctors, setFavoriteDoctors] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [searchNotice, setSearchNotice] = useState('')

  const filteredDoctors = useMemo(() => {
    const query = doctorQuery.trim().toLowerCase()
    return doctors.filter((doctor) => {
      const matchesSpecialty = !specialty || doctor.specialty === specialty
      const matchesCity = !city || doctor.location.includes(city)
      const matchesQuery =
        !query ||
        `${doctor.name} ${doctor.specialty} ${doctor.location}`.toLowerCase().includes(query)
      return matchesSpecialty && matchesCity && matchesQuery
    })
  }, [city, doctorQuery, specialty])

  const filteredPharmacies = useMemo(() => {
    const query = medicineQuery.trim()
    if (!query) return []
    return pharmacies.filter((pharmacy) =>
      pharmacy.medications.some((medicine) => medicine.includes(query) || query.includes(medicine)),
    )
  }, [medicineQuery])

  const handleSearch = (event) => {
    event.preventDefault()
    if (activeTab === 'الأطباء') {
      setSearchNotice(
        filteredDoctors.length
          ? `وجدنا ${filteredDoctors.length} أطباء يناسبون بحثك`
          : 'لم نجد نتائج مطابقة. جرّب تغيير التخصص أو المدينة.',
      )
      document.querySelector('#doctors')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (activeTab === 'المراكز') {
      document.querySelector('#centers')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    document.querySelector('#pharmacies')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openBooking = (doctor) => {
    setBookingDoctor(doctor)
    setBookingConfirmed(false)
    setSelectedTime('')
  }

  const confirmBooking = (event) => {
    event.preventDefault()
    if (!selectedTime) return
    setBookingConfirmed(true)
  }

  const toggleFavorite = (name) => {
    setFavoriteDoctors((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
  }

  return (
    <div className="app-shell" dir="rtl">
      <div className="announcement">
        <span className="announcement-dot" />
        <span>صحتك أقرب مما تتخيل — اكتشف خدمات صحية موثوقة في مدينتك</span>
        <ArrowLeft size={14} aria-hidden="true" />
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="صحتي ليبيا - الرئيسية">
          <span className="brand-mark">
            <PlusMark />
          </span>
          <span className="brand-name">
            <strong>صحتي</strong>
            <small>SEHATY <i>LIBYA</i></small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="login-button" type="button" onClick={() => setSearchNotice('قريباً: تسجيل الدخول إلى ملفك الصحي.')}>
            تسجيل الدخول
          </button>
          <a className="header-cta" href="#doctors">
            احجز موعدك <ArrowUpLeft size={15} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="eyebrow-icon"><Heart size={14} fill="currentColor" /></span>
              <span>رعايتك الصحية، في مكان واحد</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              صحتك تستاهل
              <br />
              <span>رعاية أقرب.</span>
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              اكتشف أفضل الأطباء والمراكز الطبية في ليبيا، واحجز موعدك بكل سهولة واطمئنان.
            </motion.p>

            <motion.form
              className="search-panel"
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <div className="search-tabs" role="tablist" aria-label="نوع البحث">
                {[
                  ['الأطباء', Stethoscope],
                  ['المراكز', Hospital],
                  ['الصيدليات', Pill],
                ].map(([label, Icon]) => (
                  <button
                    className={activeTab === label ? 'search-tab active' : 'search-tab'}
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === label}
                    onClick={() => setActiveTab(label)}
                  >
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>
              <div className="search-fields">
                <label className="search-field query-field">
                  <Search size={18} />
                  <span className="sr-only">ابحث عن طبيب أو تخصص</span>
                  <input
                    value={activeTab === 'الصيدليات' ? medicineQuery : doctorQuery}
                    onChange={(event) => {
                      if (activeTab === 'الصيدليات') setMedicineQuery(event.target.value)
                      else setDoctorQuery(event.target.value)
                    }}
                    placeholder={activeTab === 'الصيدليات' ? 'اسم الدواء أو الصيدلية' : 'طبيب، تخصص، أو اسم مركز'}
                    aria-label="طبيب، تخصص، أو اسم مركز"
                  />
                </label>
                <label className="search-field select-field">
                  <MapPin size={17} />
                  <span className="sr-only">المدينة</span>
                  <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="اختر المدينة">
                    <option value="">كل المدن</option>
                    <option value="طرابلس">طرابلس</option>
                    <option value="بنغازي">بنغازي</option>
                    <option value="مصراتة">مصراتة</option>
                  </select>
                  <ChevronDown size={14} className="select-chevron" />
                </label>
                <label className="search-field select-field specialty-field">
                  <Stethoscope size={17} />
                  <span className="sr-only">التخصص</span>
                  <select value={specialty} onChange={(event) => setSpecialty(event.target.value)} aria-label="اختر التخصص">
                    <option value="">كل التخصصات</option>
                    {specialties.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="select-chevron" />
                </label>
                <button className="search-submit" type="submit">
                  ابحث الآن <ArrowLeft size={17} />
                </button>
              </div>
            </motion.form>

            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <img src={doctors[0].image} alt="" />
                <img src={doctors[1].image} alt="" />
                <img src={doctors[2].image} alt="" />
                <span>+</span>
              </div>
              <p><strong>رعاية تثق بها</strong><br />من مجتمعنا الليبي</p>
              <span className="proof-divider" />
              <span className="rating-stars"><Star size={14} fill="currentColor" /> ٤٫٩</span>
              <span className="proof-caption">تقييم المستخدمين</span>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <div className="hero-photo">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1100&q=90"
                alt="طبيبة ترحب بمريضة في عيادة حديثة"
              />
              <div className="photo-shade" />
              <div className="visual-caption">
                <span className="caption-icon"><ShieldCheck size={18} /></span>
                <span><strong>رعاية موثوقة</strong><small>لأن صحتك تهمنا</small></span>
                <span className="caption-check"><Check size={15} /></span>
              </div>
            </div>
            <motion.div
              className="floating-card appointment-float"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="float-icon"><CalendarDays size={18} /></span>
              <span><strong>حجز أسرع</strong><small>موعدك بخطوات بسيطة</small></span>
              <ArrowUpLeft size={15} className="float-arrow" />
            </motion.div>
            <div className="floating-card available-float">
              <span className="availability-dot" />
              <span><strong>أطباء متاحون</strong><small>في مدينتك الآن</small></span>
            </div>
            <div className="visual-decoration decoration-one" />
            <div className="visual-decoration decoration-two" />
          </motion.div>
          <div className="hero-orb" />
        </section>

        <section className="trust-strip" aria-label="أرقام صحتي">
          <div className="trust-item">
            <span className="trust-icon mint"><Stethoscope size={20} /></span>
            <span><strong>+٢٥٠</strong><small>طبيب ومختص</small></span>
          </div>
          <span className="trust-separator" />
          <div className="trust-item">
            <span className="trust-icon peach"><Hospital size={20} /></span>
            <span><strong>+٨٠</strong><small>مركز وعيادة</small></span>
          </div>
          <span className="trust-separator" />
          <div className="trust-item">
            <span className="trust-icon lilac"><MapPin size={20} /></span>
            <span><strong>١٢ مدينة</strong><small>في أنحاء ليبيا</small></span>
          </div>
          <span className="trust-separator" />
          <div className="trust-item trust-note">
            <span className="trust-icon gold"><ShieldCheck size={20} /></span>
            <span><strong>خصوصيتك أولاً</strong><small>بياناتك الصحية بأمان</small></span>
          </div>
        </section>

        <section className="specialties-section section-wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">رعاية لكل احتياج</span>
              <h2>تصفّح حسب <span>التخصص</span></h2>
            </div>
            <a className="text-link" href="#doctors">كل التخصصات <ArrowLeft size={16} /></a>
          </div>
          <div className="specialty-grid">
            {specialties.map(({ name, icon: Icon, count }, index) => (
              <motion.button
                className="specialty-card"
                type="button"
                key={name}
                onClick={() => {
                  setSpecialty(name)
                  setSearchNotice('')
                  document.querySelector('#doctors')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                style={{ '--card-delay': `${index * 50}ms` }}
              >
                <span className={`specialty-icon icon-tone-${index + 1}`}><Icon size={21} strokeWidth={1.8} /></span>
                <strong>{name}</strong>
                <small>{count}</small>
                <ArrowUpLeft size={15} className="specialty-arrow" />
              </motion.button>
            ))}
          </div>
        </section>

        <section className="doctors-section" id="doctors">
          <div className="section-wrap">
            <div className="section-heading doctors-heading">
              <div>
                <span className="section-kicker">اختيروا بعناية</span>
                <h2>أطباء <span>يثق بهم الناس</span></h2>
              </div>
              <a className="text-link" href="#doctors">اكتشف جميع الأطباء <ArrowLeft size={16} /></a>
            </div>
            {searchNotice && (
              <motion.div className="search-notice" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                <Check size={16} /> {searchNotice}
                <button type="button" aria-label="إغلاق" onClick={() => setSearchNotice('')}><X size={15} /></button>
              </motion.div>
            )}
            <div className="doctor-grid">
              {filteredDoctors.length ? filteredDoctors.map((doctor, index) => (
                <motion.article
                  className="doctor-card"
                  key={doctor.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="doctor-image-wrap">
                    <img className="doctor-image" src={doctor.image} alt={doctor.name} />
                    <span className="verified-badge"><BadgeCheck size={14} /> موثّق</span>
                    <button
                      type="button"
                      className={`favorite-button ${favoriteDoctors.includes(doctor.name) ? 'is-favorite' : ''}`}
                      aria-label={favoriteDoctors.includes(doctor.name) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                      onClick={() => toggleFavorite(doctor.name)}
                    >
                      <Heart size={17} fill={favoriteDoctors.includes(doctor.name) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="doctor-info">
                    <div className="doctor-name-row">
                      <div><h3>{doctor.name}</h3><span>{doctor.specialty}</span></div>
                      <span className="doctor-rating"><Star size={13} fill="currentColor" /> {doctor.rating}</span>
                    </div>
                    <div className="doctor-location"><MapPin size={14} /> {doctor.location}</div>
                    <div className="doctor-card-bottom">
                      <div><span className="availability-label"><span /> أقرب موعد</span><strong>{doctor.available}</strong></div>
                      <button className="book-button" type="button" onClick={() => openBooking(doctor)}>
                        احجز <ArrowLeft size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              )) : (
                <div className="empty-results">
                  <Search size={23} />
                  <strong>ما لقيناش نتائج مطابقة</strong>
                  <span>غيّر خيارات البحث وشوف النتائج المتاحة.</span>
                  <button type="button" onClick={() => { setSpecialty(''); setCity(''); setDoctorQuery(''); setSearchNotice('') }}>عرض كل الأطباء</button>
                </div>
              )}
            </div>
            <div className="doctor-footnote"><ShieldCheck size={14} /> ملفات الأطباء المعروضة للتعريف بالخدمة، والتوفر يحتاج إلى تأكيد مباشر.</div>
          </div>
        </section>

        <section className="care-banner section-wrap" id="about">
          <div className="care-copy">
            <span className="section-kicker">أكثر من مجرد حجز</span>
            <h2>صحتك في <span>مكان واحد.</span></h2>
            <p>من أول بحثك عن طبيب، إلى متابعة أدويتك وملفك الصحي — نخلي رحلتك الصحية أبسط وأوضح.</p>
            <a className="care-link" href="#centers">اكتشف خدمات صحتي <ArrowLeft size={17} /></a>
          </div>
          <div className="care-features">
            <div className="care-feature"><span className="care-feature-icon"><CalendarDays size={19} /></span><span><strong>حجز مواعيد بسهولة</strong><small>اختار الطبيب والوقت المناسب لك</small></span><Check size={16} className="care-check" /></div>
            <div className="care-feature"><span className="care-feature-icon coral"><Pill size={19} /></span><span><strong>توفّر الأدوية حولك</strong><small>اسأل الصيدليات قبل ما تطلع</small></span><Check size={16} className="care-check" /></div>
            <div className="care-feature"><span className="care-feature-icon violet"><ShieldCheck size={19} /></span><span><strong>ملف صحي إلكتروني</strong><small>ميزة مستقبلية بالتنسيق مع الجهات الصحية</small></span><span className="soon-tag">قريباً</span></div>
          </div>
          <div className="care-sparkle sparkle-a">✳</div>
          <div className="care-sparkle sparkle-b">✳</div>
        </section>

        <section className="centers-section section-wrap" id="centers">
          <div className="section-heading">
            <div><span className="section-kicker">قريب منك</span><h2>مراكز طبية <span>مختارة</span></h2></div>
            <a className="text-link" href="#centers">كل المراكز <ArrowLeft size={16} /></a>
          </div>
          <div className="center-cards">
            <article className="center-card">
              <div className="center-image center-image-one"><span className="center-label"><Hospital size={14} /> مركز طبي</span></div>
              <div className="center-info"><div><h3>مركز طرابلس الطبي</h3><span><MapPin size={13} /> طرابلس · شارع الزاوية</span></div><div className="center-rating"><Star size={13} fill="currentColor" /> ٤٫٨</div></div>
            </article>
            <article className="center-card">
              <div className="center-image center-image-two"><span className="center-label"><Hospital size={14} /> عيادات تخصصية</span></div>
              <div className="center-info"><div><h3>عيادات النخبة</h3><span><MapPin size={13} /> بنغازي · الفويهات</span></div><div className="center-rating"><Star size={13} fill="currentColor" /> ٤٫٧</div></div>
            </article>
            <article className="center-card">
              <div className="center-image center-image-three"><span className="center-label"><Hospital size={14} /> مركز طبي</span></div>
              <div className="center-info"><div><h3>مركز الشفاء التخصصي</h3><span><MapPin size={13} /> مصراتة · وسط المدينة</span></div><div className="center-rating"><Star size={13} fill="currentColor" /> ٤٫٩</div></div>
            </article>
          </div>
        </section>

        <section className="pharmacy-section" id="pharmacies">
          <div className="section-wrap pharmacy-layout">
            <div className="pharmacy-copy">
              <span className="section-kicker">دواؤك ما يضيعش وقتك</span>
              <h2>دَوّر على دوائك<br /><span>قبل ما تطلع.</span></h2>
              <p>استعلم عن توفر الأدوية في الصيدليات القريبة منك. المعلومات المعروضة تجريبية حالياً.</p>
              <form className="medicine-search" onSubmit={(event) => event.preventDefault()}>
                <Search size={19} />
                <input
                  value={medicineQuery}
                  onChange={(event) => setMedicineQuery(event.target.value)}
                  placeholder="اكتب اسم الدواء..."
                  aria-label="اكتب اسم الدواء"
                />
                <button type="submit" aria-label="ابحث عن الدواء"><ArrowLeft size={17} /></button>
              </form>
              <div className="pharmacy-meta"><MapPin size={14} /> النتائج حول طرابلس <ChevronDown size={13} /></div>
            </div>
            <div className="pharmacy-results">
              <div className="results-header">
                <div><span className="pharmacy-status-dot" /><strong>{medicineQuery ? `توفر "${medicineQuery}"` : 'صيدليات قريبة منك'}</strong></div>
                <span>بيانات تجريبية</span>
              </div>
              {filteredPharmacies.length ? filteredPharmacies.map((pharmacy) => (
                <div className="pharmacy-result" key={pharmacy.name}>
                  <span className="pharmacy-icon"><Pill size={19} /></span>
                  <span className="pharmacy-detail"><strong>{pharmacy.name}</strong><small>{pharmacy.area} · {pharmacy.distance}</small></span>
                  <span className={`stock-status ${pharmacy.stock === 'متوفر' ? 'in-stock' : 'low-stock'}`}><span />{pharmacy.stock}</span>
                </div>
              )) : (
                <div className="pharmacy-empty">
                  <span className="pharmacy-icon"><Pill size={19} /></span>
                  <span><strong>{medicineQuery ? 'لا توجد نتائج حالياً' : 'اكتب اسم دواء للبحث'}</strong><small>{medicineQuery ? 'جرّب اسم دواء آخر أو تواصل مع الصيدلية.' : 'اعرف الصيدليات القريبة وتوفّر أدويتك.'}</small></span>
                  <ArrowLeft size={16} />
                </div>
              )}
              <div className="results-disclaimer"><ShieldCheck size={13} /> يرجى التأكد من التوفر مع الصيدلية قبل الزيارة.</div>
            </div>
          </div>
        </section>

        <section className="review-section section-wrap">
          <div className="review-mark">“</div>
          <div className="review-content">
            <span className="section-kicker">تجربة صحتي</span>
            <blockquote>“لقيت دكتور أطفال قريب من البيت وحجزت الموعد في دقايق. أخيراً كل شيء واضح وفي مكان واحد.”</blockquote>
            <div className="review-author">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="" />
              <span><strong>آية السنوسي</strong><small>طرابلس · مستخدمة صحتي</small></span>
              <span className="review-stars" aria-label="5 من 5 نجوم"><Star /><Star /><Star /><Star /><Star /></span>
            </div>
          </div>
          <div className="review-side">
            <div className="review-stat"><strong>٤٫٩</strong><span><Star fill="currentColor" /> تقييم المستخدمين</span></div>
            <div className="review-stat"><strong>+١٬٢٠٠</strong><span>موعد تم حجزه</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-mark"><PlusMark /></span>
              <span className="brand-name"><strong>صحتي</strong><small>SEHATY <i>LIBYA</i></small></span>
            </a>
            <p>نقرّب لك الرعاية الصحية، ونخلي الوصول للخدمة الطبية أسهل لكل الليبيين.</p>
          </div>
          <div className="footer-links"><strong>اكتشف</strong><a href="#doctors">الأطباء</a><a href="#centers">المراكز الطبية</a><a href="#pharmacies">الصيدليات</a></div>
          <div className="footer-links"><strong>عن صحتي</strong><a href="#about">من نحن</a><a href="#about">سياسة الخصوصية</a><a href="#about">تواصل معنا</a></div>
          <div className="footer-cta"><span className="footer-heart"><Heart size={19} /></span><strong>خليك مطمّن على صحتك</strong><small>صحتي معاك في كل خطوة</small><a href="#home">ابدأ رحلتك <ArrowLeft size={15} /></a></div>
        </div>
        <div className="footer-bottom">
          <span>© ٢٠٢٦ صحتي ليبيا. جميع الحقوق محفوظة.</span>
          <span className="demo-disclaimer">نسخة تعريفية تجريبية — بيانات الأطباء والمراكز والأدوية غير فعلية.</span>
          <span className="footer-made">صُنع بكل عناية في ليبيا <Heart size={12} fill="currentColor" /></span>
        </div>
      </footer>

      <AnimatePresence>
        {bookingDoctor && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setBookingDoctor(null)
            }}
          >
            <motion.div
              className="booking-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <button className="modal-close" type="button" aria-label="إغلاق" onClick={() => setBookingDoctor(null)}><X size={19} /></button>
              {bookingConfirmed ? (
                <div className="booking-success">
                  <span><Check size={25} /></span>
                  <h2 id="booking-title">تم تأكيد طلبك!</h2>
                  <p>حجزك التجريبي مع {bookingDoctor.name} في {selectedTime}. سيتواصل معك فريق العيادة للتأكيد.</p>
                  <button className="modal-submit" type="button" onClick={() => setBookingDoctor(null)}>تمام</button>
                </div>
              ) : (
                <>
                  <span className="modal-kicker"><CalendarDays size={15} /> حجز موعد جديد</span>
                  <h2 id="booking-title">اختار موعدك</h2>
                  <div className="modal-doctor">
                    <img src={bookingDoctor.image} alt="" />
                    <span><strong>{bookingDoctor.name}</strong><small>{bookingDoctor.specialty} · {bookingDoctor.location}</small></span>
                  </div>
                  <p className="modal-label">الأوقات المتاحة</p>
                  <div className="time-options">
                    {['اليوم · ٤:٣٠ م', 'اليوم · ٦:٠٠ م', 'غداً · ١٠:٠٠ ص'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={selectedTime === time ? 'time-option selected' : 'time-option'}
                        onClick={() => setSelectedTime(time)}
                      ><Clock3 size={14} />{time}</button>
                    ))}
                  </div>
                  <div className="booking-note"><ShieldCheck size={15} /> هذا نموذج تجريبي ولا يرسل حجزاً حقيقياً.</div>
                  <form onSubmit={confirmBooking}>
                    <button className="modal-submit" type="submit" disabled={!selectedTime}>تأكيد طلب الموعد <ArrowLeft size={16} /></button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PlusMark() {
  return <span className="plus-mark" aria-hidden="true"><span /><span /></span>
}

export default App

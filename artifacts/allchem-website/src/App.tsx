import { useMemo, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, Check, ChevronDown, ChevronRight, FlaskConical, Mail, MapPin, Menu, Minus, Phone, Search, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import labHero from '../attached_assets/generated_images/allchem-lab-hero.jpg';
import poultryImage from '../attached_assets/generated_images/allchem-poultry.jpg';
import veterinaryImage from '../attached_assets/generated_images/allchem-veterinary.jpg';

const queryClient = new QueryClient();

type Category = 'All' | 'Poultry' | 'Aqua' | 'Veterinary' | 'Swine' | 'Equine' | 'Pet';
type Product = { name: string; category: Exclude<Category, 'All'>; note: string };

const products: Product[] = [
  { name: 'COXISOLV', category: 'Poultry', note: 'Coccidiosis support' },
  { name: 'AMPRO MAX-S', category: 'Poultry', note: 'Targeted poultry care' },
  { name: 'VIRASIL', category: 'Poultry', note: 'Viral health support' },
  { name: 'WORMEX-30', category: 'Poultry', note: 'Deworming support' },
  { name: 'POWER TONIC', category: 'Poultry', note: 'Recovery & vitality' },
  { name: 'EFX-10', category: 'Poultry', note: 'Poultry health range' },
  { name: 'CIPRO-10', category: 'Poultry', note: 'Poultry health range' },
  { name: 'CALCI CAL FS', category: 'Poultry', note: 'Calcium & mineral support' },
  { name: 'CALCI GUARD DAIRY', category: 'Poultry', note: 'Production support' },
  { name: 'CALCI CAL-DS GOLD', category: 'Poultry', note: 'Calcium formulation' },
  { name: 'OFLO-MET', category: 'Poultry', note: 'Poultry health range' },
  { name: 'N.OXY', category: 'Poultry', note: 'Poultry health range' },
  { name: 'NYDOX', category: 'Poultry', note: 'Poultry health range' },
  { name: 'LEVO FLOX-BH', category: 'Poultry', note: 'Poultry health range' },
  { name: 'LEVOFLOX-L', category: 'Poultry', note: 'Poultry health range' },
  { name: 'CIPROVET-10', category: 'Poultry', note: 'Poultry health range' },
  { name: 'PIPERAZINE 61%', category: 'Poultry', note: 'Poultry health range' },
  { name: 'ALL CHEM EGG FORMULA', category: 'Poultry', note: 'Layer nutrition support' },
  { name: 'ALLZYME XAP PLUS', category: 'Poultry', note: 'Feed efficiency support' },
  { name: 'ALLCHEM TM', category: 'Poultry', note: 'Poultry health range' },
  { name: 'T.H.F-80', category: 'Poultry', note: 'Poultry health range' },
  { name: 'ECHO PRIM-S', category: 'Poultry', note: 'Poultry health range' },
  { name: 'CHEMO CLOX', category: 'Poultry', note: 'Poultry health range' },
  { name: 'ALLMOX-75', category: 'Poultry', note: 'Poultry health range' },
  { name: 'AMOX-D-PLUS', category: 'Poultry', note: 'Poultry health range' },
  { name: 'MYCRO LACT GOLD-FS', category: 'Poultry', note: 'Gut health support' },
  { name: 'MYCRO LACT GOLD-WS', category: 'Poultry', note: 'Gut health support' },
  { name: 'HIGH VIT LM', category: 'Poultry', note: 'Vitamin support' },
  { name: 'PHYTASE 5000', category: 'Poultry', note: 'Feed efficiency support' },
  { name: 'SUPER TONE', category: 'Poultry', note: 'Recovery & vitality' },
  { name: 'O.T.C-200', category: 'Poultry', note: 'Poultry health range' },
  { name: 'IMMUNO BEST', category: 'Poultry', note: 'Immune support' },
  { name: 'ELECTRO LYTE – PLUS', category: 'Poultry', note: 'Hydration support' },
  { name: 'BEE PLEX', category: 'Poultry', note: 'Vitamin B complex' },
  { name: 'GUT POWER LIQUID', category: 'Aqua', note: 'Aquaculture gut support' },
  { name: 'IMMUNOL LIQUID', category: 'Aqua', note: 'Aquaculture immune support' },
  { name: 'ALLMIN-HS', category: 'Aqua', note: 'Mineral support' },
  { name: 'ASCORB C', category: 'Aqua', note: 'Vitamin C support' },
  { name: 'ZEO SOLVE POWDER', category: 'Aqua', note: 'Water & pond support' },
  { name: 'GROW-UP GEL', category: 'Veterinary', note: 'Growth & recovery support' },
  { name: 'MASTIRID', category: 'Veterinary', note: 'Mastitis care' },
  { name: 'ALLCHEM ADVANCE WOUND HEAL SPRAY', category: 'Veterinary', note: 'Practical wound care' },
  { name: 'CLOSAN MEC', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'CEPHALEXIN', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'AZEETH', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'SUPER TONE', category: 'Veterinary', note: 'Recovery & vitality' },
  { name: 'POWER TONIC', category: 'Veterinary', note: 'Recovery & vitality' },
  { name: 'TYLO WIN', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'PARA MEL', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'MELO WIN', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'ALL CEF', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'AMICA WIN', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'ALL BONEX', category: 'Veterinary', note: 'Bone & mineral support' },
  { name: 'TAZO MAX-C', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'GENTA WIN', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'CEFTI CARE', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'AMOXY-SUL', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'SULPHA DMD BOLUS', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'ALL FLOX-OZ BOLUS', category: 'Veterinary', note: 'Veterinary health range' },
  { name: 'LIV C FIT', category: 'Veterinary', note: 'Liver support' },
];

const categoryDetails: Record<Category, { eyebrow: string; description: string }> = {
  All: { eyebrow: 'Complete catalogue', description: 'A practical portfolio across farm, aqua and companion animal health.' },
  Poultry: { eyebrow: 'Poultry healthcare', description: 'Focused formulations for flock vitality, feed efficiency and everyday farm outcomes.' },
  Aqua: { eyebrow: 'Aqua healthcare', description: 'Water, gut and immunity support for resilient aquaculture operations.' },
  Veterinary: { eyebrow: 'Veterinary healthcare', description: 'Field-ready care for livestock, dairy and clinical veterinary practice.' },
  Swine: { eyebrow: 'Swine healthcare', description: 'We are building this range with the same practical, quality-first approach.' },
  Equine: { eyebrow: 'Equine healthcare', description: 'Our equine range is being developed for partners who expect dependable support.' },
  Pet: { eyebrow: 'Pet healthcare', description: 'A considered companion-animal range is in development.' },
};

const categories: Category[] = ['All', 'Poultry', 'Aqua', 'Veterinary', 'Swine', 'Equine', 'Pet'];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary resetKey="home">
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');
  const [subject, setSubject] = useState('');

  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = category === 'All' || product.category === category;
    const queryMatch = !query || `${product.name} ${product.note} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openContact = (productName?: string) => {
    if (productName) setSubject(`Enquiry about ${productName}`);
    scrollTo('contact');
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('sent');
    event.currentTarget.reset();
  };

  return (
    <main className="site-shell grain min-h-[100dvh]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <button data-testid="button-logo" onClick={() => scrollTo('home')} className="focus-ring flex items-center gap-3 text-left text-[#f7f1e5]">
            <span className="grid h-10 w-10 place-items-center border border-[#d8ad45] text-[#d8ad45]"><FlaskConical size={19} strokeWidth={1.5} /></span>
            <span><span className="block text-[13px] font-extrabold leading-none tracking-[.18em]">ALLCHEM</span><span className="mt-1 block text-[9px] tracking-[.28em] text-[#d8ad45]">BIO SCIENCES</span></span>
          </button>
          <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[.18em] text-[#e7e4da] md:flex" aria-label="Main navigation">
            <button data-testid="link-home" onClick={() => scrollTo('home')} className="focus-ring transition-colors hover:text-[#d8ad45]">Home</button>
            <button data-testid="link-products" onClick={() => scrollTo('products')} className="focus-ring transition-colors hover:text-[#d8ad45]">Products</button>
            <button data-testid="link-contact" onClick={() => scrollTo('contact')} className="focus-ring transition-colors hover:text-[#d8ad45]">Contact</button>
          </nav>
          <button data-testid="button-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className="focus-ring grid h-10 w-10 place-items-center border border-white/20 text-[#f7f1e5] md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <div className="mx-5 border border-white/15 bg-[#1c2832]/95 p-4 text-sm text-[#f7f1e5] md:hidden">
          {['home', 'products', 'contact'].map((item) => <button key={item} data-testid={`mobile-link-${item}`} onClick={() => scrollTo(item)} className="block w-full border-b border-white/10 py-3 text-left capitalize last:border-0">{item}</button>)}
        </div>}
      </header>

      <section id="home" className="hero-grid relative isolate min-h-[760px] overflow-hidden bg-[#1c2832] text-[#f7f1e5]">
        <img src={labHero} alt="AllChem quality control laboratory" className="hero-image absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#1c2832_10%,rgba(28,40,50,.84)_43%,rgba(28,40,50,.27)_100%)]" />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 px-5 pb-20 pt-40 md:min-h-[760px] md:grid-cols-[1.1fr_.9fr] md:items-end md:px-10 md:pb-24">
          <div className="max-w-[680px]">
            <div className="reveal mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.28em] text-[#d8ad45]"><span className="h-px w-10 bg-[#d8ad45]" /> Established in Hyderabad</div>
            <h1 className="reveal reveal-delay-1 display-face max-w-[720px] text-[clamp(3.4rem,8vw,7.8rem)] leading-[.91] tracking-[-.055em]">Health that <em className="text-[#d8ad45]">moves</em> with the farm.</h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[550px] text-base leading-7 text-[#d7d9d5] md:text-lg">Science-led veterinary healthcare for the people and animals that keep India moving. Manufactured with discipline. Made for the field.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
              <button data-testid="button-explore-range" onClick={() => scrollTo('products')} className="focus-ring inline-flex items-center gap-3 bg-[#d8ad45] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.14em] text-[#1c2832] transition-transform hover:-translate-y-1">Explore our range <ArrowUpRight size={15} /></button>
              <button data-testid="button-contact-hero" onClick={() => openContact()} className="focus-ring inline-flex items-center gap-3 border border-white/35 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.14em] text-[#f7f1e5] transition-colors hover:border-[#d8ad45] hover:text-[#d8ad45]">Talk to our team <ChevronRight size={15} /></button>
            </div>
          </div>
          <div className="mt-16 flex justify-end md:mt-0">
            <div className="w-full max-w-[290px] border-l border-[#d8ad45]/70 pl-5">
              <p className="mono-face text-[10px] uppercase tracking-[.2em] text-[#d8ad45]">The AllChem standard</p>
              <p className="mt-4 text-sm leading-6 text-[#d7d9d5]">Regulated manufacturing, thoughtful formulations and a partner mindset at every stage.</p>
              <div className="mt-7 flex gap-3">
                <span className="grid h-9 w-9 place-items-center border border-white/20 text-[#d8ad45]"><ShieldCheck size={17} /></span>
                <span className="text-[10px] font-bold uppercase leading-4 tracking-[.14em] text-[#e7e4da]">ISO 9001:2015<br />GMP Certified</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 right-5 hidden items-center gap-3 text-[9px] uppercase tracking-[.2em] text-[#bfc3bf] md:flex"><span className="h-px w-12 bg-[#d8ad45]" /> Scroll to discover</div>
      </section>

      <section className="border-b border-[#d9d3c6] bg-[#efeade]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 md:grid-cols-4">
          {[['01', 'Quality-led', 'Every batch starts with a clear standard.'], ['02', 'Field-ready', 'Useful where the work actually happens.'], ['03', 'Portfolio depth', 'Poultry, aqua and veterinary expertise.'], ['04', 'Partner-first', 'Responsive support for lasting growth.']].map(([num, title, text]) => (
            <div key={num} className="border-r border-[#d9d3c6] px-5 py-7 last:border-r-0 md:px-8 md:py-9">
              <span className="mono-face text-[10px] text-[#9b7a2d]">{num}</span><h2 className="mt-3 text-sm font-extrabold uppercase tracking-[.08em] text-[#1c2832]">{title}</h2><p className="mt-2 max-w-[190px] text-xs leading-5 text-[#5a625f]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-24">
          <div>
            <p className="mono-face text-[10px] uppercase tracking-[.24em] text-[#9b7a2d]">01 / Why AllChem</p>
            <h2 className="display-face mt-6 text-5xl leading-[.98] tracking-[-.04em] text-[#1c2832] md:text-7xl">Good science is <em className="text-[#9b7a2d]">practical.</em></h2>
          </div>
          <div className="max-w-[620px]">
            <p className="text-xl leading-8 text-[#39444a] md:text-2xl">AllChem Bio Sciences brings together disciplined manufacturing and an understanding of the Indian animal-health landscape.</p>
            <p className="mt-7 text-sm leading-7 text-[#65706c]">From a poultry shed in Telangana to a dairy practice serving its community, our products are designed to be clear to use, dependable in performance and supported by people who understand the pace of the work.</p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#d9d3c6] pt-6">
              <div><span className="mono-face text-3xl text-[#1c2832]">6</span><p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#65706c]">Healthcare segments</p></div>
              <div><span className="mono-face text-3xl text-[#1c2832]">2015</span><p className="mt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#65706c]">ISO certified standard</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dfe5df]">
        <div className="mx-auto grid max-w-[1320px] md:grid-cols-2">
          <div className="image-wrap relative min-h-[360px] overflow-hidden md:min-h-[620px]">
            <img src={poultryImage} alt="Healthy poultry in a modern Indian farm" className="image-hover absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c2832]/65 to-transparent" />
            <span className="absolute bottom-8 left-6 bg-[#d8ad45] px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#1c2832] md:left-10">Poultry / Field outcomes</span>
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-20">
            <p className="mono-face text-[10px] uppercase tracking-[.24em] text-[#54716f]">Built around the work</p>
            <h2 className="display-face mt-5 max-w-[500px] text-5xl leading-[1] tracking-[-.04em] text-[#1c2832] md:text-6xl">From formulation to <em className="text-[#54716f]">flock.</em></h2>
            <p className="mt-7 max-w-[500px] text-sm leading-7 text-[#4b5b59]">The best product is one that earns its place in a real routine. Our poultry and aqua portfolio is built for clarity, consistency and the realities of production.</p>
            <button data-testid="button-poultry-range" onClick={() => { setCategory('Poultry'); scrollTo('products'); }} className="focus-ring mt-9 flex w-fit items-center gap-3 border-b border-[#1c2832] pb-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#1c2832]">View poultry range <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-10 bg-[#f7f3e9] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="mono-face text-[10px] uppercase tracking-[.24em] text-[#9b7a2d]">02 / Product catalogue</p><h2 className="display-face mt-5 text-5xl leading-none tracking-[-.04em] text-[#1c2832] md:text-7xl">The range, <em className="text-[#9b7a2d]">clearly.</em></h2></div>
            <p className="max-w-[360px] text-sm leading-6 text-[#65706c]">Explore our current portfolio by segment. For product specifications, availability and distribution enquiries, our team is one message away.</p>
          </div>
          <div className="mt-12 flex flex-col gap-5 border-y border-[#d9d3c6] py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product categories">
              {categories.map((item) => <button key={item} data-testid={`tab-category-${item.toLowerCase()}`} onClick={() => setCategory(item)} className={`focus-ring shrink-0 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.15em] transition-colors ${category === item ? 'bg-[#1c2832] text-[#f7f1e5]' : 'text-[#65706c] hover:bg-[#e9e3d6] hover:text-[#1c2832]'}`} role="tab" aria-selected={category === item}>{item}</button>)}
            </div>
            <label className="flex min-w-[220px] items-center gap-2 border-b border-[#bdb7a9] pb-2 text-[#65706c]"><Search size={16} /><span className="sr-only">Search products</span><input data-testid="input-product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the range" className="w-full bg-transparent text-sm outline-none placeholder:text-[#92978f]" /></label>
          </div>
          <div className="mb-8 flex items-center justify-between"><p data-testid="text-catalogue-description" className="text-sm text-[#65706c]">{categoryDetails[category].description}</p><span className="mono-face text-[10px] text-[#9b7a2d]">{filteredProducts.length} products</span></div>
          {filteredProducts.length > 0 ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => <button key={`${product.category}-${product.name}-${index}`} data-testid={`card-product-${product.name.replaceAll(' ', '-').toLowerCase()}`} onClick={() => setSelectedProduct(product)} className="product-card focus-ring group min-h-[154px] border border-[#ded8ca] bg-[#fbf8f0] p-5 text-left">
              <div className="flex items-start justify-between gap-3"><span className="mono-face text-[9px] uppercase tracking-[.12em] text-[#9b7a2d]">{product.category}</span><ArrowUpRight size={15} className="text-[#9b7a2d] opacity-0 transition-opacity group-hover:opacity-100" /></div><h3 className="mt-7 text-sm font-extrabold leading-5 tracking-[.02em] text-[#1c2832]">{product.name}</h3><p className="mt-2 text-xs text-[#7c827c]">{product.note}</p>
            </button>)}
          </div> : <div className="border border-dashed border-[#bdb7a9] bg-[#efeade] px-6 py-14 text-center"><Minus className="mx-auto text-[#9b7a2d]" size={24} /><h3 className="mt-5 text-lg font-bold text-[#1c2832]">This range is taking shape.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#65706c]">{categoryDetails[category].description} Speak with our team for current availability and upcoming launches.</p><button data-testid="button-empty-contact" onClick={() => openContact(`${category} healthcare`)} className="focus-ring mt-6 inline-flex items-center gap-2 bg-[#1c2832] px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#f7f1e5]">Ask about {category} <ArrowUpRight size={14} /></button></div>}
        </div>
      </section>

      <section className="bg-[#1c2832] text-[#f7f1e5]">
        <div className="mx-auto grid max-w-[1320px] md:grid-cols-[.95fr_1.05fr]">
          <div className="image-wrap relative min-h-[360px] overflow-hidden md:min-h-[560px]"><img src={veterinaryImage} alt="Veterinarian caring for a dairy cow" className="image-hover absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#1c2832]/25" /></div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16"><p className="mono-face text-[10px] uppercase tracking-[.24em] text-[#d8ad45]">03 / The people behind it</p><h2 className="display-face mt-5 max-w-[540px] text-5xl leading-[.98] tracking-[-.04em] md:text-6xl">A serious product needs a <em className="text-[#d8ad45]">human</em> partner.</h2><p className="mt-7 max-w-[500px] text-sm leading-7 text-[#c5cbc5]">We work alongside distributors, sales professionals, farms and healthcare partners to make the right product easier to find, understand and use.</p><button data-testid="button-partner-contact" onClick={() => openContact('partnership')} className="focus-ring mt-9 flex w-fit items-center gap-3 border-b border-[#d8ad45] pb-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#d8ad45]">Start a conversation <ArrowUpRight size={15} /></button></div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-10 bg-[#efeade] px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-16 md:grid-cols-[.9fr_1.1fr] md:gap-28">
          <div><p className="mono-face text-[10px] uppercase tracking-[.24em] text-[#9b7a2d]">04 / Contact</p><h2 className="display-face mt-5 text-5xl leading-[.95] tracking-[-.04em] text-[#1c2832] md:text-7xl">Let’s build better <em className="text-[#9b7a2d]">outcomes.</em></h2><p className="mt-7 max-w-[390px] text-sm leading-7 text-[#65706c]">Tell us what you are looking for. A member of the AllChem team will get back to you with the right next step.</p><div className="mt-10 space-y-5 text-sm text-[#39444a]"><a data-testid="link-contact-phone" href="tel:+919182245363" className="focus-ring flex items-center gap-3 hover:text-[#9b7a2d]"><Phone size={17} className="text-[#9b7a2d]" /> +91 9182245363</a><a data-testid="link-contact-email" href="mailto:allchemtrust@gmail.com" className="focus-ring flex items-center gap-3 hover:text-[#9b7a2d]"><Mail size={17} className="text-[#9b7a2d]" /> allchemtrust@gmail.com</a><div className="flex items-start gap-3"><MapPin size={17} className="mt-1 shrink-0 text-[#9b7a2d]" /><span>#4-10-606, Plot No.8, Block No.25,<br />TSIIC Auto Nagar, Hyderabad,<br />Telangana State – 500068</span></div></div></div>
          <div className="border border-[#d9d3c6] bg-[#f7f3e9] p-6 md:p-10">
            {formStatus === 'sent' ? <div className="flex min-h-[400px] flex-col items-start justify-center"><span className="grid h-12 w-12 place-items-center bg-[#d8ad45] text-[#1c2832]"><Check size={22} /></span><h3 className="display-face mt-7 text-4xl text-[#1c2832]">Message received.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#65706c]">Thank you for reaching out. Our team will review your enquiry and respond at the earliest.</p><button data-testid="button-send-another" onClick={() => setFormStatus('idle')} className="focus-ring mt-8 border-b border-[#1c2832] pb-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#1c2832]">Send another message</button></div> : <form onSubmit={submitForm} className="space-y-7"><div><label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#65706c]">Your name</label><input id="name" name="name" required data-testid="input-name" className="mt-2 w-full border-b border-[#bdb7a9] bg-transparent py-3 text-sm text-[#1c2832] outline-none transition-colors focus:border-[#9b7a2d]" placeholder="Name / organisation" /></div><div className="grid gap-7 sm:grid-cols-2"><div><label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#65706c]">Email address</label><input id="email" name="email" required type="email" data-testid="input-email" className="mt-2 w-full border-b border-[#bdb7a9] bg-transparent py-3 text-sm text-[#1c2832] outline-none transition-colors focus:border-[#9b7a2d]" placeholder="you@company.com" /></div><div><label htmlFor="phone" className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#65706c]">Phone</label><input id="phone" name="phone" data-testid="input-phone" className="mt-2 w-full border-b border-[#bdb7a9] bg-transparent py-3 text-sm text-[#1c2832] outline-none transition-colors focus:border-[#9b7a2d]" placeholder="+91" /></div></div><div><label htmlFor="subject" className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#65706c]">What can we help with?</label><input id="subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} required data-testid="input-subject" className="mt-2 w-full border-b border-[#bdb7a9] bg-transparent py-3 text-sm text-[#1c2832] outline-none transition-colors focus:border-[#9b7a2d]" placeholder="Product enquiry, distribution, partnership..." /></div><div><label htmlFor="message" className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#65706c]">Message</label><textarea id="message" name="message" required data-testid="input-message" rows={4} className="mt-2 w-full resize-none border-b border-[#bdb7a9] bg-transparent py-3 text-sm text-[#1c2832] outline-none transition-colors focus:border-[#9b7a2d]" placeholder="A little context helps us respond well." /></div><button data-testid="button-submit-contact" type="submit" className="focus-ring inline-flex items-center gap-3 bg-[#1c2832] px-6 py-4 text-xs font-extrabold uppercase tracking-[.14em] text-[#f7f1e5] transition-transform hover:-translate-y-1">Send enquiry <ArrowUpRight size={15} /></button></form>}
          </div>
        </div>
      </section>

      <footer className="bg-[#1c2832] px-5 py-9 text-[#f7f1e5] md:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-7 md:flex-row md:items-end"><div><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center border border-[#d8ad45] text-[#d8ad45]"><FlaskConical size={16} /></span><span className="text-xs font-extrabold tracking-[.16em]">ALLCHEM BIO SCIENCES</span></div><p className="mt-4 max-w-sm text-xs leading-5 text-[#aeb8b3]">Regulated animal healthcare, made practical from Hyderabad.</p></div><p className="mono-face text-[9px] uppercase tracking-[.16em] text-[#87928f]">© {new Date().getFullYear()} AllChem Bio Sciences</p></div>
      </footer>

      {selectedProduct && <div className="fixed inset-0 z-50 grid place-items-center bg-[#1c2832]/75 p-5" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} details`}><div className="relative w-full max-w-md border border-[#d9d3c6] bg-[#f7f3e9] p-7 md:p-9"><button data-testid="button-close-product" onClick={() => setSelectedProduct(null)} className="focus-ring absolute right-5 top-5 text-[#65706c] hover:text-[#1c2832]" aria-label="Close product details"><X size={19} /></button><span className="mono-face text-[10px] uppercase tracking-[.2em] text-[#9b7a2d]">{selectedProduct.category} / Product range</span><h2 className="display-face mt-7 text-4xl leading-none text-[#1c2832]">{selectedProduct.name}</h2><p className="mt-5 text-sm leading-6 text-[#65706c]">{selectedProduct.note}. For pack sizes, technical information, current availability or distribution support, connect with our team.</p><button data-testid="button-enquire-product" onClick={() => { setSelectedProduct(null); openContact(selectedProduct.name); }} className="focus-ring mt-8 inline-flex items-center gap-3 bg-[#1c2832] px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.14em] text-[#f7f1e5]">Enquire about this product <ArrowUpRight size={15} /></button></div></div>}
    </main>
  );
}

export default App;
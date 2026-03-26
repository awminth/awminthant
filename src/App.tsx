import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bot,
  Code2,
  ExternalLink,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Server,
  Smartphone,
  X,
} from 'lucide-react';

/** Update contact links and phone here if they change */
const CONTACT = {
  facebook: 'https://www.facebook.com/awmin.thant/',
  instagram: 'https://www.instagram.com/aw_min_thant/',
  linkedin: 'https://www.linkedin.com/in/awmin-thant-03b92b217/',
  email: 'mailto:awminthant831998@gmail.com',
  emailDisplay: 'awminthant831998@gmail.com',
  phone: 'tel:+959983102893',
  phoneDisplay: '+959983102893',
} as const;

const YOUR_NAME = 'Aw Min Thant';
const BRAND = 'Aw Min Thant';

/** Random-looking filenames so repo/tree and URLs are not obviously "profile" / "resume". Use a private GitHub repo if you do not want these in a public codebase. */
const PROFILE_IMAGE_SRC = `${import.meta.env.BASE_URL}x9k2m7f4q8nb.png`;
const RESUME_ASSET_URL = `${import.meta.env.BASE_URL}z3p8w1r6yk4v.pdf`;

const SECTION_IDS = [
  'home',
  'services',
  'about',
  'portfolio',
  'contact',
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About me' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact me' },
];

const PORTFOLIO_PROJECTS = [
  {
    title: 'Hotel Management System',
    desc: 'Web app for bookings, rooms, and hotel operations — live demo by Brightware.',
    url: 'https://hotel.brightwareitsolutions.site/',
    image: '/portfolio-hotel.jpg',
    imageAlt: 'Hotel lobby and pool — Hotel Management System preview',
  },
  {
    title: 'POS Management System',
    desc: 'Point-of-sale and retail workflow — Brightware POS live environment.',
    url: 'https://pos.brightwareitsolutions.site/',
    image: '/portfolio-pos.jpg',
    imageAlt: 'Retail checkout — POS Management System preview',
  },
  {
    title: 'School Management System',
    desc: 'Student, class, and school admin tools — BRIGHTWARE SMS portal.',
    url: 'https://sms.brightwareitsolutions.site/#/login',
    image: '/portfolio-school.jpg',
    imageAlt: 'Students learning — School Management System preview',
  },
] as const;

/**
 * Must match section `scroll-mt-24` (6rem = 96px). If you change scroll-mt,
 * update this too.
 */
const SCROLL_MARGIN_PX = 96;

function parseHashSection(): SectionId | null {
  const h = window.location.hash.slice(1);
  return SECTION_IDS.includes(h as SectionId) ? (h as SectionId) : null;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [headerElevated, setHeaderElevated] = useState(false);
  const scrollSpyPaused = useRef(false);

  const goToSection = useCallback((id: SectionId) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      scrollSpyPaused.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
      window.setTimeout(() => {
        scrollSpyPaused.current = false;
      }, 900);
    }
  }, []);

  useEffect(() => {
    const fromHash = parseHashSection();
    if (fromHash) {
      setActiveSection(fromHash);
      requestAnimationFrame(() => {
        document
          .getElementById(fromHash)
          ?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderElevated(window.scrollY > 6);
      if (scrollSpyPaused.current) return;
      const headerEl = document.querySelector('header');
      let headerBottom = headerEl
        ? Math.ceil(headerEl.getBoundingClientRect().bottom)
        : 0;
      // Open mobile menu makes the header very tall; cap so spy still matches sections.
      if (menuOpen) {
        headerBottom = Math.min(headerBottom, 80);
      }
      // After scrollIntoView + scroll-margin, section tops sit near SCROLL_MARGIN_PX;
      // threshold must be at least that or "About" stays wrongly under "Services".
      const threshold = Math.max(headerBottom + 4, SCROLL_MARGIN_PX);
      let active: SectionId = 'home';
      for (const id of SECTION_IDS) {
        const sectionEl = document.getElementById(id);
        if (!sectionEl) continue;
        const { top } = sectionEl.getBoundingClientRect();
        if (top <= threshold) active = id;
      }
      setActiveSection(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onPopState = () => {
      const id = parseHashSection() ?? 'home';
      scrollSpyPaused.current = true;
      setActiveSection(id);
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        scrollSpyPaused.current = false;
      }, 900);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const socialBtn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-[#333333] text-neutral-400 transition-colors hover:border-white hover:text-white';

  return (
    <div className="relative min-h-screen w-full bg-[#111111] font-sans text-neutral-200">
      {/* Full-screen background geometry */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-[10%] -top-[20%] h-[150%] w-[45%] rotate-[28deg] bg-[#151515] shadow-2xl" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[150%] w-[45%] rotate-[28deg] bg-[#151515] shadow-2xl" />
        <div className="absolute right-[15%] top-[8%] h-[85%] w-[22%] -rotate-45 bg-[#0d0d0d]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header — full width */}
        <header
          className={`sticky top-0 z-50 w-full border-b px-4 py-4 backdrop-blur-md transition-[box-shadow,background-color,border-color] duration-300 ease-out sm:px-8 lg:px-12 ${
            headerElevated
              ? 'border-[#2a2a2a] bg-[#111111]/95 shadow-[0_10px_40px_rgba(0,0,0,0.55)]'
              : 'border-[#2a2a2a]/70 bg-[#111111]/88'
          }`}
        >
          <div className="mx-auto flex w-full max-w-none items-center justify-between gap-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                goToSection('home');
              }}
              className="shrink-0 text-xl font-bold tracking-wider text-[#ff6b00] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {BRAND}
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-8 md:flex lg:gap-10">
              {NAV_ITEMS.map(({ id, label }) => {
                const active = activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(id);
                    }}
                    className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#ff6b00]'
                        : 'text-neutral-400 hover:text-white'
                    } after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[#ff6b00] after:transition-transform after:duration-300 after:ease-out ${
                      active ? 'after:scale-x-100' : 'after:scale-x-0'
                    } `}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection('contact');
                }}
                className="hidden rounded-md bg-[#ff6b00] px-5 py-2 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#e66000] hover:shadow-[0_4px_20px_rgba(255,107,0,0.35)] active:scale-[0.97] sm:inline-block"
              >
                Hire Me
              </a>
              <button
                type="button"
                className="rounded-md p-2 text-white md:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile nav — height animation */}
          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
              menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0">
              <nav className="flex flex-col gap-1 border-t border-[#2a2a2a] px-4 py-4">
                {NAV_ITEMS.map(({ id, label }) => {
                  const active = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection(id);
                      }}
                      className={`rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'border-l-2 border-[#ff6b00] bg-[#ff6b00]/12 pl-2.5 text-[#ff6b00]'
                          : 'border-l-2 border-transparent text-neutral-400 hover:border-white/15 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {label}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('contact');
                  }}
                  className="mt-2 block rounded-md bg-[#ff6b00] px-4 py-3 text-center text-sm font-semibold text-white transition-[transform,box-shadow] duration-200 hover:shadow-[0_4px_20px_rgba(255,107,0,0.35)] active:scale-[0.98]"
                >
                  Hire Me
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero — full width */}
        <section
          id="home"
          className="section-reveal w-full scroll-mt-24 px-4 py-12 sm:px-8 lg:px-12 lg:py-20"
        >
          <div className="mx-auto grid w-full max-w-none grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <div className="order-2 flex flex-col justify-center space-y-8 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-lg text-neutral-400">Hi, I&apos;m</p>
                <h2 className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">
                  {YOUR_NAME}
                </h2>
                <h1 className="flex flex-wrap items-end gap-2 text-5xl font-bold leading-none tracking-tight text-[#ff6b00] sm:text-6xl lg:text-7xl xl:text-[80px]">
                  <span>Freelance Developer</span>
                </h1>
                <p className="max-w-xl pt-2 text-base leading-relaxed text-neutral-400">
                  I build apps and websites with Flutter, PHP, React, and
                  Node.js. I also work on AI agents. I help clients get clear,
                  practical digital products that fit their business.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialBtn}
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialBtn}
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialBtn}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('contact');
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-[#ff6b00] px-8 py-3 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#e66000] hover:shadow-[0_4px_20px_rgba(255,107,0,0.35)] active:scale-[0.98]"
                >
                  Hire Me
                </a>
                <a
                  href={RESUME_ASSET_URL}
                  download="Aw_Min_Thant_Resume.pdf"
                  className="inline-flex items-center justify-center rounded-md border border-[#444444] px-8 py-3 text-sm font-medium text-neutral-400 transition-colors hover:border-neutral-300 hover:text-white"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-6 flex max-w-md flex-col gap-4 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:max-w-[460px] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-2xl font-bold text-[#ff6b00]">5+</span>
                  <span className="mt-1 text-sm font-medium text-neutral-400">
                    Years in tech
                  </span>
                </div>
                <div className="hidden h-10 w-px bg-[#333333] sm:block" />
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-2xl font-bold text-[#ff6b00]">20+</span>
                  <span className="mt-1 text-sm font-medium text-neutral-400">
                    Projects done
                  </span>
                </div>
                <div className="hidden h-10 w-px bg-[#333333] sm:block" />
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-2xl font-bold text-[#ff6b00]">80+</span>
                  <span className="mt-1 text-sm font-medium text-neutral-400">
                    Happy clients
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="aspect-square w-full max-w-[min(100%,380px)] shrink-0 overflow-hidden rounded-full border border-[#2a2a2a] bg-[#1a1a1a] sm:max-w-[min(100%,450px)] lg:max-w-[min(100%,520px)] xl:max-w-[min(100%,560px)]">
                <img
                  src={PROFILE_IMAGE_SRC}
                  alt={`${YOUR_NAME} — portrait`}
                  className="h-full w-full object-cover object-[center_30%]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="section-reveal w-full scroll-mt-24 border-t border-[#2a2a2a] px-4 py-16 sm:px-8 lg:px-12 lg:py-24"
          style={{ animationDelay: '70ms' }}
        >
          <div className="mx-auto w-full max-w-none">
            <h2 className="mb-3 text-center text-3xl font-bold text-white md:text-4xl">
              Services
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-400">
              Pick the kind of help you need. I keep things simple and focus on
              what works for you.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Smartphone,
                  title: 'Flutter & Mobile',
                  desc: 'Cross-platform apps for Android and iOS from one codebase. Fast to ship and easy to maintain.',
                },
                {
                  icon: Code2,
                  title: 'PHP & React',
                  desc: 'Websites, admin dashboards, and user-facing web apps built with PHP and React.',
                },
                {
                  icon: Server,
                  title: 'Node.js Backend',
                  desc: 'APIs, real-time features, and server-side logic that can grow with your product.',
                },
                {
                  icon: Bot,
                  title: 'AI Agent Development',
                  desc: 'AI agents and light automation so repeat tasks take less of your time.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#2a2a2a] bg-[#161616] p-6 transition-colors hover:border-[#ff6b00]/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="section-reveal w-full scroll-mt-24 border-t border-[#2a2a2a] px-4 py-16 sm:px-8 lg:px-12 lg:py-24"
          style={{ animationDelay: '140ms' }}
        >
          <div className="mx-auto grid w-full max-w-none grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                About me
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-neutral-300">
                <p className="text-lg text-[#ff6b00]">
                  I am a freelance developer. I earn my living with Flutter,
                  PHP, React, Node.js, and AI agent projects.
                </p>
                <p className="text-neutral-400">
                  I work directly with each client. You get straight answers,
                  updates on time, and costs you can plan for. My goal is a
                  result you are happy to use.
                </p>
                <ul className="list-inside list-disc space-y-2 text-neutral-400">
                  <li>Flutter — mobile apps with a mobile-first mindset</li>
                  <li>PHP &amp; React — websites and full-stack work</li>
                  <li>Node.js — APIs and backend services</li>
                  <li>AI agents — simpler workflows and smart tools where they help</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl border border-[#2a2a2a] bg-[#161616] p-8">
              <h3 className="mb-4 text-lg font-semibold text-[#ff6b00]">
                Tech I work with
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Flutter',
                  'PHP',
                  'React',
                  'Node.js',
                  'AI Agents',
                  'REST APIs',
                  'TypeScript',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#333] bg-[#1a1a1a] px-3 py-1 text-sm text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section
          id="portfolio"
          className="section-reveal w-full scroll-mt-24 border-t border-[#2a2a2a] px-4 py-16 sm:px-8 lg:px-12 lg:py-24"
          style={{ animationDelay: '210ms' }}
        >
          <div className="mx-auto w-full max-w-none">
            <h2 className="mb-3 text-center text-3xl font-bold text-white md:text-4xl">
              Portfolio
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-400">
              Live products built for Brightware IT Solutions — click a project
              to open the site in a new tab.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PORTFOLIO_PROJECTS.map((p) => (
                <article
                  key={p.title}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#161616] transition-all hover:border-[#ff6b00]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-video overflow-hidden bg-[#222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b00]"
                    aria-label={`Open ${p.title} live site`}
                  >
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                  </a>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold leading-snug">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-colors hover:text-[#ff6b00] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b00]"
                      >
                        {p.title}
                      </a>
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-400">
                      {p.desc}
                    </p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6b00] transition-[gap,color] hover:gap-2.5 hover:text-[#ff8534]"
                    >
                      Visit live site
                      <ExternalLink size={16} className="shrink-0" aria-hidden />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="section-reveal w-full scroll-mt-24 border-t border-[#2a2a2a] px-4 py-16 sm:px-8 lg:px-12 lg:py-24"
          style={{ animationDelay: '280ms' }}
        >
          <div className="mx-auto w-full max-w-none">
            <h2 className="mb-3 text-center text-3xl font-bold text-white md:text-4xl">
              Contact me
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-neutral-400">
              Want to work together? Reach me on any channel below.
            </p>

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#161616] p-5 transition-colors hover:border-[#ff6b00]/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                  <FacebookIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Facebook
                  </p>
                  <p className="font-medium text-white">Aw Min Thant</p>
                </div>
              </a>

              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#161616] p-5 transition-colors hover:border-[#ff6b00]/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                  <Instagram size={24} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Instagram
                  </p>
                  <p className="font-medium text-white">@aw_min_thant</p>
                </div>
              </a>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#161616] p-5 transition-colors hover:border-[#ff6b00]/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                  <Linkedin size={24} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    LinkedIn
                  </p>
                  <p className="font-medium text-white">Aw Min Thant</p>
                </div>
              </a>

              <a
                href={CONTACT.email}
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#161616] p-5 transition-colors hover:border-[#ff6b00]/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                  <Mail size={24} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Email
                  </p>
                  <p className="truncate font-medium text-white">
                    {CONTACT.emailDisplay}
                  </p>
                </div>
              </a>

              <a
                href={CONTACT.phone}
                className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#161616] p-5 transition-colors hover:border-[#ff6b00]/50 sm:col-span-2"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff6b00]/15 text-[#ff6b00]">
                  <Phone size={24} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Phone
                  </p>
                  <p className="font-medium text-white">
                    {CONTACT.phoneDisplay}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <footer className="w-full border-t border-[#2a2a2a] px-4 py-8 text-center text-sm text-neutral-500 sm:px-8 lg:px-12">
          © {new Date().getFullYear()} {YOUR_NAME}. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

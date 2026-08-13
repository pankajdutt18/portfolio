import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'

const navItems = ['Home', 'Services', 'Work', 'Process', 'About', 'Contact']

const valueHighlights = [
  'Custom Design',
  'Mobile First',
  'Fast Performance',
  'SEO Ready',
  'Business Focused',
]

const services = [
  {
    icon: '◎',
    title: 'Business Websites',
    description:
      'Professional websites for companies and local businesses that need a strong online presence.',
  },
  {
    icon: '▣',
    title: 'Landing Pages',
    description:
      'Focused landing pages designed around a specific product, service, campaign, or conversion goal.',
  },
  {
    icon: '◫',
    title: 'E-Commerce Websites',
    description:
      'Online stores that allow businesses to showcase products and accept orders online.',
  },
  {
    icon: '✦',
    title: 'Website Redesign',
    description:
      'Modernize outdated websites with better design, usability, responsiveness, and performance.',
  },
  {
    icon: '▤',
    title: 'Custom Web Solutions',
    description:
      'More advanced websites and web applications built around specific business requirements.',
  },
  {
    icon: '◌',
    title: 'Website Maintenance',
    description:
      'Ongoing updates, improvements, content changes, bug fixes, and technical support.',
  },
]

const projects = [
  {
    category: 'Restaurant',
    name: 'Casa Verde',
    label: 'Concept Project',
    description:
      'A modern restaurant website designed to showcase the menu, atmosphere, location, and reservation experience.',
    features: ['Responsive design', 'Menu showcase', 'Gallery', 'Location integration', 'Reservation CTA'],
  },
  {
    category: 'Fitness',
    name: 'Peak Motion',
    label: 'Concept Project',
    description:
      'A premium gym website focused on memberships, coaching programs, class schedules, and member trust.',
    features: ['Membership design', 'Class schedule', 'Coach profiles', 'CTA funnels', 'Mobile booking'],
  },
  {
    category: 'Beauty Studio',
    name: 'Veloura Studio',
    label: 'Concept Project',
    description:
      'A refined salon brand experience with service lists, treatment packages, and a polished booking journey.',
    features: ['Luxury styling', 'Service menu', 'Gallery', 'Booking flow', 'Brand storytelling'],
  },
  {
    category: 'Real Estate',
    name: 'Horizon & Co.',
    label: 'Concept Project',
    description:
      'A contemporary property website built to highlight listings, neighborhood appeal, and trust-building details.',
    features: ['Property listings', 'Neighborhood highlights', 'Lead forms', 'Agency profile', 'Responsive UX'],
  },
  {
    category: 'Education',
    name: 'Northstar Academy',
    label: 'Concept Project',
    description:
      'An engaging coaching website created to promote courses, expert-led value, and easy enrollment steps.',
    features: ['Course structure', 'Testimonials', 'Enrollment CTA', 'Blog layout', 'Clear messaging'],
  },
  {
    category: 'Local Service',
    name: 'BlueStone Care',
    label: 'Concept Project',
    description:
      'A straightforward service business website built to communicate trust, services, and fast contact options.',
    features: ['Service menu', 'Book a call CTA', 'Service areas', 'Trust signals', 'Quick contact flow'],
  },
]

const industries = [
  'Restaurants & Cafés',
  'Gyms & Fitness',
  'Salons & Beauty',
  'Real Estate',
  'Education & Coaching',
  'Local Businesses',
  'Professional Services',
  'Startups',
]

const benefits = [
  {
    title: 'Designed Around Your Business',
    text: 'Every website is created around your business, audience, services, and goals.',
  },
  {
    title: 'Modern & Professional',
    text: 'The website should make the business look credible, polished, and trustworthy.',
  },
  {
    title: 'Mobile First',
    text: 'The experience works smoothly across phones, tablets, and desktops.',
  },
  {
    title: 'Performance Focused',
    text: 'Fast loading and efficient implementation designed to support business growth.',
  },
  {
    title: 'Clear Communication',
    text: 'Simple communication throughout the project without unnecessary technical jargon.',
  },
  {
    title: 'Built To Grow',
    text: 'The website can evolve as the business grows and new services are added.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We discuss the business, requirements, goals, audience, and website needs.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'The structure, pages, content requirements, and overall direction are planned.',
  },
  {
    number: '03',
    title: 'Design',
    description: "The website's visual experience is designed around the business identity.",
  },
  {
    number: '04',
    title: 'Develop',
    description: 'The approved design is turned into a responsive, functional website.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'After final testing and approval, the website is deployed and made live.',
  },
]

const techStack = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'Git',
  'Responsive Design',
  'API Integration',
]

const marqueeItems = [
  'Brand Systems',
  'Conversion Design',
  'Motion Systems',
  'Web Strategy',
  'Business Growth',
  'Premium UX',
  'Performance',
  'Creative Dev',
]

const floatingStickers = [
  { label: 'Creative Systems', variant: 'sticker-one', left: '8%', top: '18%' },
  { label: 'Launch Ready', variant: 'sticker-two', right: '9%', top: '24%' },
  { label: '( Strategy )', variant: 'sticker-three', left: '14%', bottom: '18%' },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Starting from ₹35,000',
    text: 'For simple landing pages and small websites.',
    featured: false,
  },
  {
    name: 'Business',
    price: 'Starting from ₹75,000',
    text: 'For professional business websites with multiple pages and features.',
    featured: true,
  },
  {
    name: 'Custom',
    price: "Let's Discuss",
    text: 'For e-commerce, advanced functionality, integrations, or custom web applications.',
    featured: false,
  },
]

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on the project requirements, number of pages, features, integrations, and overall complexity. I can recommend an approach after understanding the scope.',
  },
  {
    question: 'How long does a website take?',
    answer:
      'Timelines depend on project scope, design complexity, and client responsiveness. Most projects move through structured stages to keep the process clear and efficient.',
  },
  {
    question: 'Do you build mobile-friendly websites?',
    answer:
      'Yes. Every website is designed to work across phones, tablets, and desktops with a mobile-first approach.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. I can modernize outdated websites with improved design, usability, responsiveness, and stronger business messaging.',
  },
  {
    question: 'Do you provide hosting and domain setup?',
    answer:
      'Yes, assistance with domain, hosting, and deployment can be provided depending on the project and your preferred setup.',
  },
  {
    question: 'Can you maintain my website after launch?',
    answer:
      'Yes, ongoing maintenance and updates can be discussed as part of a continued relationship after launch.',
  },
  {
    question: 'How do we start a project?',
    answer:
      'You can reach out through the contact form, WhatsApp, or email and we can begin with a quick discussion about your business needs.',
  },
]

function LiquidBackground() {
  const { pointer, viewport } = useThree()
  const shaderRef = useRef(null)

  useFrame(({ clock }) => {
    if (!shaderRef.current) return

    shaderRef.current.uniforms.u_time.value = clock.getElapsedTime()
    shaderRef.current.uniforms.u_mouse.value.set(pointer.x, pointer.y)
  })

  return (
    <mesh position={[0, 0, -2.8]}>
      <planeGeometry args={[viewport.width * 3.5, viewport.height * 3.5, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0, 0) },
        }}
        vertexShader={`
          uniform float u_time;
          uniform vec2 u_mouse;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            vec2 mouseInfluence = (u_mouse * 1.5) * vec2(1.0, -1.0);
            float ripple = sin((uv.x + mouseInfluence.x) * 18.0 + u_time * 1.5) * cos((uv.y + mouseInfluence.y) * 20.0 - u_time * 1.2);
            pos.z += ripple * 0.12;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float u_time;
          uniform vec2 u_mouse;
          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p = p * 2.0 + 18.5;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = (vUv - 0.5);
            vec2 mouse = (u_mouse - vec2(0.0)) * vec2(1.0, -1.0);
            float dist = length(uv - mouse * 0.75);
            float ripple = sin(dist * 36.0 - u_time * 2.8) * exp(-dist * 9.0);
            float flow = fbm(uv * 5.5 + u_time * 0.18);
            float swirl = flow + ripple * 0.95;
            float glow = smoothstep(0.8, 0.0, dist);
            vec3 base = vec3(0.06, 0.06, 0.07);
            vec3 highlight = vec3(0.72, 0.74, 0.78);
            vec3 accent = vec3(0.42, 0.44, 0.48);
            vec3 color = base + highlight * swirl * 0.5 + accent * glow * 0.35 + ripple * 0.12;
            color = pow(color, vec3(0.95));
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

function StudioScene() {
  const meshRef = useRef(null)
  const ringRef = useRef(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (meshRef.current) {
      meshRef.current.rotation.x = state.pointer.y * 0.7 + t * 0.25
      meshRef.current.rotation.y = state.pointer.x * 0.9 + t * 0.35
      meshRef.current.position.x = state.pointer.x * 0.8
      meshRef.current.position.y = state.pointer.y * 0.5
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35
      ringRef.current.rotation.x = Math.PI / 2 + state.pointer.y * 0.4
    }
  })

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.2} color="#cccccc" />
      <Environment preset="city" />
      <LiquidBackground />

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.25} mipmapBlur />
        <ChromaticAberration offset={[0.0005, 0.0007]} />
        <DepthOfField focusDistance={0.012} focalLength={0.024} bokehScale={1.6} height={480} />
      </EffectComposer>

      <Float speed={1.7} rotationIntensity={0.8} floatIntensity={1.3}>
        <mesh ref={meshRef} scale={1.45}>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshPhysicalMaterial
            color="#d8d8d8"
            metalness={0.3}
            roughness={0.2}
            transmission={0.1}
            thickness={0.8}
            emissive="#121214"
            envMapIntensity={1.0}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation-x={Math.PI / 2} scale={2.1}>
        <torusGeometry args={[1.9, 0.04, 32, 200]} />
        <meshStandardMaterial color="#cccccc" emissive="#777777" emissiveIntensity={0.5} metalness={0.8} roughness={0.3} />
      </mesh>
    </>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const stickersRef = useRef([])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const frame = requestAnimationFrame(raf)

    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        },
      )
    })

    gsap.to('.studio-canvas', {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    const stickerTween = gsap.to(stickersRef.current, {
      yPercent: -10,
      x: 0,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.28,
      force3D: true,
    })

    const marqueeTracks = gsap.utils.toArray('.marquee-track')
    const marqueeTweens = marqueeTracks.map((track, index) => {
      const direction = index % 2 === 0 ? -1 : 1
      return gsap.to(track, {
        xPercent: direction * 100,
        repeat: -1,
        ease: 'none',
        duration: 18,
        yoyo: true,
        force3D: true,
      })
    })

    const scrollVelocityTween = gsap.quickTo('.marquee-track', 'timeScale', { duration: 0.35, ease: 'power2.out' })
    const updateScrollVelocity = () => {
      const speed = Math.min(1.75, Math.abs(lenis.velocity) * 3.5)
      scrollVelocityTween(speed)
    }

    lenis.on('scroll', updateScrollVelocity)

    gsap.utils.toArray('.sticker-float').forEach((sticker) => {
      const rx = gsap.quickTo(sticker, 'rotationX', { duration: 0.25, ease: 'power3.out' })
      const ry = gsap.quickTo(sticker, 'rotationY', { duration: 0.25, ease: 'power3.out' })
      const scale = gsap.quickTo(sticker, 'scale', { duration: 0.25, ease: 'power3.out' })

      gsap.to(sticker, {
        rotationX: 10,
        rotationY: -10,
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      sticker.addEventListener('pointermove', (event) => {
        const rect = sticker.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        rx(-y * 18)
        ry(x * 16)
        scale(1.05)
      })

      sticker.addEventListener('pointerleave', () => {
        rx(0)
        ry(0)
        scale(1)
      })
    })

    return () => {
      stickerTween.kill()
      marqueeTweens.forEach((tween) => tween.kill())
      cancelAnimationFrame(frame)
      lenis.off('scroll', updateScrollVelocity)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <div className="page-shell">
      <div className="studio-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 36 }} dpr={[1, 1.6]}>
          <StudioScene />
        </Canvas>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="Go to home section">
            <span className="brand-mark">P</span>
            <span className="brand-text">
              Pankaj Dutt
              <small>Web Developer &amp; Digital Solutions</small>
            </span>
          </a>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => {
              const anchor = item.toLowerCase().replace(/\s+/g, '')
              return (
                <a key={item} href={`#${anchor === 'home' ? 'home' : anchor}`} onClick={handleNavClick}>
                  {item}
                </a>
              )
            })}
            <a className="nav-cta" href="#contact" onClick={handleNavClick}>
              Start a Project
            </a>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        <div className="sticker-layer" aria-hidden="true">
          {floatingStickers.map((sticker) => (
            <div
              key={sticker.label}
              className={`sticker-float ${sticker.variant}`}
              style={{ left: sticker.left, top: sticker.top, right: sticker.right, bottom: sticker.bottom }}
              ref={(node) => {
                if (node) stickersRef.current.push(node)
              }}
            >
              {sticker.label}
            </div>
          ))}
        </div>

        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">( 01 )</span>
              <h1>Websites that make businesses look as good online as they are offline.</h1>
              <p>
                I design and develop modern, high-performance websites tailored to businesses that
                want to build credibility, attract customers, and grow online.
              </p>

              <div className="hero-actions">
                <a className="primary-btn" href="#contact">
                  Start a Project
                </a>
                <a className="secondary-btn" href="#work">
                  View My Work
                </a>
              </div>

              <ul className="hero-meta" aria-label="Key client-focused differentiation">
                <li>Custom strategy</li>
                <li>Clear communication</li>
                <li>Business-first approach</li>
              </ul>
            </div>

            <div className="hero-visual reveal">
              <div className="mockup-shell">
                <div className="browser-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="dashboard-preview">
                  <aside className="sidebar-pod">
                    <div className="sidebar-pill pill-one"></div>
                    <div className="sidebar-pill pill-two"></div>
                    <div className="sidebar-pill pill-three"></div>
                  </aside>

                  <div className="content-pod">
                    <div className="hero-card hero-card-large"></div>
                    <div className="hero-card hero-card-tall"></div>
                    <div className="mini-row">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="stats-grid">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="value-strip reveal" aria-label="Key differentiators">
          <div className="container value-row">
            {valueHighlights.map((item) => (
              <div key={item} className="value-item">
                <span className="dot"></span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section-wrap reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Overview )</span>
              <h2>What I Can Build For Your Business</h2>
              <p>
                From simple business websites to more advanced digital experiences, I build websites
                around the actual needs of each business.
              </p>
            </div>

            <div className="marquee-shell">
              <div className="marquee-track">
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="marquee-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section-wrap alt-bg reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Selected Work )</span>
              <h2>Selected Work</h2>
              <p>
                A selection of websites designed to show how different businesses can present
                themselves online.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-visual" aria-hidden="true">
                    <div className="project-window">
                      <span className="project-tab"></span>
                      <div className="project-body">
                        <div className="project-header-line"></div>
                        <div className="project-grid">
                          <div className="project-big"></div>
                          <div className="project-stack">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span className="project-label">{project.label}</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <a className="secondary-btn small-btn" href="#contact">
                      View Live Demo
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Business Types )</span>
              <h2>Built For Different Businesses</h2>
              <p>Every business is different. The website should be too.</p>
            </div>

            <div className="industries-grid">
              {industries.map((industry) => (
                <div className="industry-card" key={industry}>
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap alt-bg reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( The Advantage )</span>
              <h2>Why Work With Me</h2>
            </div>

            <div className="benefits-grid">
              {benefits.map((benefit) => (
                <article className="benefit-card" key={benefit.title}>
                  <div className="benefit-number">0{benefits.indexOf(benefit) + 1}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-wrap reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Process )</span>
              <h2>From Idea to Launch</h2>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <div className="process-item" key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-wrap about-section reveal">
          <div className="container about-grid">
            <div className="about-image">
              <div className="portrait-card">
                <div className="portrait-placeholder">
                  <span>Professional Photo</span>
                </div>
              </div>
            </div>

            <div className="about-copy">
              <span className="eyebrow">( The Perspective )</span>
              <h2>The Person Behind The Websites</h2>
              <p>
                I&apos;m a web developer focused on helping businesses build a stronger presence online. I
                combine modern web development with thoughtful design to create websites that are not
                just visually appealing, but useful for the businesses behind them.
              </p>
              <p>
                I work directly with clients, which means direct communication, personalized service,
                no complicated agency layers, custom solutions, and full involvement from planning to
                launch.
              </p>
              <ul className="check-list">
                <li>Direct communication</li>
                <li>Personalized service</li>
                <li>No agency layers</li>
                <li>Custom solutions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-wrap technology-section reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Stack )</span>
              <h2>Built With Modern Web Technology</h2>
            </div>

            <div className="marquee-shell secondary">
              <div className="marquee-track right">
                {[...techStack, ...techStack].map((item, index) => (
                  <span key={`${item}-${index}`} className="marquee-item muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="tech-stack">
              {techStack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap alt-bg reveal">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">( Investment )</span>
              <h2>Every Business Needs Something Different</h2>
              <p>
                Website pricing depends on the number of pages, features, design requirements,
                integrations, and overall complexity.
              </p>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <article className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                  <h3>{plan.name}</h3>
                  <div className="price-tag">{plan.price}</div>
                  <p>{plan.text}</p>
                  <a className={plan.featured ? 'primary-btn' : 'secondary-btn'} href="#contact">
                    {plan.featured ? 'Get a Quote' : 'Get a Quote'}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap reveal">
          <div className="container faq-wrap">
            <div className="section-heading centered">
              <span className="eyebrow">( Q&A )</span>
              <h2>Frequently Asked Questions</h2>
            </div>

            <div className="faq-list">
              {faqs.map((item, index) => (
                <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={item.question}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>{item.question}</span>
                    <span className="faq-plus">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap cta-section reveal">
          <div className="container cta-panel">
            <div>
              <span className="eyebrow white">( Ready to Grow )</span>
              <h2>Have a Business Idea? Let&apos;s Build Its Website.</h2>
              <p>
                Tell me about your business, what you need, and what you want your website to
                achieve. I&apos;ll help turn the idea into a professional online presence.
              </p>
            </div>
            <div className="cta-actions">
              <a className="primary-btn" href="#contact">
                Start a Project
              </a>
              <a className="secondary-btn light-btn" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                WhatsApp Me
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap reveal">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">( Contact )</span>
              <h2>Let&apos;s Talk About Your Project</h2>
              <p>
                Share your goals, business type, and what you need from the website. I&apos;ll respond
                with the next steps and a clear recommendation.
              </p>

              <div className="contact-list">
                <a href="mailto:hello@yourbrand.com">Email: hello@yourbrand.com</a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                  WhatsApp: +91 99999 99999
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn: linkedin.com/in/yourprofile
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  Instagram: @yourbrandstudio
                </a>
              </div>
            </div>

            <form className="contact-form">
              <div className="field-row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Your name" />
                </label>
                <label>
                  <span>Business Name</span>
                  <input type="text" name="business" placeholder="Company or brand" />
                </label>
              </div>

              <div className="field-row">
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@example.com" />
                </label>
                <label>
                  <span>Phone / WhatsApp</span>
                  <input type="tel" name="phone" placeholder="+91 99999 99999" />
                </label>
              </div>

              <div className="field-row">
                <label>
                  <span>Business Type</span>
                  <input type="text" name="type" placeholder="Restaurant, Salon, Agency..." />
                </label>
                <label>
                  <span>Approximate Budget</span>
                  <input type="text" name="budget" placeholder="₹50,000 - ₹1,50,000" />
                </label>
              </div>

              <label>
                <span>What do you need?</span>
                <input type="text" name="need" placeholder="Business website, landing page, redesign..." />
              </label>

              <label>
                <span>Project Details</span>
                <textarea name="details" rows="5" placeholder="Tell me about your business, audience, goals, and what you want the website to do." />
              </label>

              <button type="submit" className="primary-btn submit-btn">
                Send Project Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">P</span>
              <span className="brand-text">
                Pankaj Dutt
                <small>Web Developer &amp; Digital Solutions</small>
              </span>
            </a>
            <p className="footer-copy">
              I build premium, purpose-driven websites for businesses that want a stronger online
              presence and a clearer path to growth.
            </p>
          </div>

          <div>
            <h3>Navigation</h3>
            <ul>
              {navItems.map((item) => {
                const anchor = item.toLowerCase().replace(/\s+/g, '')
                return (
                  <li key={item}>
                    <a href={`#${anchor === 'home' ? 'home' : anchor}`}>{item}</a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:hello@yourbrand.com">hello@yourbrand.com</a>
              </li>
              <li>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-row">
            <span>© 2026 Pankaj Dutt. All rights reserved.</span>
            <span>Designed &amp; Developed with care.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

import { HashLink as Link } from "react-router-hash-link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useId } from "react";
import {
    FaShieldAlt,
    FaServer,
    FaBrain,
    FaBullhorn,
    FaLaptopCode,
    FaChevronDown,
    FaGlobe, FaExternalLinkAlt
} from "react-icons/fa";


/**
 * AIB's 5 thematic service areas.
 * IDs must stay in sync with the Landing page's SERVICES array — the
 * homepage service cards deep-link here via /our-services#<id>.
 * `letter` mirrors the A–E labelling used in AIB's source service
 * catalogue, and doubles as way-finding as visitors scroll the page.
 * `navLabel` is a short form of the title, used only in the pill nav
 * so long titles don't force it into a scrolling strip.
 */
const services = [
    {
        id: "cybersecurity",
        letter: "A",
        navLabel: "Cybersecurity",
        title: "Cybersecurity Solutions",
        icon: FaShieldAlt,
        intro: "As cyber threats become more frequent and sophisticated, organisations require an integrated approach to protecting their systems, data and operations. Our Cybersecurity Solutions combine governance, secure technology design, continuous testing, access control and proactive threat monitoring to reduce risk, strengthen resilience and support regulatory compliance.",
        offerings: [
            {
                name: "Cybersecurity Governance, Risk & Compliance (GRC)",
                description:
                    "We help organisations establish cybersecurity strategies, policies, risk-management frameworks and compliance programmes aligned with recognised standards. Our services strengthen oversight, accountability and preparedness while reducing regulatory and operational risks.",
            },
            {
                name: "Security Architecture & Cloud Security",
                description:
                    "We design secure technology architectures that protect on-premises, cloud and hybrid environments. Our solutions embed security into networks, applications, platforms and cloud services to improve resilience and reduce exposure.",
            },
            {
                name: "Vulnerability Management & Penetration Testing",
                description:
                    "We identify, assess and prioritise security weaknesses across systems, applications and networks through continuous vulnerability assessments and controlled penetration testing. Clear remediation guidance helps organisations address critical risks before they are exploited.",
            },
            {
                name: "Identity & Access Management (IAM)",
                description:
                    "We implement identity and access controls that ensure the right users receive appropriate access to systems and information. Our solutions include identity governance, privileged-access management, multifactor authentication and access lifecycle management.",
            },
            {
                name: "SOC / Managed Detection & Response (MDR)",
                description:
                    "We provide continuous security monitoring, threat detection, investigation and incident-response support through SOC and MDR services. Our specialists combine advanced technologies and threat intelligence to identify and contain cyber threats rapidly.",
            },
        ],
    },
    {
        id: "dns-domain-infrastructure",
        letter: "B",
        navLabel: "DNS & Domains",
        title: "DNS & Domain Infrastructure Management (DIMaaS)",
        icon: FaServer,
        intro: "A secure and resilient domain-name infrastructure is essential to every country's digital economy and online identity. Our DIMaaS services support governments, regulators and registry operators in establishing, managing and strengthening country-code top-level domain (ccTLD) ecosystems. We combine technical expertise, institutional capacity development, security training and policy advisory to promote reliable, trusted and sustainable domain operations.",
        offerings: [
            {
                name: "ccTLD Setup & Management",
                description:
                    "We support the design, establishment and operation of secure, reliable and standards-aligned ccTLD registry infrastructure. Services cover technical architecture, registry systems, operational procedures, security, resilience and ongoing management support.",
            },
            {
                name: "Registry Capacity Development Programme",
                description:
                    "We strengthen the technical, operational and leadership capabilities of registry teams through structured training, mentoring and knowledge transfer. The programme supports effective registry administration, service delivery, business continuity and long-term institutional sustainability.",
            },
            {
                name: "DNS Security & DNS Abuse Mitigation Training",
                description:
                    "We provide practical training on DNS security, threat monitoring, incident response and the prevention of phishing, malware, botnets and other forms of domain abuse. Participants gain the skills to detect, assess and respond to threats while protecting the integrity of the national domain space.",
            },
            {
                name: "Policy Advisory & Strategic Consulting",
                description:
                    "We help governments, regulators and registry operators develop policies, governance frameworks and strategies for effective ccTLD administration. Our advisory services address regulatory alignment, stakeholder engagement, DNS abuse response, risk management and sustainable registry development.",
            },
        ],
    },
    {
        id: "data-ai-digital-transformation",
        letter: "C",
        navLabel: "Data, AI & Transformation",
        title: "Data, AI & Digital Transformation",
        icon: FaBrain,
        intro: "Organisations need more than technology to succeed — they require trusted data, intelligent systems, efficient processes and people equipped to manage change. Our Data, AI and Digital Transformation services combine strategy, technology and organisational capability to help clients modernise operations, improve decision-making and achieve sustainable growth.",
        offerings: [
            {
                name: "AI & Data Capability",
                description:
                    "We help organisations establish the strategies, skills, infrastructure and governance required to use data and artificial intelligence effectively. Our solutions transform data into practical insights, innovation and measurable business value.",
            },
            {
                name: "Data Science, Modelling & Analytics",
                description:
                    "We apply advanced analytics, statistical modelling and data science to identify patterns, predict outcomes and solve complex business challenges. This enables organisations to make informed, evidence-based decisions.",
            },
            {
                name: "AI Engineering, Deployment & Governance",
                description:
                    "We design, develop and deploy secure, scalable and responsible AI solutions tailored to organisational needs. We also establish governance frameworks that promote transparency, accountability and regulatory compliance.",
            },
            {
                name: "Business Intelligence & Decision Support",
                description:
                    "We develop dashboards, reporting systems and analytical tools that turn organisational data into clear, actionable intelligence. These solutions support faster planning, performance monitoring and executive decision-making.",
            },
            {
                name: "Transformation Delivery",
                description:
                    "We manage digital transformation programmes from strategic planning and solution design through implementation and evaluation. Our structured approach ensures that technology investments deliver practical and sustainable results.",
            },
            {
                name: "Business Process Redesign & Automation",
                description:
                    "We review and redesign business processes to remove inefficiencies, reduce costs and improve service delivery. Automation solutions streamline repetitive tasks, minimise errors and increase productivity.",
            },
            {
                name: "Enterprise Systems Integration",
                description:
                    "We connect applications, databases and digital platforms to enable seamless information exchange across the organisation. This improves operational visibility, collaboration and overall system performance.",
            },
            {
                name: "Cloud Transformation Services",
                description:
                    "We support organisations in assessing, migrating, modernising and managing their systems in secure cloud environments. Our services improve scalability, flexibility, resilience and cost efficiency.",
            },
            {
                name: "Change Management & Capability Building",
                description:
                    "We help employees and leaders successfully adopt new technologies, processes and ways of working. Through communication, training and capacity development, we strengthen institutional readiness and long-term ownership.",
            },
        ],
    },
    {
        id: "communication-digital-marketing",
        letter: "D",
        navLabel: "Marketing",
        title: "Communication & Digital Marketing",
        icon: FaBullhorn,
        intro: "Effective communication and digital visibility are essential for building strong brands, engaging audiences and generating sustainable growth. Our Communication and Digital Marketing services combine strategy, creative content, targeted campaigns and data-driven insights to strengthen brand awareness, attract customers and deliver measurable results across digital channels.",
        offerings: [
            {
                name: "Digital Marketing Strategy & Consulting",
                description:
                    "We develop tailored digital marketing strategies aligned with organisational objectives, target audiences and market opportunities. Our consulting services provide clear campaign direction, channel selection, implementation roadmaps and performance measures.",
            },
            {
                name: "Search Engine Optimisation (SEO) & Content Marketing",
                description:
                    "We improve online visibility through search-engine optimisation, keyword strategy and relevant, audience-focused content. Our approach increases organic traffic, strengthens brand authority and supports long-term customer engagement.",
            },
            {
                name: "Paid Media & Performance Advertising",
                description:
                    "We plan, manage and optimise targeted advertising campaigns across search engines, social media and other digital platforms. Campaigns focus on reaching the right audiences, generating qualified leads and maximising return on investment.",
            },
            {
                name: "Social Media Management & Community Engagement",
                description:
                    "We manage social media platforms through strategic content planning, publishing, audience interaction and reputation monitoring. Our services build active online communities, strengthen brand relationships and improve customer engagement.",
            },
            {
                name: "Email Marketing & Marketing Automation",
                description:
                    "We design personalised email campaigns and automated customer journeys that nurture leads and maintain audience relationships. Automation improves communication consistency, customer retention and conversion rates.",
            },
            {
                name: "Analytics, Insights & Optimisation",
                description:
                    "We track and analyse campaign performance, audience behaviour and digital engagement across multiple channels. These insights guide continuous improvement, optimise marketing investments and support evidence-based decisions.",
            },
        ],
    },
    {
        id: "web-technology-digital-positioning",
        letter: "E",
        navLabel: "Web Technology",
        title: "Web Technology & Digital Positioning Solutions",
        icon: FaLaptopCode,
        intro: "Our Web Technology and Digital Positioning solutions help organizations build a strong, credible, and competitive online presence. We combine modern web development, secure digital infrastructure, strategic branding, search visibility, and performance optimization to create platforms that attract audiences, communicate value, and support business growth. From corporate websites and e-commerce platforms to hosting, domain services, and digital positioning, our solutions are secure, responsive, scalable, and aligned with each client's strategic objectives.",
        offerings: [
            {
                name: "Website Design and Development",
                description:
                    "Design and development of professional, responsive, user-friendly websites tailored to corporate, institutional, nonprofit, and individual needs.",
            },
            {
                name: "E-Commerce Solutions",
                description:
                    "Development of secure online stores with product management, payment integration, order processing, customer management, and performance reporting.",
            },
            {
                name: "Web and Mobile Application Development",
                description:
                    "Creation of customized web-based and mobile applications that automate processes, improve service delivery, and enhance customer engagement.",
            },
            {
                name: "Domain Registration and Management",
                description:
                    "Registration, renewal, transfer, configuration, and management of local and international domain names to protect and strengthen clients' digital identities.",
            },
            {
                name: "Web Hosting and Cloud Solutions",
                description:
                    "Reliable, secure, and scalable hosting services, including server management, backups, SSL certificates, email hosting, and performance monitoring.",
            },
            {
                name: "Search Engine Optimization (SEO)",
                description:
                    "Technical and content optimization to improve website visibility, increase organic traffic, and strengthen rankings on major search engines.",
            },
            {
                name: "Website Maintenance and Technical Support",
                description:
                    "Continuous website updates, security monitoring, troubleshooting, content management, backups, and technical assistance.",
            },
            {
                name: "User Experience and Interface Design (UX/UI)",
                description:
                    "Research and design of intuitive digital interfaces that improve accessibility, usability, customer satisfaction, and conversion rates.",
            },
            {
                name: "Website Analytics and Performance Optimization",
                description:
                    "Implementation of analytics tools and performance monitoring to evaluate visitor behaviour, improve loading speed, and support data-driven decisions.",
            },
            {
                name: "Content Management System Solutions",
                description:
                    "Deployment and customization of content management platforms that enable clients to manage website content efficiently and securely.",
            },
            {
                name: "Digital Accessibility and Compliance",
                description:
                    "Improvement of website accessibility, privacy, security, and compliance with applicable digital standards and data protection requirements.",
            },
        ],
    },
];

/**
 * A single expandable offering row. Long sections (some run to 9–11
 * offerings) read far better as a scannable, disclosure-style list than
 * as a wall of description-filled cards — visitors see every title up
 * front and open only what they want to read.
 */
const OfferingItem = ({ offering, defaultOpen = false, accent }) => {
    const [open, setOpen] = useState(defaultOpen);
    const panelId = useId();

    return (
        <div className="border-b border-[#183C58]/10 last:border-b-0">
            <h4>
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 text-left py-5 group"
                >
                    <span className="flex items-center gap-3 font-medium text-[#183C58] group-hover:text-[#099AB3] transition-colors duration-200">
                        <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: accent }}
                            aria-hidden="true"
                        />
                        {offering.name}
                    </span>
                    <FaChevronDown
                        aria-hidden="true"
                        className={`shrink-0 text-[#183C58]/40 transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </h4>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-gray-600 leading-relaxed pl-4.5 pb-5 pr-8">
                            {offering.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Services = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Handle scroll events to toggle button visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top logic
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Land on the right section when arriving via a hash link (e.g. /our-services#cybersecurity)
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (!hash) return;
            const id = hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                // Timeout lets the DOM (and any layout-affecting animations) settle first
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        };

        scrollToHash();
        window.addEventListener("hashchange", scrollToHash);
        return () => window.removeEventListener("hashchange", scrollToHash);
    }, []);

    return (
        <>
            <Navbar />

            {/* Header */}
            <header className="w-full min-h-[40vh] flex flex-col items-center justify-center text-center gap-4 px-6 bg-gradient-to-r from-[#183C58] to-[#099AB3] pt-24 pb-12">

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl"
                >
                    Our Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/85 max-w-2xl leading-relaxed"
                >
                    Five thematic practice areas, one integrated approach to helping your
                    organisation secure, modernise and grow in the digital economy.
                </motion.p>
            </header>

            {/* Quick jump navigation */}
            <nav
                aria-label="Service categories"
                className="sticky top-16 md:top-20 z-20 bg-white/95 backdrop-blur border-b border-[#183C58]/10"
            >
                <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-16 py-3">
                    {services.map(({ id, navLabel, icon: Icon }) => (
                        <li key={id}>
                            <Link
                                to={`#${id}`}
                                className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-medium text-[#183C58] border border-[#183C58]/15 rounded-full px-3.5 py-2 hover:bg-[#099AB3] hover:text-white hover:border-[#099AB3] transition-colors duration-200"
                            >
                                <Icon aria-hidden="true" />
                                {navLabel}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Services Section */}
            <main className="px-6 md:px-16">
                {services.map(({ id, letter, title, icon: Icon, intro, offerings }, index) => {
                    const accent = index % 2 === 1 ? "#183C58" : "#099AB3";
                    return (
                        <section
                            key={id}
                            id={id}
                            aria-labelledby={`${id}-heading`}
                            className={`scroll-mt-32 py-16 md:py-20 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"
                                } -mx-6 md:-mx-16 px-6 md:px-16`}
                        >
                            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
                                {/* Left: identity + intro, sticky on desktop for orientation while offerings scroll */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 0.6 }}
                                    className="lg:col-span-2 lg:sticky lg:top-32 self-start"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <span
                                            className="flex items-center justify-center w-11 h-11 rounded-full text-white font-bold text-lg shrink-0"
                                            style={{ backgroundColor: accent }}
                                            aria-hidden="true"
                                        >
                                            {letter}
                                        </span>
                                        <Icon
                                            className="text-2xl shrink-0"
                                            style={{ color: accent }}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h2
                                        id={`${id}-heading`}
                                        className="text-2xl sm:text-3xl font-semibold text-[#183C58] mb-5 leading-tight"
                                    >
                                        {title}
                                    </h2>
                                    <p
                                        className="text-gray-700 leading-relaxed border-l-4 pl-5"
                                        style={{ borderColor: accent }}
                                    >
                                        {intro}
                                    </p>
                                </motion.div>

                                {/* Right: offerings as an accordion — scannable at a glance, detail on demand */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.15 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="lg:col-span-3 bg-white rounded-2xl border border-[#183C58]/10 shadow-sm px-6 sm:px-8"
                                >
                                    {offerings.map((offering, i) => (
                                        <OfferingItem
                                            key={offering.name}
                                            offering={offering}
                                            defaultOpen={i === 0}
                                            accent={accent}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </section>
                    );
                })}
            </main>

            {/* Closing CTA */}
         {/* Closing CTA */}
<section className="relative overflow-hidden bg-gradient-to-r from-[#183C58] to-[#099AB3] px-6 md:px-16 py-16 md:py-20">
    {/* Soft decorative accents for depth — purely visual, hidden from assistive tech */}
    <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" aria-hidden="true" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5" aria-hidden="true" />

    <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4FD1D9] bg-white/10 px-4 py-1.5 rounded-full">
            <FaGlobe aria-hidden="true" /> Domains & Hosting
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug max-w-2xl">
            Visit Our Domain Registration &amp; Web Hosting Portal
        </h2>

        <p className="text-white/80 max-w-xl leading-relaxed">
            Register a domain, choose a hosting plan, or manage your existing
            services directly through our dedicated portal, iadomains.com.
        </p>

        <a
            href="https://www.iadomains.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#183C58] font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300 mt-2"
        >
            Visit iadomains.com
            <FaExternalLinkAlt className="text-sm" aria-hidden="true" />
        </a>
    </div>
</section>

            {/* Scroll to Top Button */ }
    {
        showScrollButton && (
            <motion.button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="fixed bottom-5 right-5 bg-[#099AB3] text-white p-4 rounded-full shadow-lg hover:bg-[#077f91] focus:outline-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
            >
                ↑
            </motion.button>
        )
    }

    <Footer />
        </>
    );
};

export default Services;
import { HashLink as Link } from "react-router-hash-link";
import Navbar from "../../components/navbar";
import hero from "../../assets/images/hero.jpg";
import call from "../../assets/images/call.jpg";
import { motion } from "framer-motion";
import about from "../../assets/images/about-image.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {
    FaShieldAlt,
    FaServer,
    FaBrain,
    FaBullhorn,
    FaLaptopCode,
    FaChevronDown,
    FaPaperPlane,
    FaCheckCircle as FaSuccess,
    FaExclamationCircle,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";
import Footer from "../../components/footer";

const SERVICES = [
    {
        id: "cybersecurity",
        title: "Cybersecurity Solutions",
        icon: FaShieldAlt,
        summary:
            "An integrated approach to protecting systems, data and operations, combining governance, secure design, testing, access control and proactive threat monitoring.",
        offerings: [
            "Cybersecurity Governance, Risk & Compliance (GRC)",
            "Security Architecture & Cloud Security",
            "Vulnerability Management & Penetration Testing",
            "Identity & Access Management (IAM)",
            "SOC / Managed Detection & Response (MDR)",
        ],
    },
    {
        id: "dns-domain-infrastructure",
        title: "DNS & Domain Infrastructure Management (DIMaaS)",
        icon: FaServer,
        summary:
            "Supporting governments, regulators and registry operators to establish, manage and strengthen secure, trusted country-code top-level domain (ccTLD) ecosystems.",
        offerings: [
            "ccTLD Setup & Management",
            "Registry Capacity Development Program",
            "DNS Security & DNS Abuse Mitigation Training",
            "Policy Advisory & Strategic Consulting",
        ],
    },
    {
        id: "data-ai-digital-transformation",
        title: "Data, AI & Digital Transformation",
        icon: FaBrain,
        summary:
            "Practical, secure and scalable solutions that unlock the value of data, adopt responsible AI, modernise operations and build stronger digital capabilities.",
        offerings: [
            "Data Science, Modelling & Analytics",
            "AI Engineering, Deployment & Governance",
            "Business Intelligence & Decision Support",
            "Business Process Redesign & Automation",
            "Enterprise Systems Integration",
            "Cloud Transformation Services",
            "Change Management & Capability Building",
        ],
    },
    {
        id: "communication-digital-marketing",
        title: "Communication & Digital Marketing",
        icon: FaBullhorn,
        summary:
            "Strategy, creative content, targeted campaigns and data-driven insights that strengthen brand awareness, attract customers and deliver measurable results.",
        offerings: [
            "Digital Marketing Strategy & Consulting",
            "SEO & Content Marketing",
            "Paid Media & Performance Advertising",
            "Social Media Management & Community Engagement",
            "Email Marketing & Marketing Automation",
            "Analytics, Insights & Optimization",
        ],
    },
    {
        id: "web-technology-digital-positioning",
        title: "Web Technology & Digital Positioning",
        icon: FaLaptopCode,
        summary:
            "Modern web development, secure infrastructure, strategic branding and search visibility that create platforms which attract audiences and support growth.",
        offerings: [
            "Website Design and Development",
            "E-Commerce Solutions",
            "Web and Mobile Application Development",
            "Domain Registration & Web Hosting",
            "Search Engine Optimization (SEO)",
            "UX/UI Design & Website Maintenance",
        ],
    },
];

// Simple, dependency-free client-side validators.
// These reduce obviously malformed/empty submissions before they ever
// reach the network layer. Server-side validation & sanitisation is
// still required — client checks are a UX convenience, never a security boundary.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 80;
const MESSAGE_MAX = 1000;

const Landing = () => {
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

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    /*  Contact / message form state                                     */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "",
        message: "",
        company: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success | error
    const liveRegionRef = useRef(null);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the field-level error 
        setFormErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    };

    const validateForm = () => {
        const errors = {};
        const trimmedName = formData.name.trim();
        const trimmedMessage = formData.message.trim();

        if (!trimmedName) errors.name = "Please enter your name.";
        else if (trimmedName.length > NAME_MAX)
            errors.name = `Name must be under ${NAME_MAX} characters.`;

        if (!formData.email.trim()) errors.email = "Please enter your email address.";
        else if (!EMAIL_PATTERN.test(formData.email.trim()))
            errors.email = "Please enter a valid email address.";

        if (!formData.service) errors.service = "Please select a service area.";

        if (!trimmedMessage) errors.message = "Please enter a message.";
        else if (trimmedMessage.length > MESSAGE_MAX)
            errors.message = `Message must be under ${MESSAGE_MAX} characters.`;

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.company) {
            setFormStatus("success");
            return;
        }

        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            setFormStatus("error");
            return;
        }

        setFormStatus("submitting");
        try {
            // Wire for real endpoint, e.g.:
            // const res = await fetch("/api/contact", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({
            //     name: formData.name.trim(),
            //     email: formData.email.trim(),
            //     service: formData.service,
            //     message: formData.message.trim(),
            //   }),
            // });
            // if (!res.ok) throw new Error("Request failed");
            //
            // Security notes for the backend endpoint:
            //  - Re-validate & sanitise every field server-side (never trust the client).
            //  - Rate-limit by IP to prevent spam/abuse.
            //  - Send over HTTPS only; store with least-privilege access.
            //  - Consider a CAPTCHA/CSRF token for production traffic.

            await new Promise((resolve) => setTimeout(resolve, 900)); // placeholder latency

            setFormStatus("success");
            setFormData({ name: "", email: "", service: "", message: "", company: "" });
        } catch {
            setFormStatus("error");
        } finally {
            liveRegionRef.current?.focus();
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="relative w-full h-[100svh] md:h-screen mt-24 overflow-hidden">
                {/* Background image */}
                <img
                    src={hero}
                    alt="AIB Consulting team supporting a client's digital transformation"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 z-[5] bg-gradient-to-t from-black via-[#0b1f30]/90 to-[#0b1f30]/40"
                    aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4FD1D9] bg-white/10 px-4 py-1.5 rounded-full mb-6"
                    >
                        ICT Consulting for the Digital Economy
                    </motion.span>

                    <motion.h1
                        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-5 leading-tight max-w-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Helping Businesses Transition to and Thrive in the Digital World
                    </motion.h1>

                    <motion.h2
                        className="text-white/85 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        Your trusted partner for cybersecurity, data &amp; AI, digital
                        marketing and modern web technology.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                    >
                        <Link to="/#contact-form">
                            <motion.button
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-[#099AB3] rounded-full text-white font-semibold px-8 py-3.5 shadow-xl hover:bg-[#077f91] hover:scale-105 transition-all duration-300"
                            >
                                Talk to a Consultant
                            </motion.button>
                        </Link>

                        <Link to="/#services">
                            <button className="border border-white/40 text-white font-medium rounded-full px-8 py-3.5 hover:bg-white hover:text-[#183C58] transition-colors duration-300">
                                Explore Our Services
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ opacity: { delay: 1.4, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
                    className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-white/70"
                    aria-hidden="true"
                >
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <FaChevronDown className="text-sm" />
                </motion.div>
            </div>
            {/* About Us Section */}
            <div className="bg-white flex flex-col-reverse md:flex-row gap-10 py-10 px-6 md:px-16 mt-16 items-center overflow-x-hidden">
                {/* Image slides in from the left */}
                <motion.img
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full md:w-1/2 object-cover rounded-lg"
                    src={about}
                    alt="AIB Consulting advisors reviewing a client's ICT strategy"
                />

                {/* Text slides in from the right */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex flex-col justify-center gap-6"
                >
                    <div className="flex gap-2 justify-center md:justify-start">
                        <span className="text-4xl md:text-4xl font-medium text-[#183C58]">About</span>
                        <span className="text-4xl md:text-4xl font-medium text-[#099AB3]">Us</span>
                    </div>

                    <p className="text-[#183C58] text-justify max-w-full leading-relaxed">
                        As customer habits rapidly evolve, companies must innovate, adapt
                        their operations, transform business models, and embrace emerging
                        technologies to stay competitive.
                        <br />
                        <br />
                        At AIB Consulting, we are dedicated to helping businesses streamline
                        their ICT systems and unlock new growth opportunities through
                        turnkey ICT solutions.
                        <br />
                        <br />
                        Our team of expert consultants partners with organizations to
                        reposition them for success in the digital economy — providing
                        services that tackle the most critical areas of digital
                        transformation and operational excellence.
                    </p>

                    <div>
                        <Link to="about-us">
                            <button className="bg-[#099AB3] rounded-3xl px-6 py-3 mt-2 text-white hover:scale-105 transition duration-300">
                                See More
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="flex flex-col bg-gray-50 items-center text-center md:text-left md:items-start gap-8 py-16 px-6 md:px-16 mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                {/* Heading */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="text-4xl sm:text-3xl md:text-4xl font-medium text-[#183C58]">
                        Why Work
                    </span>
                    <span className="text-4xl sm:text-3xl md:text-4xl font-medium text-[#099AB3]">
                        With Us
                    </span>
                </div>

                {/* Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-6xl w-full">
                    {/* Box 1 */}
                    <motion.div
                        className="bg-[#f9f9f9] rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                <FaCheckCircle className="text-[#099AB3] text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#183C58]">
                                    Get proven business IT solutions.
                                </h3>
                                <p className="text-[#183C58] leading-relaxed mt-2">
                                    We have rich experience in deploying and managing diverse business IT solutions.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Box 2 */}
                    <motion.div
                        className="bg-[#f9f9f9] rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                <FaCheckCircle className="text-[#099AB3] text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#183C58]">
                                    Stay ahead of technology.
                                </h3>
                                <p className="text-[#183C58] leading-relaxed mt-2">
                                    Our consultants are well-versed in various technologies. The solutions we recommend are smart, proven, and designed to meet your business goals.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Box 3 */}
                    <motion.div
                        className="bg-[#f9f9f9] rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                <FaCheckCircle className="text-[#099AB3] text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#183C58]">
                                    In-depth industry experience.
                                </h3>
                                <p className="text-[#183C58] leading-relaxed mt-2">
                                    Our team has working experience across diverse industries, from banking to oil exploration.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Box 4 */}
                    <motion.div
                        className="bg-[#f9f9f9] rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, ease: "easeOut" },
                            },
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
                                <FaCheckCircle className="text-[#099AB3] text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#183C58]">
                                    Capacity to support your business growth.
                                </h3>
                                <p className="text-[#183C58] leading-relaxed mt-2">
                                    We provide comprehensive IT solutions so you can focus on growing your business without upfront hardware and software investments slowing you down.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

        
            {/*  Services Section — 5 thematic AIB service areas               */}
            <section
                id="services"
                aria-labelledby="services-heading"
                className="py-16 px-6 md:px-16 bg-white"
            >
                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center md:mx-0 md:text-left mb-4">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span
                            id="services-heading"
                            className="text-4xl sm:text-3xl md:text-4xl font-medium text-[#183C58]"
                        >
                            AIB
                        </span>
                        <span className="text-4xl sm:text-3xl md:text-4xl font-medium text-[#099AB3]">
                            Services
                        </span>
                    </div>
                    <p className="text-[#183C58]/80 mt-4 leading-relaxed">
                        Five thematic practice areas, one integrated approach to helping your
                        organisation compete, secure itself and grow in the digital economy.
                    </p>
                </div>

                {/* Services Grid with Animation */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                >
                    {SERVICES.map(({ id, title, icon: Icon, summary, offerings }) => (
                        <motion.article
                            key={id}
                            id={id}
                            variants={cardVariants}
                            className="group flex flex-col bg-white border border-[#183C58]/10 rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-mt-28"
                        >
                            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#099AB3]/10 mb-5 group-hover:bg-[#099AB3] transition-colors duration-300">
                                <Icon className="text-[#099AB3] group-hover:text-white text-2xl transition-colors duration-300" />
                            </div>

                            <h3 className="text-xl font-semibold text-[#183C58] mb-3 leading-snug">
                                {title}
                            </h3>

                            <p className="text-[#183C58]/80 text-sm leading-relaxed mb-5">
                                {summary}
                            </p>

                            <ul className="space-y-2 mb-6 flex-1">
                                {offerings.slice(0, 4).map((offering) => (
                                    <li
                                        key={offering}
                                        className="flex items-start gap-2 text-sm text-[#183C58]/90"
                                    >
                                        <FaCheckCircle
                                            className="text-[#099AB3] mt-0.5 shrink-0"
                                            aria-hidden="true"
                                        />
                                        <span>{offering}</span>
                                    </li>
                                ))}
                                {offerings.length > 4 && (
                                    <li className="text-sm text-[#099AB3] font-medium pl-6">
                                        +{offerings.length - 4} more
                                    </li>
                                )}
                            </ul>

                            <Link
                                to={`/our-services#${id}`}
                                aria-label={`Learn more about ${title}`}
                                className="mt-auto self-start"
                            >
                                <button className="bg-[#099AB3] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#077f91] transition">
                                    Learn More
                                </button>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </section>

         
            {/*  Contact — message form over the "get in touch" backdrop      */}
            <section
                id="contact-form"
                aria-labelledby="contact-form-heading"
                className="relative w-full bg-cover bg-center mt-16 overflow-x-hidden"
                style={{ backgroundImage: `url(${call})` }}
            >
                {/* Overlay for text legibility against the photo */}
                <div className="absolute inset-0 bg-[#0b1f30]/85" aria-hidden="true" />

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center px-6 md:px-16 py-16 md:py-24">
                    {/* Intro / contact details — sits directly on the image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="lg:col-span-2 flex flex-col gap-6 text-white"
                    >
                        <div className="flex flex-wrap gap-2">
                            <span
                                id="contact-form-heading"
                                className="text-4xl sm:text-3xl md:text-4xl font-medium text-white"
                            >
                                Send Us
                            </span>
                            <span className="text-4xl sm:text-3xl md:text-4xl font-medium text-[#4FD1D9]">
                                A Message
                            </span>
                        </div>
                        <p className="text-white/85 leading-relaxed">
                            Tell us which service area you're interested in and a short note
                            about what you need. A consultant will get back to you shortly.
                        </p>

                        <ul className="flex flex-col gap-4 mt-2">
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#4FD1D9] shrink-0" aria-hidden="true" />
                                <span>+233-302905659 &nbsp;|&nbsp; +233-243380612</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-[#4FD1D9] shrink-0" aria-hidden="true" />
                                <span>info@aibconsulting.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-[#4FD1D9] shrink-0" aria-hidden="true" />
                                <span>Accra, Ghana</span>
                            </li>
                        </ul>

                        <Link to="/contact-us" className="mt-2 self-start">
                            <button className="border border-white/40 text-white font-medium px-6 py-2.5 rounded-full hover:bg-white hover:text-[#183C58] transition-colors duration-300">
                                View Full Contact Details
                            </button>
                        </Link>
                    </motion.div>

                    {/* Form — elevated white card floating over the image */}
                    <motion.form
                        onSubmit={handleSubmit}
                        noValidate
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="lg:col-span-3 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5"
                    >
                        {/* Honeypot — visually hidden, ignored by real users, catches simple bots */}
                        <div className="absolute w-px h-px overflow-hidden opacity-0 -z-10" aria-hidden="true">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                value={formData.company}
                                onChange={handleFieldChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm font-medium text-[#183C58]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    maxLength={NAME_MAX}
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleFieldChange}
                                    aria-required="true"
                                    aria-invalid={Boolean(formErrors.name)}
                                    aria-describedby={formErrors.name ? "name-error" : undefined}
                                    className={`rounded-lg border px-4 py-2.5 text-[#183C58] focus:outline-none focus:ring-2 focus:ring-[#099AB3] transition ${formErrors.name ? "border-red-400" : "border-[#183C58]/20"
                                        }`}
                                    placeholder="Jane Doe"
                                />
                                {formErrors.name && (
                                    <p id="name-error" className="text-xs text-red-500">
                                        {formErrors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm font-medium text-[#183C58]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleFieldChange}
                                    aria-required="true"
                                    aria-invalid={Boolean(formErrors.email)}
                                    aria-describedby={formErrors.email ? "email-error" : undefined}
                                    className={`rounded-lg border px-4 py-2.5 text-[#183C58] focus:outline-none focus:ring-2 focus:ring-[#099AB3] transition ${formErrors.email ? "border-red-400" : "border-[#183C58]/20"
                                        }`}
                                    placeholder="jane@company.com"
                                />
                                {formErrors.email && (
                                    <p id="email-error" className="text-xs text-red-500">
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="service" className="text-sm font-medium text-[#183C58]">
                                Service Area
                            </label>
                            <div className="relative">
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleFieldChange}
                                    aria-required="true"
                                    aria-invalid={Boolean(formErrors.service)}
                                    aria-describedby={formErrors.service ? "service-error" : undefined}
                                    className={`w-full appearance-none rounded-lg border px-4 py-2.5 pr-10 text-[#183C58] bg-white focus:outline-none focus:ring-2 focus:ring-[#099AB3] transition ${formErrors.service ? "border-red-400" : "border-[#183C58]/20"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Select a service area…
                                    </option>
                                    {SERVICES.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.title}
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#183C58]/50 text-sm"
                                    aria-hidden="true"
                                />
                            </div>
                            {formErrors.service && (
                                <p id="service-error" className="text-xs text-red-500">
                                    {formErrors.service}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="message" className="text-sm font-medium text-[#183C58]">
                                    Message
                                </label>
                                <span className="text-xs text-[#183C58]/50">
                                    {formData.message.length}/{MESSAGE_MAX}
                                </span>
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                maxLength={MESSAGE_MAX}
                                value={formData.message}
                                onChange={handleFieldChange}
                                aria-required="true"
                                aria-invalid={Boolean(formErrors.message)}
                                aria-describedby={formErrors.message ? "message-error" : undefined}
                                className={`resize-none rounded-lg border px-4 py-2.5 text-[#183C58] focus:outline-none focus:ring-2 focus:ring-[#099AB3] transition ${formErrors.message ? "border-red-400" : "border-[#183C58]/20"
                                    }`}
                                placeholder="Tell us a bit about what you're looking to achieve…"
                            />
                            {formErrors.message && (
                                <p id="message-error" className="text-xs text-red-500">
                                    {formErrors.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === "submitting"}
                            className="inline-flex items-center justify-center gap-2 bg-[#099AB3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full hover:bg-[#077f91] hover:scale-[1.02] transition-all duration-300 mt-1"
                        >
                            {formStatus === "submitting" ? (
                                "Sending…"
                            ) : (
                                <>
                                    Send Message <FaPaperPlane aria-hidden="true" />
                                </>
                            )}
                        </button>

                        {/* Live region: announced to screen readers, visible confirmation for everyone else */}
                        <div
                            ref={liveRegionRef}
                            tabIndex={-1}
                            role="status"
                            aria-live="polite"
                            className="outline-none"
                        >
                            {formStatus === "success" && (
                                <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                                    <FaSuccess aria-hidden="true" /> Thanks — your message has been sent. We'll be in touch soon.
                                </p>
                            )}
                            {formStatus === "error" && Object.keys(formErrors).length > 0 && (
                                <p className="flex items-center gap-2 text-sm text-red-500 font-medium">
                                    <FaExclamationCircle aria-hidden="true" /> Please fix the highlighted fields and try again.
                                </p>
                            )}
                        </div>
                    </motion.form>
                </div>
            </section>

            {/* Scroll to Top Button */}
            {showScrollButton && (
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
            )}

            <Footer />
        </>
    );
};

export default Landing;
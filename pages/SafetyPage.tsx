import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDownIcon, CapabilityRiskIcon, ThresholdsIcon, SafeguardsIcon, EvaluationIcon, GovernanceIcon, MonitoringIcon, ReportingIcon, ResearchIcon } from '../components/icons';

// Data for the page content, kept inside component for encapsulation
const principles = [
    { title: 'Capability‑Risk Alignment', text: 'Safety requirements scale with model capability.', icon: CapabilityRiskIcon },
    { title: 'Clear Thresholds', text: 'Measurable triggers signal transitions to the next safety tier.', icon: ThresholdsIcon },
    { title: 'Layered Safeguards', text: 'Combine technical, procedural, and organizational measures.', icon: SafeguardsIcon },
    { title: 'Rigorous Evaluation', text: 'Formalize testing, including adversarial probes and red teaming.', icon: EvaluationIcon },
    { title: 'Accountable Governance', text: 'Establish oversight bodies to review and approve deployments.', icon: GovernanceIcon },
    { title: 'Continuous Monitoring', text: 'Deploy real‑time telemetry to track model behavior.', icon: MonitoringIcon },
    { title: 'Transparent Reporting', text: 'Document assessments, incidents, and mitigation steps.', icon: ReportingIcon },
    { title: 'Research Integration', text: 'Stay current with AI safety research and incorporate it.', icon: ResearchIcon }
];

const safetyLevels = [
    { level: 1, title: "Foundational Safety", objective: "Implement basic controls to prevent trivial failures and obvious misuse in narrow, low-impact systems.", applicability: ["Rule-based classification APIs", "Simple Q&A bots with closed knowledge bases", "Recommendation engines with limited scope"], measures: ["Input Validation & Output Constraints", "Access Controls & Authentication", "Unit Tests & Manual Reviews", "Documentation & Onboarding"], caseStudy: "A retail company deploys a Level 1 sentiment analysis API to filter customer reviews. By enforcing profanity filters, logging every API call, and limiting access to internal clients, the team prevents both malicious inputs and accidental leakage of user data." },
    { level: 2, title: "Enhanced Safety for Interactive Systems", objective: "Introduce moderate adversarial defenses and basic monitoring to address common risks in interactive, generative, or conversational applications.", applicability: ["Entry‑level chatbots with domain constraints", "Constrained virtual assistants", "Simple generative tools"], measures: ["Robust Filtering & Refusal Triggers", "Sandboxing & Anomaly Detection", "Basic Red Teaming", "Incident Response Planning"], caseStudy: "A financial services chatbot at Level 2 employs semantic detection to refuse queries requesting investment advice. All code snippets are sandboxed, and alerts notify security if anomalous resource consumption occurs. Basic red teaming uncovers a prompt bypass; the fix is rolled out within 48 hours." },
    { level: 3, title: "Substantial Safety for Capable Systems", objective: "Defend against sophisticated misuse, integrate human oversight for high‑stakes actions, and deepen adversarial resilience.", applicability: ["Advanced conversational agents", "Media and code generation tools", "Systems accessing external data"], measures: ["Constitutional‑Style Jailbreak Defenses", "Behavioral Monitoring", "Expert Red Teaming & Ethical Review", "Formal Safety Cases"], caseStudy: "A healthcare assistant at Level 3 provides medical literature summaries. Using a constitutional AI approach, it refuses requests for personalized diagnoses. An external panel of medical and AI safety experts reviews test logs and endorses the system’s safety case before it goes live." },
    { level: 4, title: "Advanced Safety for Near‑Frontier Systems", objective: "Anticipate and mitigate emergent behaviors in general‑purpose systems nearing human‑level performance.", applicability: ["Multi‑modal models (text, vision, audio)", "Large foundation models", "Experimental agentic systems"], measures: ["Scaled Constitutional AI & RLHF", "Mechanistic Interpretability", "External Expert Validation", "Regulatory Coordination"], caseStudy: "A lab's multimodal reasoning engine reaches near-human benchmarks. Mechanistic interpretability reveals potential corruption of planning circuits; predictive detectors flag these cases. After an external AI safety audit, the team updates RLHF policies and secures compliance certification." },
    { level: 5, title: "AGI‑Level Safety", objective: "Manage existential and systemic risks posed by systems at or beyond human intelligence—ensuring provable control and global governance.", applicability: ["Experimental AGI prototypes", "Agentic systems with strategic planning", "Large-scale multi‑agent ecosystems"], measures: ["Provably Robust Alignment", "Hardware & Network Failsafes", "AI‑Assisted Oversight", "Global Governance"], caseStudy: "A consortium collaborates on an AGI testbed. Formal methods verify the system cannot override shutdown commands. Red team exercises simulate strategic scenarios, revealing hidden incentives that are then mathematically neutralized. A global governance council reviews logs, ensuring transparency." }
];

const gettingStartedSteps = [
    { title: 'Capability Assessment', text: 'Catalog your AI projects and map each to the corresponding safety level.' },
    { title: 'Gap Analysis', text: 'List required safety measures that are not yet implemented and prioritize them by risk.' },
    { title: 'Roadmap Development', text: 'Create a timeline for implementing missing safeguards, starting with the highest-risk projects.' },
    { title: 'Governance Structure', text: 'Establish safety review committees with clear roles, responsibilities, and decision-rights.' },
    { title: 'Measurement & Monitoring', text: 'Build dashboards to track key safety metrics and set up alerting thresholds.' },
    { title: 'Training & Culture', text: 'Educate all teams on the framework and foster a culture of “safety by design.”' },
    { title: 'Iterate & Evolve', text: 'Review framework thresholds and measures quarterly, incorporating new safety research and lessons learned.' }
];

const Section: React.FC<{ id: string; observerRef: React.RefObject<HTMLDivElement>; children: React.ReactNode, className?: string }> = ({ id, observerRef, children, className = 'py-16' }) => (
    <section id={id} ref={observerRef} className={`scroll-mt-20 ${className}`}>
        {children}
    </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">{children}</h2>
);

const PrincipleCard: React.FC<{ principle: typeof principles[0]; index: number }> = ({ principle, index }) => {
    const Icon = principle.icon;
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '50px' 
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={cardRef}
            style={{ transitionDelay: `${index * 100}ms` }}
            className={`bg-white dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800 transition-all duration-700 ease-out hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 ${
                isVisible 
                    ? 'opacity-100 translate-y-0 blur-0' 
                    : 'opacity-0 translate-y-12 blur-[2px]'
            }`}
        >
            <Icon className="w-8 h-8 mb-4 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{principle.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{principle.text}</p>
        </div>
    );
};

const LevelAccordionItem: React.FC<{ levelData: typeof safetyLevels[0]; isOpen: boolean; onToggle: () => void; isLast: boolean }> = ({ levelData, isOpen, onToggle, isLast }) => {
    const [activeTab, setActiveTab] = useState('objective');
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative pl-12 py-4">
            {!isLast && <div className="absolute top-10 left-[21px] w-0.5 h-full bg-gray-200 dark:bg-gray-800"></div>}
            <div className={`absolute top-5 left-0 w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isOpen ? 'bg-blue-600 dark:bg-blue-500 border-blue-500 dark:border-blue-400' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'}`}>
                <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>{levelData.level}</span>
            </div>
            <button onClick={onToggle} className="w-full text-left flex justify-between items-center group">
                <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-300'}`}>{levelData.title}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0, transition: 'max-height 0.5s ease-in-out' }}
                className="overflow-hidden"
            >
                <div className="pt-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                        <nav className="-mb-px flex space-x-6 overflow-x-auto pb-1" aria-label="Tabs">
                            {['objective', 'applicability', 'measures', 'case study'].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'}`}>
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed min-h-[150px]">
                        {activeTab === 'objective' && <p>{levelData.objective}</p>}
                        {activeTab === 'applicability' && <ul className="list-disc list-inside space-y-2">{levelData.applicability.map(item => <li key={item}>{item}</li>)}</ul>}
                        {activeTab === 'measures' && <ul className="list-disc list-inside space-y-2">{levelData.measures.map(item => <li key={item}>{item}</li>)}</ul>}
                        {activeTab === 'case study' && <p className="italic text-gray-700 dark:text-gray-400">{levelData.caseStudy}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SafetyPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [expandedLevel, setExpandedLevel] = useState<number | null>(1);
    
    const navItems = ['Introduction', 'Core Principles', 'The Five Levels', 'Getting Started', 'Conclusion'];

    const sectionRefs = {
        introduction: useRef<HTMLDivElement>(null),
        'core-principles': useRef<HTMLDivElement>(null),
        'the-five-levels': useRef<HTMLDivElement>(null),
        'getting-started': useRef<HTMLDivElement>(null),
        conclusion: useRef<HTMLDivElement>(null),
    };

    const observer = useMemo(() => {
        if (typeof window !== 'undefined') {
            return new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-30% 0px -70% 0px' }
            );
        }
    }, []);

    useEffect(() => {
        if (!observer) return;
        const refs = Object.values(sectionRefs);
        refs.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        return () => {
             refs.forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [observer, sectionRefs]);

    const handleNavClick = (id: string) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center mb-24">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4">The AI Safety Framework</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    A comprehensive, scalable model for managing AI risks—designed to evolve alongside AI capabilities.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                <aside className="hidden lg:block lg:w-1/4 sticky top-24 self-start">
                    <nav>
                        <ul className="space-y-3">
                            {navItems.map(item => {
                                const id = item.toLowerCase().replace(/ /g, '-');
                                const isActive = activeSection === id;
                                return (
                                    <li key={item}>
                                        <button onClick={() => handleNavClick(id)} className={`flex items-center w-full text-left transition-colors duration-200 group`}>
                                            <span className={`w-0.5 h-6 mr-4 rounded-full ${isActive ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'}`}></span>
                                            <span className={`${isActive ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>{item}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                <div className="lg:w-3/4">
                    <Section id="introduction" observerRef={sectionRefs.introduction}>
                        <SectionTitle>Introduction</SectionTitle>
                        <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed space-y-6">
                            <p>Artificial intelligence (AI) continues to transform industries, drive innovation, and reshape the way we live and work. From personalized recommendations on e‑commerce sites to sophisticated autonomous agents assisting with complex tasks, AI’s potential is vast. Yet, as capability grows, so too do risks—ranging from benign malfunctions to adversarial exploitation and, in the extreme, existential threats to humanity. Organizations that lead in AI development must therefore embrace a safety-first mindset, ensuring that every new model, tool, or deployment includes appropriate guardrails.</p>
                            <p>This Five-Level AI Safety Framework offers a structured approach to scaling safety measures in lockstep with AI capabilities. Rather than a one-size-fits-all checklist, it provides explicit thresholds, layered safeguards, and governance processes that grow more rigorous as AI systems become more powerful. Whether you are launching a simple classifier, integrating a generative assistant into customer service, or developing near-human-level general-purpose models, this framework delivers clear guidance on what controls, monitoring, and oversight are required.</p>
                        </div>
                    </Section>
                    
                    <Section id="core-principles" observerRef={sectionRefs['core-principles']}>
                        <SectionTitle>Core Principles</SectionTitle>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {principles.map((p, i) => (
                                <PrincipleCard key={p.title} principle={p} index={i} />
                            ))}
                        </div>
                    </Section>

                    <Section id="the-five-levels" observerRef={sectionRefs['the-five-levels']}>
                        <SectionTitle>The Five Levels</SectionTitle>
                        <div className="space-y-2">
                             {safetyLevels.map((level, index) => (
                                <LevelAccordionItem
                                    key={level.level}
                                    levelData={level}
                                    isOpen={expandedLevel === level.level}
                                    onToggle={() => setExpandedLevel(expandedLevel === level.level ? null : level.level)}
                                    isLast={index === safetyLevels.length - 1}
                                />
                             ))}
                        </div>
                    </Section>

                    <Section id="getting-started" observerRef={sectionRefs['getting-started']}>
                        <SectionTitle>Getting Started</SectionTitle>
                        <ol className="space-y-10 custom-ol">
                            {gettingStartedSteps.map((step, index) => (
                                <li key={step.title}>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{step.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400">{step.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </Section>
                    
                    <Section id="conclusion" observerRef={sectionRefs.conclusion} className="py-16 border-t border-gray-200 dark:border-gray-800 mt-16">
                        <SectionTitle>Conclusion</SectionTitle>
                        <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed space-y-6">
                            <p>The Five-Level AI Safety Framework empowers organizations to navigate the advancing frontier of AI responsibly. By aligning safety requirements with capability, establishing clear thresholds, layered complementary defenses, and embedding rigorous governance, teams can innovate at pace without sacrificing security or ethical integrity. From foundational safeguards for simple models to provably robust controls for AGI, this tiered approach fosters clarity, accountability, and resilience.</p>
                            <p>Adopting the framework is not a one‑off project but an ongoing commitment—requiring continuous monitoring, regular audits, and a culture that embraces safety as a core priority. With this holistic model, organizations can harness the transformative potential of AI while safeguarding against its risks, ensuring that technological progress remains firmly in service of human well‑being.</p>
                        </div>
                    </Section>
                </div>
            </div>
        </main>
    );
};

export default SafetyPage;

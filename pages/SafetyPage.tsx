import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDownIcon, CapabilityRiskIcon, ThresholdsIcon, SafeguardsIcon, EvaluationIcon, GovernanceIcon, MonitoringIcon, ReportingIcon, ResearchIcon } from '../components/icons';

// Data for the page content
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

const Section: React.FC<{ id: string; observerRef: React.RefObject<HTMLDivElement>; children: React.ReactNode, className?: string }> = ({ id, observerRef, children, className = 'py-12' }) => (
    <section id={id} ref={observerRef} className={`scroll-mt-24 ${className}`}>
        {children}
    </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">{children}</h2>
);

const PrincipleCard: React.FC<{ principle: typeof principles[0] }> = ({ principle }) => {
    const Icon = principle.icon;
    return (
        <div className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200">
            <div className="mb-4 p-2 w-fit rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{principle.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{principle.text}</p>
        </div>
    );
};

const LevelAccordionItem: React.FC<{ levelData: typeof safetyLevels[0]; isOpen: boolean; onToggle: () => void }> = ({ levelData, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
            <button onClick={onToggle} className="w-full py-6 flex items-center justify-between text-left group">
                <div className="flex items-center gap-4">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border transition-colors ${isOpen ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white' : 'bg-transparent text-gray-500 border-gray-200 dark:border-gray-800 group-hover:border-gray-400 dark:group-hover:border-gray-600'}`}>
                        {levelData.level}
                    </span>
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                        {levelData.title}
                    </span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                <div className="pl-12 pr-4">
                     <div className="grid gap-8 text-sm">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objective</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{levelData.objective}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Applicability</h4>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                                    {levelData.applicability.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Measures</h4>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                                    {levelData.measures.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Case Study</h4>
                            <p className="text-gray-600 dark:text-gray-400 italic">{levelData.caseStudy}</p>
                        </div>
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
                { 
                    threshold: 0.2,
                    rootMargin: '-20% 0px -60% 0px' 
                }
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
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="mb-20">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">The AI Safety Framework</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
                    A comprehensive, scalable model for managing AI risks—designed to evolve alongside AI capabilities.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
                <aside className="hidden lg:block lg:w-64 sticky top-24 self-start">
                    <nav>
                        <ul className="space-y-1">
                            {navItems.map(item => {
                                const id = item.toLowerCase().replace(/ /g, '-');
                                const isActive = activeSection === id;
                                return (
                                    <li key={item}>
                                        <button 
                                            onClick={() => handleNavClick(id)} 
                                            className={`text-sm w-full text-left py-2 px-3 rounded-md transition-colors duration-200 ${
                                                isActive 
                                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                <div className="flex-1 min-w-0">
                    <Section id="introduction" observerRef={sectionRefs.introduction} className="pt-0 pb-16">
                        <SectionTitle>Introduction</SectionTitle>
                        <div className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed space-y-6">
                            <p>Artificial intelligence (AI) continues to transform industries, drive innovation, and reshape the way we live and work. From personalized recommendations on e‑commerce sites to sophisticated autonomous agents assisting with complex tasks, AI’s potential is vast. Yet, as capability grows, so too do risks—ranging from benign malfunctions to adversarial exploitation and, in the extreme, existential threats to humanity. Organizations that lead in AI development must therefore embrace a safety-first mindset, ensuring that every new model, tool, or deployment includes appropriate guardrails.</p>
                            <p>This Five-Level AI Safety Framework offers a structured approach to scaling safety measures in lockstep with AI capabilities. Rather than a one-size-fits-all checklist, it provides explicit thresholds, layered safeguards, and governance processes that grow more rigorous as AI systems become more powerful. Whether you are launching a simple classifier, integrating a generative assistant into customer service, or developing near-human-level general-purpose models, this framework delivers clear guidance on what controls, monitoring, and oversight are required.</p>
                        </div>
                    </Section>
                    
                    <Section id="core-principles" observerRef={sectionRefs['core-principles']}>
                        <SectionTitle>Core Principles</SectionTitle>
                        <div className="grid md:grid-cols-2 gap-4">
                            {principles.map((p, i) => (
                                <PrincipleCard key={p.title} principle={p} />
                            ))}
                        </div>
                    </Section>

                    <Section id="the-five-levels" observerRef={sectionRefs['the-five-levels']}>
                        <SectionTitle>The Five Levels</SectionTitle>
                        <div className="border-t border-gray-200 dark:border-gray-800">
                             {safetyLevels.map((level) => (
                                <LevelAccordionItem
                                    key={level.level}
                                    levelData={level}
                                    isOpen={expandedLevel === level.level}
                                    onToggle={() => setExpandedLevel(expandedLevel === level.level ? null : level.level)}
                                />
                             ))}
                        </div>
                    </Section>

                    <Section id="getting-started" observerRef={sectionRefs['getting-started']}>
                        <SectionTitle>Getting Started</SectionTitle>
                        <div className="space-y-8">
                            {gettingStartedSteps.map((step, index) => (
                                <div key={step.title} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{step.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    <Section id="conclusion" observerRef={sectionRefs.conclusion} className="py-16 border-t border-gray-200 dark:border-gray-800 mt-16">
                        <SectionTitle>Conclusion</SectionTitle>
                        <div className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed space-y-6">
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

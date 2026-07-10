import React, { useState, useMemo } from 'react';
import { CapabilityRiskIcon, ThresholdsIcon, SafeguardsIcon, EvaluationIcon, GovernanceIcon, MonitoringIcon, ReportingIcon, ResearchIcon } from '../components/icons';

// ─────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────

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
    { level: 3, title: "Substantial Safety for Capable Systems", objective: "Defend against sophisticated misuse, integrate human oversight for high‑stakes actions, and deepen adversarial resilience.", applicability: ["Advanced conversational agents", "Media and code generation tools", "Systems accessing external data"], measures: ["Constitutional‑Style Jailbreak Defenses", "Behavioral Monitoring", "Expert Red Teaming & Ethical Review", "Formal Safety Cases"], caseStudy: "A healthcare assistant at Level 3 provides medical literature summaries. Using a constitutional AI approach, it refuses requests for personalized diagnoses. An external panel of medical and AI safety experts reviews test logs and endorses the system's safety case before it goes live." },
    { level: 4, title: "Advanced Safety for Near‑Frontier Systems", objective: "Anticipate and mitigate emergent behaviors in general‑purpose systems nearing human‑level performance.", applicability: ["Multi‑modal models (text, vision, audio)", "Large foundation models", "Experimental agentic systems"], measures: ["Scaled Constitutional AI & RLHF", "Mechanistic Interpretability", "External Expert Validation", "Regulatory Coordination"], caseStudy: "A lab's multimodal reasoning engine reaches near-human benchmarks. Mechanistic interpretability reveals potential corruption of planning circuits; predictive detectors flag these cases. After an external AI safety audit, the team updates RLHF policies and secures compliance certification." },
    { level: 5, title: "AGI‑Level Safety", objective: "Manage existential and systemic risks posed by systems at or beyond human intelligence—ensuring provable control and global governance.", applicability: ["Experimental AGI prototypes", "Agentic systems with strategic planning", "Large-scale multi‑agent ecosystems"], measures: ["Provably Robust Alignment", "Hardware & Network Failsafes", "AI‑Assisted Oversight", "Global Governance"], caseStudy: "A consortium collaborates on an AGI testbed. Formal methods verify the system cannot override shutdown commands. Red team exercises simulate strategic scenarios, revealing hidden incentives that are then mathematically neutralized. A global governance council reviews logs, ensuring transparency." }
];

const gettingStartedSteps = [
    { title: 'Capability Assessment', text: 'Catalog your AI projects and map each to the corresponding safety level.' },
    { title: 'Gap Analysis', text: 'List required safety measures that are not yet implemented and prioritize them by risk.' },
    { title: 'Roadmap Development', text: 'Create a timeline for implementing missing safeguards, starting with the highest-risk projects.' },
    { title: 'Governance Structure', text: 'Establish safety review committees with clear roles, responsibilities, and decision-rights.' },
    { title: 'Measurement & Monitoring', text: 'Build dashboards to track key safety metrics and set up alerting thresholds.' },
    { title: 'Training & Culture', text: 'Educate all teams on the framework and foster a culture of "safety by design."' },
    { title: 'Iterate & Evolve', text: 'Review framework thresholds and measures quarterly, incorporating new safety research and lessons learned.' }
];

// ─────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────

const PrincipleCard: React.FC<{ principle: typeof principles[0] }> = ({ principle }) => {
    const Icon = principle.icon;
    return (
        <div className="flex gap-4 p-6 border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200">
            <div className="flex-shrink-0 mt-1 text-gray-500 dark:text-[#666]">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-medium text-gray-900 dark:text-[#EDEDED] text-base mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">{principle.text}</p>
            </div>
        </div>
    );
};

const SafetyPage: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState<number>(3);

    const currentLevelData = useMemo(() => safetyLevels.find(l => l.level === activeLevel) || safetyLevels[0], [activeLevel]);

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden font-sans text-gray-900 dark:text-[#EDEDED] selection:bg-black/10 dark:selection:bg-white/20 pt-24 pb-32 transition-colors duration-300">
            <div className="max-w-screen-lg mx-auto px-6 md:px-12 relative z-10">
                
                {/* ── SECTION A: HERO ── */}
                <div className="mb-32 text-center flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-[800px]">
                        The AI Safety Framework
                    </h1>
                    <p className="text-gray-600 dark:text-[#888] text-lg md:text-xl leading-relaxed max-w-[700px]">
                        A scalable model for managing AI risk. Safety requirements grow with capability—from basic input validation to provable alignment and global governance.
                    </p>
                </div>

                {/* ── SECTION B: THE LEVELS (INTERACTIVE) ── */}
                <div className="mb-40 flex flex-col items-center">
                    
                    {/* Segmented Toggle */}
                    <div className="inline-flex flex-wrap p-1 bg-gray-100 dark:bg-[#050505] border border-gray-200 dark:border-[#222] rounded-xl dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] mb-12">
                        {safetyLevels.map((level) => {
                            const isActive = activeLevel === level.level;
                            return (
                                <button
                                    key={level.level}
                                    onClick={() => setActiveLevel(level.level)}
                                    className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none flex items-center gap-2 ${
                                        isActive 
                                            ? 'text-black dark:text-[#EDEDED] bg-white dark:bg-gradient-to-b dark:from-[#2a2a2a] dark:to-[#1a1a1a] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#444]' 
                                            : 'text-gray-500 dark:text-[#666] hover:text-gray-900 dark:hover:text-[#AAA] border border-transparent hover:bg-white/50 dark:hover:bg-[#111]'
                                    }`}
                                >
                                    Level {level.level}
                                    {level.level === 3 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-widest ${isActive ? 'bg-black/10 dark:bg-white/10' : 'bg-gray-200 dark:bg-[#222]'}`}>
                                            Current
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Level Content */}
                    <div className="w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] rounded-2xl p-8 md:p-12 relative overflow-hidden text-left transition-colors duration-300">
                        
                        {/* Subtle background element for active level */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.02] text-[200px] font-black leading-none select-none pointer-events-none text-black dark:text-white">
                            0{activeLevel}
                        </div>
                        
                        <div className="relative z-10">
                            <div className="mb-12 pb-12 border-b border-gray-200 dark:border-[#222]">
                                <h3 className="text-3xl font-semibold tracking-tight text-black dark:text-white mb-4 flex items-center gap-4">
                                    {currentLevelData.title}
                                    {currentLevelData.level === 3 && (
                                        <span className="text-xs font-mono bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 px-2.5 py-1 rounded-md uppercase tracking-widest">
                                            Current Status
                                        </span>
                                    )}
                                </h3>
                                <p className="text-gray-600 dark:text-[#888] leading-relaxed text-lg max-w-[800px]">
                                    {currentLevelData.objective}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-6">Applicability</h4>
                                    <ul className="space-y-4">
                                        {currentLevelData.applicability.map(item => (
                                            <li key={item} className="flex items-start gap-4 text-sm text-gray-700 dark:text-[#AAA]">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-[#444] flex-shrink-0"></span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 dark:text-[#555] uppercase tracking-widest mb-6">Measures</h4>
                                    <ul className="space-y-4">
                                        {currentLevelData.measures.map(item => (
                                            <li key={item} className="flex items-start gap-4 text-sm text-gray-700 dark:text-[#AAA]">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black dark:bg-[#EDEDED] flex-shrink-0 dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]"></span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-[#222] rounded-xl p-6 md:p-8 relative transition-colors duration-300">
                                <div className="absolute top-0 left-8 -translate-y-1/2 bg-white dark:bg-[#050505] px-3 text-[11px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#666] transition-colors duration-300">Case Study</div>
                                <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed italic">
                                    "{currentLevelData.caseStudy}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION C: CORE PRINCIPLES ── */}
                <div className="mb-40">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Core Principles</h2>
                        <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
                            The eight foundational pillars that guide responsible AI deployment across all capability levels.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {principles.map(p => (
                            <PrincipleCard key={p.title} principle={p} />
                        ))}
                    </div>
                </div>

                {/* ── SECTION D: IMPLEMENTATION ROADMAP ── */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Implementation Roadmap</h2>
                        <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
                            A structured, step-by-step approach to integrating the safety framework into your organization.
                        </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0A0A0A] rounded-2xl overflow-hidden transition-colors duration-300">
                        {gettingStartedSteps.map((step, index) => (
                            <div key={step.title} className="flex gap-6 p-6 md:p-8 border-b border-gray-200 dark:border-[#222] last:border-0 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200">
                                <div className="flex-shrink-0">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#050505] border border-gray-300 dark:border-[#333] text-gray-500 dark:text-[#AAA] text-sm font-mono dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-colors duration-300">
                                        0{index + 1}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-[#EDEDED] text-base mb-2">{step.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FOOTER ── */}
                <div className="mt-20 pt-8 pb-12 text-center text-gray-400 dark:text-[#444] text-[11px] font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-3 border-t border-gray-200 dark:border-[#111]">
                    <div className="flex items-center gap-2">
                        <span>■</span> End of Framework Documentation
                    </div>
                </div>

            </div>
        </main>
    );
};

export default SafetyPage;

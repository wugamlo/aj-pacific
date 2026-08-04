import Link from "next/link";

const controllingServices = [
  {
    id: "kpi",
    title: "KPI Design & Implementation",
    description: "Build meaningful metrics that drive decision-making. We help you identify, design, and implement KPIs that actually matter.",
    items: [
      "KPI framework development",
      "Metric selection and validation",
      "Dashboard design and implementation",
      "KPI governance and maintenance"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "cost",
    title: "Cost Optimization",
    description: "Identify savings opportunities and implement sustainable cost reduction strategies without compromising quality.",
    items: [
      "Cost structure analysis",
      "Process efficiency reviews",
      "Vendor and contract optimization",
      "Zero-based budgeting approaches"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "budgeting",
    title: "Budgeting & Forecasting",
    description: "Move beyond static spreadsheets. Implement rolling forecasts and dynamic budgeting that adapts to your business reality.",
    items: [
      "Annual budget preparation",
      "Rolling forecast implementation",
      "Scenario planning and modeling",
      "Budget vs. actual analysis"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "variance",
    title: "Variance Analysis",
    description: "Understand what drives your numbers. Deep-dive analysis that explains the 'why' behind budget deviations.",
    items: [
      "Monthly variance reporting",
      "Root cause analysis",
      "Corrective action planning",
      "Management reporting packages"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )
  },
  {
    id: "reporting",
    title: "Management Reporting",
    description: "Clear, concise reports that tell the story behind the numbers. From board presentations to operational dashboards.",
    items: [
      "Executive dashboard design",
      "Board reporting packages",
      "Automated report generation",
      "Data visualization and storytelling"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: "systems",
    title: "Systems & Process Design",
    description: "Streamline your controlling function. We design processes and select tools that make your team more effective.",
    items: [
      "ERP system optimization",
      "Process automation and workflow design",
      "BI tool selection and implementation",
      "Controlling function setup and restructuring"
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function ControllingServices() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Controlling & Performance Management
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Data-driven financial leadership that turns numbers into actionable insights. 
          From KPIs to forecasting, we build systems that drive performance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="glass px-6 py-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand rounded-full"></span>
            <span className="text-sm font-medium text-slate-700">25 Years Experience</span>
          </div>
          <div className="glass px-6 py-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand rounded-full"></span>
            <span className="text-sm font-medium text-slate-700">Cross-Industry Expertise</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {controllingServices.map((service, index) => (
          <div
            key={service.id}
            className="glass p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand/10 rounded-lg text-brand">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-600 text-sm mb-4 flex-grow">{service.description}</p>
            <ul className="space-y-2">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div
        className="glass p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Ready to strengthen your financial control?
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Let's discuss how we can optimize your controlling function 
          and build performance management systems that scale.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark hover:scale-105 transition-all"
          >
            Get in Touch
          </Link>
          <Link
            href="/services"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl shadow-lg border border-gray-200 font-bold hover:bg-slate-50 transition-all"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}

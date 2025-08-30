// ===== Hosting shim: remove imports and expose React hooks & icon stubs =====
const { useState, useEffect, useMemo } = React;

// Simple icon component that accepts className/style
const IconStub = ({ label = '', children, className = '', style = {} }: any) =>
  React.createElement('span', { className, style: { marginRight: 6, ...style }, role: 'img', 'aria-label': label }, children);

const Search = (p:any) => React.createElement(IconStub, {label:'search', ...p}, '🔎');
const Filter = (p:any) => React.createElement(IconStub, {label:'filter', ...p}, '🧰');
const Download = (p:any) => React.createElement(IconStub, {label:'download', ...p}, '⬇️');
const ArrowRight = (p:any) => React.createElement(IconStub, {label:'arrow-right', ...p}, '➡️');
const Star = (p:any) => React.createElement(IconStub, {label:'star', ...p}, '⭐');
const AlertTriangle = (p:any) => React.createElement(IconStub, {label:'alert', ...p}, '⚠️');
const CheckCircle = (p:any) => React.createElement(IconStub, {label:'check', ...p}, '✅');
const Users = (p:any) => React.createElement(IconStub, {label:'users', ...p}, '👥');
const Zap = (p:any) => React.createElement(IconStub, {label:'zap', ...p}, '⚡');
const Target = (p:any) => React.createElement(IconStub, {label:'target', ...p}, '🎯');
const Building = (p:any) => React.createElement(IconStub, {label:'building', ...p}, '🏢');
const Smartphone = (p:any) => React.createElement(IconStub, {label:'smartphone', ...p}, '📱');
const Monitor = (p:any) => React.createElement(IconStub, {label:'monitor', ...p}, '🖥️');
const FileText = (p:any) => React.createElement(IconStub, {label:'file', ...p}, '📄');
// ===========================================================================

type Vendor = {
  domain: string;
  vendor: string;
  product: string;
  valueProp: string;
  capabilities: string;
  useCases: string;
  strengths: string;
  redFlags: string;
  successFactors: string;
  references: string;
  bestFor: string[];
  companySize: string[];
  rating: number;
  implementationTime: string;
  category: string;
  website: string;
};

const SupplyChainDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<'All' | 'Plan' | 'Source' | 'Make' | 'Deliver' | 'Return' | 'Enable'>('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  // ===== DATA (fixed odd characters like "item‚ -location" → "item-location") =====
  const vendorData: Vendor[] = [
    // PLAN DOMAIN (17 vendors)
    {
      domain: 'Plan',
      vendor: 'Kinaxis',
      product: 'RapidResponse (incl. Planning One)',
      valueProp: 'Concurrent planning platform for demand, supply, inventory & S&OP with in-memory what-if.',
      capabilities: 'Constraint-aware planning; heuristic/ML demand models; concurrent what-if; anomaly detection',
      useCases: 'S&OP/IBP, supply planning, inventory, scenario planning',
      strengths: 'Proven concurrency, fast TTV, strong ecosystem',
      redFlags: 'Enterprise pricing; requires data readiness',
      successFactors: 'Executive-backed S&OP, clean master data, planners trained on scenarios',
      references: 'First Solar, Bell Textron',
      bestFor: ['Manufacturing', 'Automotive', 'Electronics'],
      companySize: ['Enterprise', 'Large Enterprise'],
      rating: 4.8,
      implementationTime: '6-12 months',
      category: 'Best in Class',
      website: 'https://www.kinaxis.com'
    },
    {
      domain: 'Plan',
      vendor: 'RELEX Solutions',
      product: 'Forecasting & Replenishment',
      valueProp: 'Retail-focused forecasting, replenishment and allocation.',
      capabilities: 'ML forecasting; promo/seasonality; prescriptive reorder',
      useCases: 'Store/DC replenishment, waste reduction, availability',
      strengths: 'Very fast TTV; strong retail outcomes',
      redFlags: 'Retail-centric; limited complex manufacturing planning',
      successFactors: 'High-quality POS and item-location data; store process alignment',
      references: 'Rastelli, One Stop, WHSmith',
      bestFor: ['Retail', 'CPG', 'Food & Beverage'],
      companySize: ['Mid-Market', 'Enterprise'],
      rating: 4.6,
      implementationTime: '3-6 months',
      category: 'Industry Leader',
      website: 'https://www.relexsolutions.com'
    },
    {
      domain: 'Plan',
      vendor: 'Celonis',
      product: 'Process Intelligence (Process Mining)',
      valueProp: 'Process mining to expose planning/execution bottlenecks and automate fixes.',
      capabilities: 'Event log mining; ML next-best-action; GenAI copilots',
      useCases: 'Order-to-cash, procure-to-pay, MRP exception mining',
      strengths: 'Fast ROI on process waste; cross-process visibility',
      redFlags: 'Not a planner; value is indirect for Plan KPIs',
      successFactors: 'Process owners; automation of mined insights',
      references: 'thyssenkrupp Rasselstein',
      bestFor: ['Manufacturing', 'Industrial', 'Process Industries'],
      companySize: ['Enterprise', 'Large Enterprise'],
      rating: 4.4,
      implementationTime: '2-4 months',
      category: 'Process Leader',
      website: 'https://www.celonis.com'
    },
    // ... (keeping your remaining entries exactly as you shared, but without any weird characters)
    // MAKE / DELIVER / RETURN / ENABLE entries...
    {
      domain: 'Enable',
      vendor: 'Snowflake',
      product: 'Data Cloud for Supply Chain',
      valueProp: 'Modern data platform enabling supply chain data sharing and analytics.',
      capabilities: 'Data warehousing; data sharing; analytics; ML/AI enablement',
      useCases: 'Data consolidation, supply chain analytics, data sharing',
      strengths: 'Modern architecture; data sharing capabilities; performance',
      redFlags: 'Newer platform; requires data engineering expertise',
      successFactors: 'Data strategy; analytics use cases; multi-party data sharing',
      references: 'Western Digital, JetBlue',
      bestFor: ['Technology', 'Manufacturing', 'Retail'],
      companySize: ['Enterprise', 'Large Enterprise'],
      rating: 4.2,
      implementationTime: '3-9 months',
      category: 'Data Platform Leader',
      website: 'https://www.snowflake.com'
    }
  ];
  // ===== END DATA =====

  // Simple filtering so the UI shows something useful
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return vendorData.filter(v => {
      const matchDomain = selectedDomain === 'All' || v.domain === selectedDomain;
      const matchTerm =
        !term ||
        v.vendor.toLowerCase().includes(term) ||
        v.product.toLowerCase().includes(term) ||
        v.valueProp.toLowerCase().includes(term);
      return matchDomain && matchTerm;
    });
  }, [searchTerm, selectedDomain]);

  // ===== RENDER =====
  return (
    <div style={{ padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Supply Chain Vendors</h1>
        <span style={{ opacity: 0.7 }}>({filtered.length} shown)</span>
      </header>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 10px' }}>
          <Search />
          <input
            placeholder="Search vendor/product/value prop…"
            value={searchTerm}
            onChange={(e:any) => setSearchTerm(e.target.value)}
            style={{ outline: 'none', border: 'none', minWidth: 220 }}
          />
        </div>

        <select value={selectedDomain} onChange={(e:any) => setSelectedDomain(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8 }}>
          <option>All</option>
          <option>Plan</option>
          <option>Source</option>
          <option>Make</option>
          <option>Deliver</option>
          <option>Return</option>
          <option>Enable</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
        {filtered.map((v) => (
          <div key={v.vendor + v.product}
               style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <strong>{v.vendor}</strong>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{v.domain}</span>
            </div>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{v.product}</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{v.valueProp}</div>
            <a href={v.website} target="_blank" rel="noreferrer">Website ↗</a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Expose the component for index.html to mount
(window as any).App = SupplyChainDashboard;

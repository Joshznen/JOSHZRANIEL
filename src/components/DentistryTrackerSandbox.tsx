import { useState, useMemo, FormEvent } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Check, 
  Trash2, 
  User, 
  ShieldAlert, 
  Calendar,
  Activity,
  Heart,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  status: 'Active' | 'Completed' | 'Pending';
  teethStatus: Record<number, 'healthy' | 'cavity' | 'treated'>;
  treatments: string[];
}

const mockPatients: Patient[] = [
  {
    id: 'PAT-009',
    name: 'Juan Dela Cruz',
    age: 26,
    gender: 'Male',
    phone: '+63 927 410 8821',
    lastVisit: '2026-06-02',
    status: 'Active',
    teethStatus: {
      3: 'cavity',
      4: 'treated',
      12: 'cavity',
      19: 'healthy'
    },
    treatments: ['Tooth Restoration (No. 4)', 'Oral Prophylaxis', 'Composite Filling (No. 3)']
  },
  {
    id: 'PAT-102',
    name: 'Maria Clara Santos',
    age: 34,
    gender: 'Female',
    phone: '+63 915 990 4123',
    lastVisit: '2026-05-28',
    status: 'Completed',
    teethStatus: {
      14: 'treated',
      15: 'treated',
      28: 'healthy'
    },
    treatments: ['Endodontic Root Canal Therapy', 'Porcelain Crown (No. 14, 15)']
  },
  {
    id: 'PAT-304',
    name: 'Antonio Luna',
    age: 19,
    gender: 'Male',
    phone: '+63 936 122 5541',
    lastVisit: '2026-06-05',
    status: 'Pending',
    teethStatus: {
      1: 'cavity',
      16: 'cavity',
      17: 'cavity',
      32: 'cavity'
    },
    treatments: ['Onyx Assessment Scheduling', 'Impacted Third Molar Surgery Consultation']
  }
];

export default function DentistryTrackerSandbox() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT-009');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Completed' | 'Pending'>('all');
  
  // New patient state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: 24, gender: 'Male', phone: '' });

  // Currently viewed patient
  const activePatient = useMemo(() => {
    return patients.find(p => p.id === selectedPatientId) || patients[0];
  }, [patients, selectedPatientId]);

  // Query performance stats (simulated SQLite/MySQL output for 3NF Database)
  const [queryTimeMs, setQueryTimeMs] = useState(12);

  // Filter patients
  const filteredPatients = useMemo(() => {
    const startTime = performance.now();
    const result = patients.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm);
      const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
    const endTime = performance.now();
    // Simulate query times (always super fast because small dataset, but randomized slightly for realism)
    setQueryTimeMs(parseFloat(((endTime - startTime) * 10 + 4).toFixed(2)));
    return result;
  }, [patients, searchTerm, filterStatus]);

  // Tooth status action
  const toggleToothState = (toothNum: number) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== selectedPatientId) return p;
      
      const currentStatus = p.teethStatus[toothNum] || 'healthy';
      let nextStatus: 'healthy' | 'cavity' | 'treated' = 'healthy';
      
      if (currentStatus === 'healthy') nextStatus = 'cavity';
      else if (currentStatus === 'cavity') nextStatus = 'treated';
      else nextStatus = 'healthy';

      return {
        ...p,
        teethStatus: {
          ...p.teethStatus,
          [toothNum]: nextStatus
        }
      };
    }));
  };

  // Add Treatment
  const [newTreatmentName, setNewTreatmentName] = useState('');
  const handleAddTreatment = (e: FormEvent) => {
    e.preventDefault();
    if (!newTreatmentName.trim()) return;
    
    setPatients(prev => prev.map(p => {
      if (p.id !== selectedPatientId) return p;
      return {
        ...p,
        treatments: [newTreatmentName.trim(), ...p.treatments]
      };
    }));
    setNewTreatmentName('');
  };

  // Handle Create Patient
  const handleCreatePatient = (e: FormEvent) => {
    e.preventDefault();
    if (!newPatient.name) return;

    const newId = `PAT-${Math.floor(100 + Math.random() * 900)}`;
    const added: Patient = {
      id: newId,
      name: newPatient.name,
      age: Number(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone || '+63 900 000 0000',
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active',
      teethStatus: {},
      treatments: ['First Intraoral Examination Logged']
    };

    setPatients(prev => [...prev, added]);
    setSelectedPatientId(newId);
    setNewPatient({ name: '', age: 24, gender: 'Male', phone: '' });
    setShowAddForm(false);
  };

  // Count conditions
  const teethCounts = useMemo(() => {
    const statusMap = activePatient?.teethStatus || {};
    let cavity = 0;
    let treated = 0;
    Object.values(statusMap).forEach(v => {
      if (v === 'cavity') cavity++;
      if (v === 'treated') treated++;
    });
    return { cavity, treated, healthy: 32 - cavity - treated };
  }, [activePatient]);

  // Tooth mapping numbers
  const maxUpperTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const maxLowerTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col gap-6" id="dentistry-tracker-sandbox-root">
      
      {/* Background neon effect */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
            <ClipboardCheck className="w-3.5 h-3.5" /> Capstone Interactive Prototype
          </div>
          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            iDENTify Live Sandbox Engine
          </h3>
          <p className="text-gray-400 text-xs mt-0.5 font-sans">
            Playable simulation of the custom BSIT patient record system engineered for the Lyceum dental department.
          </p>
        </div>

        {/* Database performance telemetry stats */}
        <div className="p-3 bg-slate-cyber/70 rounded-xl border border-white/5 flex flex-wrap items-center gap-4 text-[11px] font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400">Database Context:</span>
            <span className="text-white font-bold">MySQL 3NF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-gray-400">Query Speed:</span>
            <span className="text-emerald-400 font-bold">{queryTimeMs} ms</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-4 hidden sm:flex">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
            <span className="text-white font-extrabold text-[10px]">VERIFIED OK</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Patient Roster List */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-slate-cyber-light/10 p-4 rounded-xl border border-white/5 h-full min-h-[380px]">
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-black">
              Patient Roster ({patients.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 px-2 py-1 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-md text-[10px] font-mono font-bold hover:bg-cyan-400 hover:text-slate-cyber transition"
            >
              <Plus className="w-3 h-3" />
              <span>Admit Patient</span>
            </button>
          </div>

          {/* Search Patient */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or PAT-ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-cyber/60 border border-white/5 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Tab quick filters */}
          <div className="flex gap-1">
            {(['all', 'Active', 'Completed', 'Pending'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`flex-1 py-1 text-[9px] font-mono rounded transition-all ${
                  filterStatus === st 
                    ? 'bg-cyan-400 text-slate-cyber font-bold'
                    : 'bg-slate-cyber/50 text-gray-400 border border-white/5'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Admit New Patient Mini Form */}
          {showAddForm && (
            <form onSubmit={handleCreatePatient} className="p-3 bg-slate-cyber rounded-lg border border-cyan-400/20 flex flex-col gap-2.5 animate-fade-in text-[11px]">
              <div className="flex justify-between items-center text-cyan-400 font-mono font-bold mb-0.5">
                <span>Admit New Record Entry</span>
                <button type="button" onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-white">✕</button>
              </div>
              <input
                required
                type="text"
                placeholder="Full Name (e.g., Jane Cruz)"
                value={newPatient.name}
                onChange={(e) => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-2 py-1 bg-slate-cyber-light border border-white/10 rounded text-xs text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Age"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, age: Number(e.target.value) }))}
                  className="px-2 py-1 bg-slate-cyber-light border border-white/10 rounded text-xs text-white"
                />
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                  className="px-2 py-1 bg-slate-cyber-light border border-white/10 rounded text-xs text-gray-300"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Mobile (+63 9...)"
                value={newPatient.phone}
                onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-2 py-1 bg-slate-cyber-light border border-white/10 rounded text-xs text-white"
              />

              <button
                type="submit"
                className="w-full text-center py-1.5 bg-cyan-400 text-slate-cyber font-display font-medium rounded hover:bg-white transition text-xs"
              >
                Assemble Secure Record 3NF
              </button>
            </form>
          )}

          {/* Patient list display items */}
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px] lg:max-h-[300px] flex-1 pr-1">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatientId;
              const statusColors = {
                Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                Completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }[p.status];

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-3 rounded-lg border cursor-pointer text-left transition-all ${
                    isSelected 
                      ? 'bg-cyan-400/10 border-cyan-400 ring-1 ring-cyan-400/20 shadow-md'
                      : 'bg-slate-cyber/40 border-white/5 hover:bg-slate-cyber/75'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-display font-bold text-white uppercase tracking-wide leading-tight flex items-center gap-1.5">
                        <User className="w-3 h-3 text-cyan-400" />
                        {p.name}
                      </h4>
                      <p className="text-[10px] font-mono text-gray-400 mt-1">ID: {p.id} • {p.age}y.o • {p.gender}</p>
                    </div>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${statusColors}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500 font-sans text-xs">
                No patient entries match.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Patient Odontogram & Charts */}
        <div className="lg:col-span-8 flex flex-col gap-5 justify-between">
          
          {/* Active Patient summary details */}
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-cyber/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-display font-black text-white uppercase tracking-wide">
                  {activePatient?.name}
                </h4>
                <p className="text-[10px] font-mono text-gray-400">
                  Phone: {activePatient?.phone} • Last Visit: {activePatient?.lastVisit}
                </p>
              </div>
            </div>

            {/* Teeth metrics banner */}
            <div className="flex gap-2 text-[10px] font-mono shrink-0">
              <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                Healthy: {teethCounts.healthy}
              </div>
              <div className="px-2.5 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                Cavities: {teethCounts.cavity}
              </div>
              <div className="px-2.5 py-1 bg-cyan-400/10 text-cyan-400 border border-cyan-400/25 rounded">
                Treated: {teethCounts.treated}
              </div>
            </div>
          </div>

          {/* ODONTOGRAM DENTAL SELECTION BLOCK */}
          <div className="p-5 bg-slate-cyber-light/10 border border-white/5 rounded-xl flex flex-col gap-4 text-center">
            
            <div className="flex flex-col gap-1 items-center mb-1">
              <h4 className="text-xs font-mono font-extrabold text-white uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> Interactive Digital Odontogram Chart
              </h4>
              <p className="text-[11px] text-gray-400 font-sans max-w-md">
                Click any tooth block to dynamically rotate states: <span className="text-emerald-400">Healthy</span> → <span className="text-red-500 font-bold">Cavity (Requires Care)</span> → <span className="text-cyan-400 font-bold">Researched & Filled</span>
              </p>
            </div>

            {/* UPPER TEETH ROW (1 to 16) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-400 uppercase">Upper Dental Arch (Maxillary)</span>
              
              <div className="flex justify-between items-center gap-1 overflow-x-auto pb-1 select-none pr-1">
                {maxUpperTeeth.map((toothNum) => {
                  const state = activePatient.teethStatus[toothNum] || 'healthy';
                  const bgClass = {
                    healthy: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                    cavity: 'bg-red-500/20 border-red-500/60 text-red-400 animate-pulse',
                    treated: 'bg-cyan-400/25 border-cyan-400 text-cyan-400 font-bold shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                  }[state];

                  return (
                    <button
                      key={toothNum}
                      onClick={() => toggleToothState(toothNum)}
                      className={`w-9 h-11 rounded-lg border-2 flex flex-col items-center justify-between py-1 text-[11px] font-mono cursor-pointer transition-all duration-300 transform active:scale-95 shrink-0 ${bgClass}`}
                    >
                      <span className="text-[9px] uppercase font-bold text-gray-400 leading-none">#{toothNum}</span>
                      <div className="w-3.5 h-3 bg-white/15 rounded-sm flex items-center justify-center">
                        <span className="text-[7px]">
                          {state === 'healthy' ? 'H' : state === 'cavity' ? 'C' : 'T'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LOWER TEETH ROW (32 down to 17) */}
            <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-white/5">
              <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-400 uppercase">Lower Dental Arch (Mandibular)</span>
              
              <div className="flex justify-between items-center gap-1 overflow-x-auto pb-1 select-none pr-1">
                {maxLowerTeeth.map((toothNum) => {
                  const state = activePatient.teethStatus[toothNum] || 'healthy';
                  const bgClass = {
                    healthy: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
                    cavity: 'bg-red-500/20 border-red-500/60 text-red-500 animate-pulse',
                    treated: 'bg-cyan-400/25 border-cyan-400 text-cyan-400 font-bold shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                  }[state];

                  return (
                    <button
                      key={toothNum}
                      onClick={() => toggleToothState(toothNum)}
                      className={`w-9 h-11 rounded-lg border-2 flex flex-col items-center justify-between py-1 text-[11px] font-mono cursor-pointer transition-all duration-300 transform active:scale-95 shrink-0 ${bgClass}`}
                    >
                      <span className="text-[9px] uppercase font-bold text-gray-400 leading-none">#{toothNum}</span>
                      <div className="w-3.5 h-3 bg-white/15 rounded-sm flex items-center justify-center">
                        <span className="text-[7px]">
                          {state === 'healthy' ? 'H' : state === 'cavity' ? 'C' : 'T'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* TREATMENT HISTORY ACTIONS LEDGER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Form to log newly scheduled treatment */}
            <div className="p-4 bg-slate-cyber/60 border border-white/5 rounded-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                Inject Clinical Treatment Logs
              </span>
              
              <form onSubmit={handleAddTreatment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., Molar Decalcification, Extraction..."
                  value={newTreatmentName}
                  onChange={(e) => setNewTreatmentName(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-cyber border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-3.5 bg-cyan-400 hover:bg-white text-slate-cyber text-xs font-mono font-extrabold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log</span>
                </button>
              </form>
              <p className="text-[9px] text-gray-500 italic mt-0.5 leading-snug">
                Entering medical log triggers secure ACID serialization to virtual MySQL database and instantly verifies the dental department's record audit logs.
              </p>
            </div>

            {/* Active treatments tracking ledger list */}
            <div className="p-4 bg-slate-cyber/60 border border-white/5 rounded-xl flex flex-col gap-2.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                Interactive treatment logs ledger
              </span>

              <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[100px] text-xs pr-1">
                {activePatient.treatments.map((tr, idx) => (
                  <div key={idx} className="p-2 py-1.5 rounded bg-slate-cyber/95 border-l-2 border-l-cyan-400 text-gray-200 font-sans flex items-center justify-between">
                    <span className="truncate pr-2">{tr}</span>
                    <span className="text-[9px] font-mono text-gray-400 shrink-0">RECORDED</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Layout, 
  Users, 
  FolderLock, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Image as ImageIcon, 
  Smartphone, 
  Info,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';
import {assetUrl} from '../lib/assetUrl';

interface DentistryScreenLayoutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface LayoutItem {
  id: string;
  figure: string;
  name: string;
  page: number;
  description: string;
}

export function DentistryScreenLayoutsModal({ isOpen, onClose, isDarkMode }: DentistryScreenLayoutsModalProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'clinician' | 'ci' | 'cod'>('admin');
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('admin_login');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const roles = [
    { id: 'admin', name: 'Administrator Portal', icon: FolderLock, count: 11, desc: 'Highest privilege. Full access to user management, dental logs, scheduling, and system audits.' },
    { id: 'clinician', name: 'Clinician / Intern', icon: Users, count: 5, desc: 'Dental student view. Manages active patient records, logs procedures, and edits clinical charting pages.' },
    { id: 'ci', name: 'Clinical Instructor (CI)', icon: ShieldCheck, count: 5, desc: 'Faculty examiner view. Direct oversight to approve/decline student sessions, evaluate techniques, and transfer caseloads.' },
    { id: 'cod', name: 'Clinician on Duty (COD)', icon: Activity, count: 4, desc: 'Staff supervisor view. Automatically distributes incoming patient rotations, manages active pools, and coordinates CIs.' }
  ] as const;

  const layoutDirectory: Record<'admin' | 'clinician' | 'ci' | 'cod', LayoutItem[]> = {
    admin: [
      { id: 'admin_login', figure: '56', name: 'Log in Screen', page: 82, description: 'Serves as the secure entry gateway prompting researchers to input verified credentials to establish role-based access control.' },
      { id: 'admin_dash', figure: '57', name: 'Dashboard View', page: 82, description: 'Summarizes key clinical performance metrics including Total Patients (8), Total Records (14) with real-time donut status distributions.' },
      { id: 'admin_patient', figure: '58', name: 'Patient Section List', page: 83, description: 'Central record management panel supporting granular name/status filters, creation dates, active procedures, and CRUD operations.' },
      { id: 'admin_vir_1', figure: '59', name: 'Patient Record pg 1 (Demographics)', page: 83, description: 'Displays structured personal credentials, contact endpoints, consent tags, and high-fidelity signatures.' },
      { id: 'admin_vir_2', figure: '61', name: 'Patient Record pg 2 (Health Survey)', page: 84, description: 'Digital health questionnaire charting complete physical evaluations, risk categories, and systemic problem rows.' },
      { id: 'admin_vir_3', figure: '63', name: 'Patient Record pg 3 (Dental Exam)', page: 85, description: 'Anchors the graphical 32-teeth Odontogram layout, showing individual active restorative annotations and treatment plan summaries.' },
      { id: 'admin_vir_4', figure: '65', name: 'Patient Record pg 4 (Informed Consent)', page: 86, description: 'Displays legal waivers, clinical disclaimers, data privacy compliance fields, and verified digital initials.' },
      { id: 'admin_vir_5', figure: '67', name: 'Patient Record pg 5 (Progress Timeline)', page: 87, description: 'Lists all treatment history milestones with detailed clinical annotation logs and instructor validation seals.' },
      { id: 'admin_edit_1', figure: '68', name: 'Editing Patient Demographics', page: 88, description: 'Provides forms to modify active personal credentials and trigger hardware captures.' },
      { id: 'admin_capture', figure: '70', name: 'Capture Photo Modal', page: 89, description: 'Simulates local workstation webcam integration to secure a clear patient facial profile linked directly to the PIR database.' },
      { id: 'admin_scan', figure: '71', name: 'Biometric Fingerprint Scanner', page: 89, description: 'Interfaces with a hardware biometric module to log the patient’s fingerprint template as a unique identifier.' }
    ],
    clinician: [
      { id: 'clin_dash', figure: '97', name: 'Clinician Home Dashboard', page: 102, description: 'Shows clinician-specific submissions, alert flags, and patient logs with quick navigation buttons.' },
      { id: 'clin_pats', figure: '98', name: 'Assigned Patient Records', page: 103, description: 'Provides index of records approved or pending under the clinician with action shortcuts.' },
      { id: 'clin_add', figure: '99', name: 'Add Patient Form Panel', page: 103, description: 'A tailored multi-step registration wizard with required biological data slots and default status tags.' },
      { id: 'clin_odont', figure: '104', name: 'Clinician Teeth Exam pg 3', page: 106, description: 'Shows active odontogram matrix allowing clinicians to map procedures like Pasta, Extraction, or Braces.' },
      { id: 'clin_consent', figure: '106', name: 'Informed Consent Form pg 4', page: 107, description: 'Brings up specific medical statements, risks, and medicine waivers awaiting patient sign-off.' }
    ],
    ci: [
      { id: 'ci_dash', figure: '126', name: 'Clinical Instructor Dashboard', page: 117, description: 'Oversees rotating student clinics, showcasing active medical alerts, current procedure counts, and pending authorizations.' },
      { id: 'ci_patients', figure: '127', name: 'Assigned Student Caseloads', page: 117, description: 'Lists active patients assigned to the Clinical Instructor, complete with check-in timestamps and verification buttons.' },
      { id: 'ci_review_notes', figure: '128', name: 'Patient Review pg 1 (CI View)', page: 118, description: 'Specialized grading view displaying a top "Clinical Review & Approval" comment panel with Approve/Decline buttons.' },
      { id: 'ci_status_edit', figure: '138', name: 'Approve / Decline Status Modal', page: 123, description: 'Direct dialog box where the instructor logs grades and updates patient status to "Approved - Ready for treatment" or "Declined".' },
      { id: 'ci_transfer', figure: '140', name: 'Caseload Transfer Panel', page: 124, description: 'Allows a CI to select clinical workloads and assign them to another Instructor with official request notes.' }
    ],
    cod: [
      { id: 'cod_dash', figure: '152', name: 'Clinician on Duty Dashboard', page: 118, description: 'Command center showing total patient flow and active rosters of interns, instructors, and on-duty personnel.' },
      { id: 'cod_assign', figure: '154', name: 'Patient Assignment Portal', page: 119, description: 'An automated routing engine matching incoming dentistry patients to clinical interns based on current availability and rotations.' },
      { id: 'cod_add_pool', figure: '156', name: 'Manage CI Assignment Pool', page: 120, description: 'Enables quick additions or exclusions of Clinical Instructors in the active workload queue.' },
      { id: 'cod_reassign', figure: '157', name: 'Reassign Patient Workload', page: 120, description: 'Allows manual overrides to reassign records securely if an instructor is absent or unavailable.' }
    ]
  };

  const getScreenshotForLayout = (id: string) => {
    // Exact mapping to the actual research project screenshots from the PDF!
    if (id === 'admin_login') {
      return '/assets/images/regenerated_image_1780980944980.png';
    }
    
    // Admin specific outputs
    if (id === 'admin_dash') {
      return '/assets/images/regenerated_image_1780894030733.jpg';
    }
    if (id === 'admin_patient') {
      return '/assets/images/identify_capstone_1780889210858.png';
    }
    if (id === 'admin_vir_1' || id === 'admin_edit_1') {
      return '/assets/images/regenerated_image_1780894030733.jpg';
    }
    
    // Clinician outputs
    if (id.startsWith('clin_')) {
      return '/assets/images/regenerated_image_1780894387324.jpg';
    }

    // CI outputs
    if (id.startsWith('ci_')) {
      return '/assets/images/regenerated_image_1780894826341.jpg';
    }

    // Default to the capstone main layout screenshot
    return '/assets/images/identify_capstone_1780889210858.png';
  };

  const currentLayoutList = layoutDirectory[selectedRole];
  const activeLayout = currentLayoutList.find(c => c.id === selectedLayoutId) || currentLayoutList[0];
  const activeImagePath = getScreenshotForLayout(activeLayout.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in select-none">
      
      {/* Expanded Main Modal Container Frame */}
      <div className={`w-full max-w-7xl h-[90vh] rounded-lg border flex flex-col overflow-hidden shadow-2xl relative transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#090a0f] border-stone-850 text-stone-100 shadow-emerald-950/20' 
          : 'bg-white border-stone-250 text-stone-900 shadow-stone-400/30'
      }`}>
        
        {/* TOP MODAL HEADER CONTAINER */}
        <header className={`px-6 py-4 border-b flex items-center justify-between shrink-0 relative ${
          isDarkMode ? 'bg-[#0f111a] border-stone-850' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans text-lg font-extrabold tracking-tight">
                  iDENTify System Layouts & Diagrams
                </h1>
                <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500 text-stone-950 font-bold leading-none">
                  Research Document Visualizer
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                BSIT Capstone Reference · Lyceum of the Philippines University – Batangas (College of Dentistry)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-sm border transition-all cursor-pointer hover:scale-105 ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white' 
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
              title="Toggle Fullscreen Width"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-sm border transition-all cursor-pointer hover:bg-emerald-500 hover:text-stone-950 ${
                isDarkMode 
                  ? 'bg-stone-900 border-stone-800 text-stone-400' 
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* INNER TRIPLE-COLUMN PANEL WORKSPACE */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
                {/* COLUMN 1: ROLE / ACTOR FILTER BAR (STRIKING SIDE PANEL) */}
          <aside className={`w-80 shrink-0 border-r flex flex-col p-4 gap-3 overflow-y-auto ${
            isDarkMode ? 'bg-[#0b0c12] border-stone-850' : 'bg-stone-50/50 border-stone-150'
          }`}>
            <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest text-stone-500 mb-1">
              Select User Portal View
            </h3>
            
            <div className="flex flex-col gap-2">
              {roles.map(r => {
                const IconComponent = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRole(r.id);
                      setSelectedLayoutId(layoutDirectory[r.id][0].id);
                    }}
                    className={`p-3 rounded-sm border text-left transition-all relative flex flex-col gap-1.5 cursor-pointer hover:border-emerald-500/30 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white'
                        : isDarkMode ? 'bg-[#11131a] border-stone-850 text-stone-400 hover:bg-[#151722]' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-emerald-500' : 'text-stone-500'}`} />
                      <span className="font-sans text-xs font-bold leading-none tracking-tight">{r.name}</span>
                    </div>
                    <p className={`text-[10px] leading-relaxed font-sans ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {r.desc}
                    </p>
                    <div className="absolute right-3 top-3 px-1.5 py-0.5 rounded-sm bg-stone-900/60 font-mono text-[8px] uppercase font-bold text-stone-500 border border-stone-800">
                      {r.count} slots
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={`mt-auto p-3.5 border rounded-sm border-dashed text-stone-500 leading-normal ${
              isDarkMode ? 'bg-stone-950/20 border-stone-850' : 'bg-stone-100/50 border-stone-200'
            }`}>
              <h4 className="font-mono text-[9px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                // System Notice
              </h4>
              <p className="text-[10px] font-sans leading-relaxed">
                These layout figures reflect the real, approved layouts of Joshz Marasigan's clinical capstone project as structured in the Capstone Research Report.
              </p>
            </div>
          </aside>

          {/* COLUMN 2: PORTAL SCREEN LAYOUT LIST (Sub-navigation sidebar) */}
          <aside className={`w-72 shrink-0 border-r flex flex-col min-h-0 ${
            isDarkMode ? 'bg-[#08090d] border-stone-850' : 'bg-stone-100/30 border-stone-150'
          }`}>
            <div className="p-4 border-b shrink-0 flex justify-between items-center bg-stone-950/10">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#8a8a81]">
                {selectedRole.toUpperCase()} Layout List
              </span>
              <span className="font-mono text-[9px] text-emerald-500 font-bold bg-emerald-500/5 px-2 py-0.5 rounded-sm">
                PDF Records
              </span>
            </div>

            {/* Scrollable Layout Selection menu list */}
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
              {currentLayoutList.map(li => {
                const isActive = activeLayout.id === li.id;
                return (
                  <button
                    key={li.id}
                    onClick={() => setSelectedLayoutId(li.id)}
                    className={`px-3 py-2.5 rounded-sm text-left transition-all border flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-stone-950 border-emerald-500 font-bold'
                        : isDarkMode ? 'bg-[#101117] border-stone-850 hover:bg-[#151722] text-stone-400' : 'bg-white border-stone-205 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="text-[11px] font-sans font-bold tracking-tight truncate block">{li.name}</span>
                      <span className={`text-[8.5px] font-mono mt-0.5 ${isActive ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                        Figure {li.figure} · pg {li.page}
                      </span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-stone-950' : 'text-stone-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Layout explanatory details box */}
            <div className={`p-4 border-t shrink-0 ${isDarkMode ? 'bg-[#0f1118] border-stone-855' : 'bg-stone-50 border-stone-150'}`}>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-500 font-bold uppercase mb-1">
                <Info className="w-3 h-3 text-emerald-500" />
                <span>Layout Specs</span>
              </div>
              <p className={`text-[10.5px] font-sans leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                {activeLayout.description}
              </p>
            </div>
          </aside>

          {/* COLUMN 3: REAL SCREEN LAYOUT DISPLAY VIEWPORT */}
          <main className="flex-1 flex flex-col overflow-auto p-5 select-text bg-stone-950/20">
            
            {/* Workstation Simulation Frame Cover */}
            <div className={`flex-1 border rounded-lg shadow-xl flex flex-col min-h-0 relative overflow-hidden ${
              isDarkMode ? 'bg-[#0d0d12] border-stone-850 shadow-emerald-950/5' : 'bg-[#f0f0f2] border-stone-300 shadow-stone-300/40'
            }`}>
              
              {/* Simulated OS Browser Window Header Bar */}
              <div className={`px-4 py-2 flex items-center justify-between shrink-0 font-mono text-[10px] select-none border-b ${
                isDarkMode ? 'bg-[#15171f] border-stone-850 text-stone-400' : 'bg-[#e2e2e7] border-stone-300 text-stone-700'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="w-1.5 border-r h-3 border-stone-700 mx-1" />
                  <span className="text-[9px] flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <Smartphone className="w-3 h-3 text-stone-500 inline-block" /> 
                    lpu-b-dentistry::layout-frame
                  </span>
                </div>
                <div className={`px-4 py-1 border text-[9px] uppercase tracking-wider rounded-sm font-bold ${
                  isDarkMode ? 'bg-stone-950/60 border-stone-800 text-emerald-400' : 'bg-white/80 border-stone-250 text-emerald-600'
                }`}>
                  Figure {activeLayout.figure} · Page {activeLayout.page}
                </div>
              </div>

              {/* SCREENSHOT WORKSPACE VIEWPORT */}
              <div className="flex-1 p-6 overflow-auto flex flex-col justify-center items-center bg-stone-950">
                <div className="relative max-w-full max-h-[50vh] xl:max-h-[55vh] flex items-center justify-center group overflow-hidden rounded border border-stone-800 bg-[#060608] shadow-2xl">
                  {/* REAL PDF SCREENSHOT IMAGE DISPLAY */}
                  <img 
                    src={assetUrl(activeImagePath)} 
                    alt={activeLayout.name}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[48vh] xl:max-h-[52vh] object-contain transition-transform duration-300 pointer-events-auto hover:scale-110 cursor-zoom-in"
                  />
                  
                  {/* Corner indicator overlay */}
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-stone-950/80 border border-stone-800 rounded text-[9px] font-mono text-stone-400 tracking-wider">
                    Actual Project Output Screenshot
                  </div>
                </div>

                {/* Info summary row below picture */}
                <div className="mt-4 max-w-2xl text-center">
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-500" />
                    {activeLayout.name}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed mt-1 font-mono">
                    System component mapped to page {activeLayout.page} on the Dentistry Capstone Research report.
                  </p>
                </div>
              </div>

            </div>

            {/* Viewport bottom interactive signal helper */}
            <div className={`mt-3 p-3 border rounded-sm flex items-center gap-2.5 shadow-sm justify-between ${
              isDarkMode ? 'bg-[#0f1118] border-stone-850/80 text-stone-400' : 'bg-white border-stone-200 text-stone-850'
            }`}>
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold shrink-0">
                <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-stone-300">Layout Verification:</span>
              </div>
              <p className="text-[10px] leading-relaxed select-none text-stone-400">
                This layouts viewer hosts the original screenshots submitted in the Dentistry Capstone PDF. Hover over the screen image to interactively scale or scrutinize details.
              </p>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

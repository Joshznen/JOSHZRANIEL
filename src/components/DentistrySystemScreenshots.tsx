import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  FolderLock, 
  Users, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Eye, 
  ExternalLink,
  Smartphone,
  Laptop,
  FileText,
  Stethoscope,
  PieChart,
  Palette,
  Database,
  Code,
  Shield,
  Layers,
  Sparkles,
  Moon
} from 'lucide-react';
import {assetUrl} from '../lib/assetUrl';

interface LayoutItem {
  id: string;
  figure: string;
  name: string;
  page: number;
  photo: string;
}

interface DentistrySystemScreenshotsProps {
  isDarkMode: boolean;
  isModalMode?: boolean;
}

// Map of all actual photos from the dentist photo directory, sorted by role
const PHOTO_BASE = '/assets/dentist%20photo/';

export default function DentistrySystemScreenshots({ isDarkMode, isModalMode = false }: DentistrySystemScreenshotsProps) {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'clinician' | 'ci' | 'cod'>('admin');
  const [hoveredLayoutId, setHoveredLayoutId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; title: string } | null>(null);

  const roles = [
    { id: 'admin', name: 'Administrator Portal', icon: Laptop, count: 41, desc: 'Highest privilege. Full access to user management, dental logs, scheduling, and system audits.' },
    { id: 'cod', name: 'Clinician on Duty', icon: Layers, count: 12, desc: 'Staff supervisor view. Automatically distributes incoming patient rotations, manages active pools, and coordinates CIs.' },
    { id: 'clinician', name: 'Clinician / Intern', icon: Users, count: 29, desc: 'Dental student view. Manages active patient records, logs procedures, and edits clinical charting pages.' },
    { id: 'ci', name: 'Clinical Instructor', icon: ShieldCheck, count: 26, desc: 'Faculty examiner view. Direct oversight to approve student sessions, evaluate techniques, and transfer caseloads.' }
  ] as const;

  const layoutDirectory: Record<'admin' | 'clinician' | 'ci' | 'cod', LayoutItem[]> = {
    admin: [
      { id: 'admin_56',  figure: '56',  name: 'Log in Screen',                            page: 0, photo: PHOTO_BASE + 'Picture111.png' },
      { id: 'admin_57',  figure: '57',  name: 'Dashboard (Admin)',                         page: 0, photo: PHOTO_BASE + 'Picture110.png' },
      { id: 'admin_58',  figure: '58',  name: 'Patient Section (Admin)',                   page: 0, photo: PHOTO_BASE + 'Picture109.png' },
      { id: 'admin_59',  figure: '59',  name: 'Viewing Patient Record 1st page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture108.png' },
      { id: 'admin_60',  figure: '60',  name: 'Viewing Patient Record 1st page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture107.jpg' },
      { id: 'admin_61',  figure: '61',  name: 'Viewing Patient Record 2nd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture106.jpg' },
      { id: 'admin_62',  figure: '62',  name: 'Viewing Patient Record 2nd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture105.jpg' },
      { id: 'admin_63',  figure: '63',  name: 'Viewing Patient Record 3rd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture104.png' },
      { id: 'admin_64',  figure: '64',  name: 'Viewing Patient Record 3rd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture103.jpg' },
      { id: 'admin_65',  figure: '65',  name: 'Viewing Patient Record 4th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture102.png' },
      { id: 'admin_66',  figure: '66',  name: 'Viewing Patient Record 4th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture101.png' },
      { id: 'admin_67',  figure: '67',  name: 'Viewing Patient Record 5th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture100.jpg' },
      { id: 'admin_68',  figure: '68',  name: 'Editing Patient Record 1st page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture99.png'  },
      { id: 'admin_69',  figure: '69',  name: 'Editing Patient Record 1st page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture98.png'  },
      { id: 'admin_70',  figure: '70',  name: 'Image Capture (Admin, Clinician)',           page: 0, photo: PHOTO_BASE + 'Picture97.jpg'  },
      { id: 'admin_71',  figure: '71',  name: 'Fingerprint Capture (Admin, Clinician)',     page: 0, photo: PHOTO_BASE + 'Picture96.png'  },
      { id: 'admin_72',  figure: '72',  name: 'Editing Patient Record 2nd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture95.png'  },
      { id: 'admin_73',  figure: '73',  name: 'Editing Patient Record 2nd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture94.png'  },
      { id: 'admin_74',  figure: '74',  name: 'Editing Patient Record 3rd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture93.jpg'  },
      { id: 'admin_75',  figure: '75',  name: 'Editing Patient Record 3rd page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture92.jpg'  },
      { id: 'admin_76',  figure: '76',  name: 'Editing Patient Record 4th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture91.jpg'  },
      { id: 'admin_77',  figure: '77',  name: 'Editing Patient Record 4th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture90.jpg'  },
      { id: 'admin_78',  figure: '78',  name: 'Editing Patient Record 5th page (Admin)',   page: 0, photo: PHOTO_BASE + 'Picture89.jpg'  },
      { id: 'admin_79',  figure: '79',  name: 'Log Procedure Section (Admin)',              page: 0, photo: PHOTO_BASE + 'Picture88.png'  },
      { id: 'admin_80',  figure: '80',  name: 'Patient Assignment Section (Admin)',         page: 0, photo: PHOTO_BASE + 'Picture87.png'  },
      { id: 'admin_81',  figure: '81',  name: 'Log Procedures Assignment Section (Admin)',  page: 0, photo: PHOTO_BASE + 'Picture86.jpg'  },
      { id: 'admin_82',  figure: '82',  name: 'System Users Section (Admin)',               page: 0, photo: PHOTO_BASE + 'Picture85.png'  },
      { id: 'admin_83',  figure: '83',  name: 'Add New User (Admin)',                       page: 0, photo: PHOTO_BASE + 'Picture84.png'  },
      { id: 'admin_84',  figure: '84',  name: 'View User Information (Admin)',              page: 0, photo: PHOTO_BASE + 'Picture83.png'  },
      { id: 'admin_85',  figure: '85',  name: 'Sort by Administrator (Admin)',              page: 0, photo: PHOTO_BASE + 'Picture82.png'  },
      { id: 'admin_86',  figure: '86',  name: 'Sort by Clinical Instructor (Admin)',        page: 0, photo: PHOTO_BASE + 'Picture81.jpg'  },
      { id: 'admin_87',  figure: '87',  name: 'Sort by Clinician (Admin)',                  page: 0, photo: PHOTO_BASE + 'Picture80.jpg'  },
      { id: 'admin_88',  figure: '88',  name: 'Sort by Clinician on Duty (Admin)',          page: 0, photo: PHOTO_BASE + 'Picture79.jpg'  },
      { id: 'admin_89',  figure: '89',  name: 'Delete User (Admin)',                        page: 0, photo: PHOTO_BASE + 'Picture78.png'  },
      { id: 'admin_90',  figure: '90',  name: 'Procedures Log Section (Admin)',             page: 0, photo: PHOTO_BASE + 'Picture77.jpg'  },
      { id: 'admin_91',  figure: '91',  name: 'Procedures Log Section Reports (Admin)',     page: 0, photo: PHOTO_BASE + 'Picture76.png'  },
      { id: 'admin_92',  figure: '92',  name: 'Generated Log Reports (Admin)',              page: 0, photo: PHOTO_BASE + 'Picture75.png'  },
      { id: 'admin_93',  figure: '93',  name: 'Profile Section (Admin)',                    page: 0, photo: PHOTO_BASE + 'Picture74.jpg'  },
      { id: 'admin_94',  figure: '94',  name: 'Upload Profile Picture (Admin)',             page: 0, photo: PHOTO_BASE + 'Picture73.png'  },
      { id: 'admin_95',  figure: '95',  name: 'Edit Profile Information (Admin)',           page: 0, photo: PHOTO_BASE + 'Picture72.jpg'  },
      { id: 'admin_96',  figure: '96',  name: 'Settings Section (Admin)',                   page: 0, photo: PHOTO_BASE + 'Picture71.jpg'  },
    ],
    cod: [
      { id: 'cod_152', figure: '152', name: 'Dashboard (COD)',                        page: 0, photo: PHOTO_BASE + 'Picture15.png' },
      { id: 'cod_153', figure: '153', name: 'Patient Section (COD)',                  page: 0, photo: PHOTO_BASE + 'Picture14.jpg' },
      { id: 'cod_154', figure: '154', name: 'Patient Assignment Section (COD)',        page: 0, photo: PHOTO_BASE + 'Picture13.jpg' },
      { id: 'cod_155', figure: '155', name: 'Log Procedures Assignment Section (COD)',page: 0, photo: PHOTO_BASE + 'Picture12.png' },
      { id: 'cod_156', figure: '156', name: 'Add CI to Assignment Pool (COD)',         page: 0, photo: PHOTO_BASE + 'Picture11.png' },
      { id: 'cod_157', figure: '157', name: 'Reassign Patient (COD)',                  page: 0, photo: PHOTO_BASE + 'Picture10.jpg' },
      { id: 'cod_158', figure: '158', name: 'Profile (COD)',                           page: 0, photo: PHOTO_BASE + 'Picture9.jpg'  },
      { id: 'cod_159', figure: '159', name: 'Upload Profile (COD)',                    page: 0, photo: PHOTO_BASE + 'Picture8.jpg'  },
      { id: 'cod_160', figure: '160', name: 'Edit Profile (COD)',                      page: 0, photo: PHOTO_BASE + 'Picture7.png'  },
      { id: 'cod_161', figure: '161', name: 'Settings (COD)',                          page: 0, photo: PHOTO_BASE + 'Picture6.jpg'  },
      { id: 'cod_162', figure: '162', name: 'Generate Report',                         page: 0, photo: PHOTO_BASE + 'Picture5.jpg'  },
      { id: 'cod_163', figure: '163', name: 'Logout Screen',                           page: 0, photo: PHOTO_BASE + 'Picture2.png'  },
    ],
    clinician: [
      { id: 'clinician_97',  figure: '97',  name: 'Dashboard (Clinician)',                            page: 0, photo: PHOTO_BASE + 'Picture70.jpg' },
      { id: 'clinician_98',  figure: '98',  name: 'Patient Section (Clinician)',                      page: 0, photo: PHOTO_BASE + 'Picture69.png' },
      { id: 'clinician_99',  figure: '99',  name: 'Add New Patient (Clinician)',                      page: 0, photo: PHOTO_BASE + 'Picture68.jpg' },
      { id: 'clinician_100', figure: '100', name: 'Viewing Patient Record 1st page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture67.jpg' },
      { id: 'clinician_101', figure: '101', name: 'Viewing Patient Record 1st page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture66.png' },
      { id: 'clinician_102', figure: '102', name: 'Viewing Patient Record 2nd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture65.png' },
      { id: 'clinician_103', figure: '103', name: 'Viewing Patient Record 2nd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture64.jpg' },
      { id: 'clinician_104', figure: '104', name: 'Viewing Patient Record 3rd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture63.png' },
      { id: 'clinician_105', figure: '105', name: 'Viewing Patient Record 3rd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture62.jpg' },
      { id: 'clinician_106', figure: '106', name: 'Viewing Patient Record 4th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture61.png' },
      { id: 'clinician_107', figure: '107', name: 'Viewing Patient Record 4th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture60.png' },
      { id: 'clinician_108', figure: '108', name: 'Viewing Patient Record 5th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture59.png' },
      { id: 'clinician_109', figure: '109', name: 'Log Procedure Section (Clinician)',                page: 0, photo: PHOTO_BASE + 'Picture58.jpg' },
      { id: 'clinician_110', figure: '110', name: 'Editing Patient Record 1st page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture57.png' },
      { id: 'clinician_111', figure: '111', name: 'Editing Patient Record 1st page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture56.png' },
      { id: 'clinician_112', figure: '112', name: 'Image Capture (Clinician)',                        page: 0, photo: PHOTO_BASE + 'Picture55.png' },
      { id: 'clinician_113', figure: '113', name: 'Fingerprint Scanner (Clinician)',                  page: 0, photo: PHOTO_BASE + 'Picture54.jpg' },
      { id: 'clinician_114', figure: '114', name: 'Editing Patient Record 2nd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture53.png' },
      { id: 'clinician_115', figure: '115', name: 'Editing Patient Record 2nd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture52.png' },
      { id: 'clinician_116', figure: '116', name: 'Editing Patient Record 3rd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture51.jpg' },
      { id: 'clinician_117', figure: '117', name: 'Editing Patient Record 3rd page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture50.jpg' },
      { id: 'clinician_118', figure: '118', name: 'Editing Patient Record 4th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture49.jpg' },
      { id: 'clinician_119', figure: '119', name: 'Editing Patient Record 4th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture48.jpg' },
      { id: 'clinician_120', figure: '120', name: 'Editing Patient Record 5th page (Clinician)',      page: 0, photo: PHOTO_BASE + 'Picture47.jpg' },
      { id: 'clinician_121', figure: '121', name: 'Log Procedure Section (Clinician)',                page: 0, photo: PHOTO_BASE + 'Picture46.jpg' },
      { id: 'clinician_122', figure: '122', name: 'Profile Section (Clinician)',                      page: 0, photo: PHOTO_BASE + 'Picture45.png' },
      { id: 'clinician_123', figure: '123', name: 'Upload Profile (Clinician)',                       page: 0, photo: PHOTO_BASE + 'Picture44.jpg' },
      { id: 'clinician_124', figure: '124', name: 'Edit Profile (Clinician)',                         page: 0, photo: PHOTO_BASE + 'Picture43.jpg' },
      { id: 'clinician_125', figure: '125', name: 'Settings Section (Clinician)',                     page: 0, photo: PHOTO_BASE + 'Picture42.jpg' },
    ],
    ci: [
      { id: 'ci_126', figure: '126', name: 'Dashboard (CI)',                        page: 0, photo: PHOTO_BASE + 'Picture41.jpg' },
      { id: 'ci_127', figure: '127', name: 'Patient Section (CI)',                  page: 0, photo: PHOTO_BASE + 'Picture40.png' },
      { id: 'ci_128', figure: '128', name: 'Viewing Patient Record 1st page (CI)', page: 0, photo: PHOTO_BASE + 'Picture39.png' },
      { id: 'ci_129', figure: '129', name: 'Viewing Patient Record 1st page (CI)', page: 0, photo: PHOTO_BASE + 'Picture38.png' },
      { id: 'ci_130', figure: '130', name: 'Viewing Patient Record 2nd page (CI)', page: 0, photo: PHOTO_BASE + 'Picture37.png' },
      { id: 'ci_131', figure: '131', name: 'Viewing Patient Record 2nd page (CI)', page: 0, photo: PHOTO_BASE + 'Picture36.png' },
      { id: 'ci_132', figure: '132', name: 'Viewing Patient Record 3rd page (CI)', page: 0, photo: PHOTO_BASE + 'Picture35.jpg' },
      { id: 'ci_133', figure: '133', name: 'Viewing Patient Record 3rd page (CI)', page: 0, photo: PHOTO_BASE + 'Picture34.jpg' },
      { id: 'ci_134', figure: '134', name: 'Viewing Patient Record 4th page (CI)', page: 0, photo: PHOTO_BASE + 'Picture33.png' },
      { id: 'ci_135', figure: '135', name: 'Viewing Patient Record 4th page (CI)', page: 0, photo: PHOTO_BASE + 'Picture32.jpg' },
      { id: 'ci_136', figure: '136', name: 'Viewing Patient Record 4th page (CI)', page: 0, photo: PHOTO_BASE + 'Picture31.png' },
      { id: 'ci_137', figure: '137', name: 'Viewing Patient Record 5th page (CI)', page: 0, photo: PHOTO_BASE + 'Picture30.png' },
      { id: 'ci_138', figure: '138', name: 'Edit Patient Status (CI)',              page: 0, photo: PHOTO_BASE + 'Picture29.png' },
      { id: 'ci_139', figure: '139', name: 'Patient Progress Notes (CI)',          page: 0, photo: PHOTO_BASE + 'Picture28.png' },
      { id: 'ci_140', figure: '140', name: 'Transfer Patient (CI)',                page: 0, photo: PHOTO_BASE + 'Picture27.png' },
      { id: 'ci_141', figure: '141', name: 'Transfer History (Other CI)',          page: 0, photo: PHOTO_BASE + 'Picture26.jpg' },
      { id: 'ci_142', figure: '142', name: 'Transferred Patient (Other CI)',       page: 0, photo: PHOTO_BASE + 'Picture25.png' },
      { id: 'ci_143', figure: '143', name: 'View Details (Other CI)',              page: 0, photo: PHOTO_BASE + 'Picture24.png' },
      { id: 'ci_144', figure: '144', name: 'Accept Transfer (Other CI)',           page: 0, photo: PHOTO_BASE + 'Picture23.jpg' },
      { id: 'ci_145', figure: '145', name: 'Reject Transfer (Other CI)',           page: 0, photo: PHOTO_BASE + 'Picture22.jpg' },
      { id: 'ci_146', figure: '146', name: 'Patient Assignment Section (CI)',      page: 0, photo: PHOTO_BASE + 'Picture21.jpg' },
      { id: 'ci_147', figure: '147', name: 'Patient Assignment Review (CI)',       page: 0, photo: PHOTO_BASE + 'Picture20.png' },
      { id: 'ci_148', figure: '148', name: 'Profile Section (CI)',                 page: 0, photo: PHOTO_BASE + 'Picture19.png' },
      { id: 'ci_149', figure: '149', name: 'Upload Profile (CI)',                  page: 0, photo: PHOTO_BASE + 'Picture18.png' },
      { id: 'ci_150', figure: '150', name: 'Edit Profile (CI)',                    page: 0, photo: PHOTO_BASE + 'Picture17.jpg' },
      { id: 'ci_151', figure: '151', name: 'Settings Section (CI)',                page: 0, photo: PHOTO_BASE + 'Picture16.jpg' },
    ]
  };

  const activeRoleInfo = roles.find(r => r.id === selectedRole) || roles[0];
  const listToRender = layoutDirectory[selectedRole];

  const keyFeatures = [
    {
      title: 'Multi-Role Authentication',
      desc: 'Admin, Clinician, Clinical Instructor, and COD roles with role-based access control (RBAC)',
      icon: Shield,
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Patient Information Records',
      desc: 'Multi-step patient registration with demographics, health questionnaire, dental examination, and consent forms',
      icon: FileText,
      color: 'from-cyan-500 to-emerald-500'
    },
    {
      title: 'Procedure Logging',
      desc: 'Comprehensive dental procedure logging with auto-assignment to available Clinical Instructors',
      icon: Stethoscope,
      color: 'from-emerald-600 to-cyan-500'
    },
    {
      title: 'Clinical Workflows',
      desc: 'COD assigns patients to Clinical Instructors with acceptance/approval workflows',
      icon: Users,
      color: 'from-cyan-600 to-emerald-500'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Role-specific statistics, patient status charts, and monthly submission trends',
      icon: PieChart,
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      title: 'Modern UI/UX',
      desc: 'Dark mode support, responsive design, and smooth animations with Tailwind CSS',
      icon: Moon,
      color: 'from-cyan-500 to-emerald-500'
    }
  ];

  const techStack = [
    { name: 'PHP', icon: Code, color: 'text-purple-500 border-purple-500/20 bg-purple-500/5' },
    { name: 'MySQL', icon: Database, color: 'text-blue-500 border-blue-500/20 bg-blue-500/5' },
    { name: 'Tailwind CSS', icon: Palette, color: 'text-sky-500 border-sky-500/20 bg-sky-500/5' },
    { name: 'JavaScript', icon: Code, color: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' },
    { name: 'Chart.js', icon: PieChart, color: 'text-violet-500 border-violet-500/20 bg-violet-500/5' },
    { name: 'PDO', icon: ShieldCheck, color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' }
  ];

  const contentBody = (
    <div className="flex flex-col gap-16 select-text">
      
      {/* 1. Key Features Subsection */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            Key <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Features</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-lg ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Explore the powerful features that make this project stand out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="key-features-grid">
          {keyFeatures.map((feat, fIdx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={fIdx}
                className={`p-6 rounded-xl border flex flex-col items-center text-center md:items-start md:text-left gap-4 transition-all duration-300 transform hover:-translate-y-1 shadow-sm ${
                  isDarkMode
                    ? 'bg-[#121217]/90 border-stone-800 hover:border-emerald-500/30 hover:bg-[#16161f]'
                    : 'bg-white border-stone-200/85 hover:border-emerald-500/20 hover:shadow-md'
                }`}
              >
                {/* Visual Circle Icon wrapper */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md bg-gradient-to-br ${feat.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h4 className={`text-sm font-sans font-bold tracking-tight ${isDarkMode ? 'text-stone-105' : 'text-stone-900'}`}>
                    {feat.title}
                  </h4>
                  <p className={`text-xs font-sans leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. System Screenshots Subsection */}
      <div className="flex flex-col gap-8 border-t pt-12 border-stone-800/10 dark:border-stone-800/40">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            System <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Screenshots</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-lg ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Explore the iIDENTIFY system interface for different user roles
          </p>
        </div>

        {/* Roles Filter Switches */}
        <div className="flex flex-wrap gap-2 justify-center" id="actor-filters">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`px-5 py-2 rounded-full border text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 text-white border-transparent shadow-lg shadow-emerald-500/15 scale-102 font-bold'
                    : isDarkMode
                      ? 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      : 'bg-stone-150/40 border-stone-200 text-stone-605 hover:bg-stone-200/50'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{role.id === 'admin' ? 'Admin' : role.id === 'cod' ? 'COD' : role.id === 'clinician' ? 'Clinician' : 'Clinical Instructor'}</span>
              </button>
            );
          })}
        </div>

        {/* Access Specification Block */}
        <div className={`p-5 rounded-xl border flex flex-col gap-1.5 transition-all duration-300 ${
          isDarkMode ? 'bg-[#101015] border-stone-850/80' : 'bg-stone-50/50 border-stone-200/80 shadow-sm'
        }`}>
          <span className="font-mono text-[9px] uppercase font-bold text-stone-500 tracking-wider">
            PORTAL ACCESS SPECIFICATION
          </span>
          <h4 className={`font-sans text-sm font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            {activeRoleInfo.name} ({activeRoleInfo.count} layout records)
          </h4>
          <p className={`font-sans text-xs leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-550'}`}>
            {activeRoleInfo.desc}
          </p>
        </div>

        {/* Screenshots Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" id="screenshots-layout-grid">
          {listToRender.map((layout) => {
            const isHovered = hoveredLayoutId === layout.id;
            return (
              <div
                key={layout.id}
                onMouseEnter={() => setHoveredLayoutId(layout.id)}
                onMouseLeave={() => setHoveredLayoutId(null)}
                className="overflow-hidden flex flex-col gap-2.5 group transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Box */}
                <div className={`aspect-[4/3] rounded-xl overflow-hidden relative shadow-md transition-shadow duration-300 group-hover:shadow-lg border ${
                  isDarkMode ? 'bg-stone-950 border-stone-850/40' : 'bg-stone-50 border-stone-200/50'
                }`}>
                  <img
                    src={assetUrl(layout.photo)}
                    alt={layout.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay Zoom */}
                  <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setLightboxPhoto({ src: layout.photo, title: layout.name })}
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 transition-all text-[10px] font-bold leading-none uppercase font-mono tracking-wider flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </button>
                  </div>
                </div>

                {/* Title Only */}
                <div className="flex flex-col items-center text-center px-1">
                  <h4 className={`text-xs font-bold font-sans tracking-tight truncate max-w-full ${
                    isDarkMode ? 'text-stone-300 group-hover:text-emerald-400' : 'text-stone-800 group-hover:text-emerald-600'
                  }`}>
                    {layout.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Technology Stack Subsection */}
      <div className="flex flex-col gap-8 border-t pt-12 border-stone-800/10 dark:border-stone-800/40 items-center text-center">
        <div className="flex flex-col gap-2 items-center">
          <h3 className={`text-2xl font-sans font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            Technology <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">Stack</span>
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          <p className={`font-sans text-xs md:text-sm mt-2 max-w-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
            Built with modern technologies and best practices
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center" id="tech-stack-pills">
          {techStack.map((tech) => {
            const IconComponent = tech.icon;
            return (
              <span
                key={tech.name}
                className={`px-5 py-2 border font-mono text-[11px] uppercase tracking-wider font-bold rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105 shadow-sm ${tech.color} ${
                  isDarkMode ? 'border-opacity-30' : ''
                }`}
              >
                <IconComponent className="w-3.5 h-3.5 shrink-0" />
                <span>{tech.name}</span>
              </span>
            );
          })}
        </div>
      </div>

    </div>
  );

  const lightboxEl = lightboxPhoto ? ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
      onClick={() => setLightboxPhoto(null)}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="relative max-w-5xl w-full flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-xs text-stone-300 uppercase tracking-widest">{lightboxPhoto.title}</span>
          <button
            onClick={() => setLightboxPhoto(null)}
            className="text-stone-400 hover:text-white text-xs font-mono uppercase tracking-widest border border-stone-700 hover:border-stone-400 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
        <img
          src={assetUrl(lightboxPhoto.src)}
          alt={lightboxPhoto.title}
          className="w-full rounded-xl shadow-2xl border border-stone-700/60 object-contain"
          style={{ maxHeight: '82vh' }}
        />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {lightboxEl}

      {isModalMode ? contentBody : (
        <section className={`border-y py-24 px-6 sm:px-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0b0c10] border-stone-900' : 'bg-stone-50 border-stone-200'
        }`} id="screenshots-section">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            
            {/* Headings */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                CAPSTONE INTERFACE VIEWPORT
              </span>
              <h2 className={`text-3xl font-serif font-semibold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-stone-950'
              }`}>
                System Screenshots
              </h2>
              <p className={`font-sans text-xs md:text-sm max-w-xl ${
                isDarkMode ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Explore the high-fidelity iDENTify system interface layouts for different institutional user roles, verified directly from our academic capstone report.
              </p>
            </div>

            {contentBody}

          </div>
        </section>
      )}
    </>
  );
}

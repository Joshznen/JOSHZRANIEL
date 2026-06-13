import { Experience, SkillCategory, Certification, Achievement, Seminar, Project, Service } from './types';

export const personalInfo = {
  name: 'Joshz Raniel D. Marasigan',
  title: 'Multi-Skilled Tech & Design Freelancer',
  institution: 'Lyceum of the Philippines University – Batangas',
  degree: 'Bachelor of Science in Information Technology',
  specialization: 'Multimedia Technology',
  location: 'Alangilan, Batangas City, Philippines, 4200',
  email: 'joshzraniel@gmail.com',
  phone: '+63 927 555 7630',
  altPhone: '+63 9275 555 7630',
  linkedin: 'https://www.linkedin.com/in/joshz-marasigan-7710433aa/',
  github: 'https://github.com/joshzraniel',
  website: 'https://joshzraniel.dev',
  facebook: 'https://www.facebook.com/joshzzdatinguinoo/',
  indeed: 'https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-jobseeker-profile--profile-one-frontend',
  brandingStatement: 'Freelancer, As an OpenAI junior full-stack web developer and IT support specialist, I am a highly adaptable, rapid-learning freelancer who delivers comprehensive, production-ready digital and technical solutions. I combine deep expertise in Cisco IT support, enterprise network administration, and databases with the ability to engineer full-stack web systems (frontend, backend, and relational databases) assisted by advanced AI workflows. Leveraging generative AI tools as custom productivity-multipliers for any professional task, alongside expert high-fidelity packaging design, multimedia production, and branding, I help businesses optimize their digital ecosystems with seamless technical poise.',
  titles: [
    'Freelancer for IT & Creative Solutions',
    'OpenAI Junior Full-Stack Web Developer',
    'IT Support Specialist & Network Administrator',
    'AI Engineer & Prompt Integrator',
    'Graphic & Packaging Designer',
    'Strategic Digital Marketer'
  ]
};

export const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'IT Support & Systems Architect Intern',
    company: 'Lyceum of the Philippines University – Batangas',
    location: 'Capitol Site, Batangas City',
    period: 'April 2026 – June 2026',
    type: 'internship',
    description: 'Directed end-to-end technical support and network infrastructure administration for classrooms, administrative centers, and campus laboratories, optimizing user productivity and system uptime.',
    highlights: [
      'Executed campus-wide Wi-Fi network diagnostics and active monitoring of Cisco & Deco mesh systems, ensuring stable high-speed connectivity for over 500+ active users.',
      'Configured, assembled, and maintained key workstation hardware, network cabling, and primary lab computer operating environments.',
      'Supported staff and students with advanced database queries, operating systems troubleshooting, and digital web applications onboarding/resolution.',
      'Supervised technical team actions during office and lab hardware migrations, preventing data loss and minimizing system offline periods.'
    ],
    skillsGained: ['Network Diagnostics', 'Cisco Routers & Switches', 'Hardware Assembly', 'System Operations', 'User Onboarding']
  },
  {
    id: 'exp2',
    role: 'IT Support & Scanner Maintenance Technician (Intern/OJT)',
    company: 'Casedist Inc.',
    location: 'Batangas City / Manila BOC & Airports',
    period: 'February 2026 – June 2026',
    type: 'internship',
    description: 'Specialized in the active physical diagnostics, software calibration, and equipment maintenance of security X-ray scanners and airport baggage checking systems.',
    highlights: [
      'Conducted active software calibration, physical diagnostics, and preventative hardware maintenance of advanced Rapiscan X-ray security scanning units deployed at airport luggage baggage screening terminals and Manila Bureau of Customs (BOC) hubs.',
      'Analyzed specialized technical system modules and formulated structured daily equipment health logs, ensuring full operational regulatory checklists compliance.',
      'Developed and optimized a digital hardware component database and inventory encoding workflow using MS Excel, minimizing parts search overhead.',
      'Interfaced with airport security staff, custom officers, and senior technicians, translating complex scanner hardware alerts into clear, actionable physical fixes.'
    ],
    skillsGained: ['Security X-Ray Diagnostic Systems', 'Rapiscan Calibration & Hardware Care', 'Technical Compliance Logs', 'Inventory Database Management', 'Operational Field support']
  },
  {
    id: 'exp2b',
    role: 'Fastfood Chain Worker',
    company: 'Fastfood Chain',
    location: 'On-site',
    period: 'Summer 2022 (2 Months)',
    type: 'employment',
    description: 'Worked in a fast-paced fastfood environment during the summer, assigned to both kitchen operations and lobby area maintenance.',
    highlights: [
      'Assigned to kitchen duties, ensuring food preparation met quality and speed standards.',
      'Maintained cleanliness and order in the lobby area, providing an excellent customer experience.',
      'Handled high-volume orders efficiently during peak summer hours.'
    ],
    skillsGained: ['Kitchen Operations', 'Customer Service', 'Time Management', 'Sanitation']
  },
  {
    id: 'exp2c',
    role: 'All-Around Kitchen Chef & Staff',
    company: 'Pomodoro Pizza Restaurant',
    location: 'On-site',
    period: 'Summer 2024 (2 Months)',
    type: 'employment',
    description: 'Served as an all-around staff member, primarily functioning as a kitchen chef while handling front-of-house and back-of-house operations simultaneously with minimal staff.',
    highlights: [
      'Acted as a kitchen chef, cooking, baking, and preparing ingredients for pizza and other menu items.',
      'Managed end-to-end operations including inventory tracking, cashier duties, and daily reporting.',
      'Contributed to marketing efforts and ensured the entire restaurant was kept clean and orderly.',
      'Effectively managed all restaurant positions, often with only two workers on duty per day.'
    ],
    skillsGained: ['Culinary Arts', 'Baking', 'Inventory Management', 'Cashiering', 'Marketing', 'Multitasking']
  },
  {
    id: 'exp3',
    role: 'Freelance Facebook Page Administrator & Customer Support',
    company: 'Digital & Real Estate Platforms',
    location: 'Batangas / Remote',
    period: '2024 – Present',
    type: 'employment',
    description: 'Independently established, launched, and managed personal online shop accounts, successfully promoting and selling products directly to consumers.',
    highlights: [
      'Independently established, launched, and managed personal online shop accounts, successfully promoting and selling products directly to consumers.',
      'Handled end-to-end store operations, including product sourcing, visual content creation, inventory updates, and setting competitive pricing.',
      'Maintained excellent customer response rates by addressing inquiries, resolving order concerns, and nurturing leads into completed sales transactions.',
      'Monitored marketplace trends to continuously optimize product tags, descriptions, and keywords for better search visibility.',
      'E-Commerce Platforms: TikTok Shop Seller Center, Shopee Seller Center navigation (fast learner), Carousell, Facebook Business Manager.',
      'Productivity & Data Encoding: Microsoft Excel, Google Sheets, Data Entry and Organization.',
      'Creative Assets: Canva, Creative Content Formatting, AI Layout and Writing Tools (Claude AI, ChatGPT, DeepSeek).'
    ],
    skillsGained: ['TikTok Shop', 'Shopee Seller Center', 'Excel/Sheets', 'Canva Pro', 'GenAI tools', 'Customer Support']
  },
  {
    id: 'exp4',
    role: 'Lead Developer & UI/UX Designer – E-Commerce Web Project',
    company: 'Lyceum of the Philippines University - Batangas',
    location: 'Batangas City',
    period: 'Academic IT Initiative',
    type: 'employment',
    description: 'Designed and built a fully functional e-commerce website layout from scratch as part of a core academic IT initiative.',
    highlights: [
      'Designed and built a fully functional e-commerce website layout from scratch as part of a core academic IT initiative.',
      'Gained a foundational understanding of online checkout systems, user navigation funnels, and product database structures.',
      'Wrote compelling, benefit-focused product listings and optimized layouts to enhance simulated customer conversion rates.'
    ],
    skillsGained: ['E-Commerce UI', 'Checkout Funnels', 'Product Database Design', 'Conversion Optimization']
  },
  {
    id: 'exp5',
    role: 'Freelance Real Estate & Social Media Lead',
    company: 'Facebook Marketplace & Digital Platforms',
    location: 'Remote',
    period: '2024 – Present',
    type: 'employment',
    description: 'Authored persuasive ad copy, descriptive property overviews, and high-converting real estate listings for houses for rent and sale, serving multiple clients.',
    highlights: [
      'Authored persuasive ad copy, descriptive property overviews, and high-converting real estate listings for houses for rent and sale, serving multiple clients.',
      'Managed customer inquiries and lead generation via Facebook Messenger, translating complex property terms into clear, engaging, and approachable sales conversations.',
      'Designed visual social media graphics accompanied by compelling, benefit-focused captions that directly drove property viewings and client inquiries.'
    ],
    skillsGained: ['Real Estate Copywriting', 'Facebook Marketplace', 'Messenger Lead Funnels', 'Interpersonal Sales']
  },
  {
    id: 'exp6',
    role: 'Content Creator & Layout Designer (Personal Projects)',
    company: 'Creative Writing & Book Publishing',
    location: 'Batangas',
    period: 'Free Time Activity',
    type: 'employment',
    description: 'Explored creative concept writing, Canva templating, publication standards, packaging layouts, and custom typesetting elements in personal studies.',
    highlights: [
      'Composed and formatted original creative writing drafts, structuring dielines and visual layouts utilizing Canva Pro.',
      'Designed premium visual backdrops, assets, and custom typesets to foster highly immersive reading experiences.'
    ],
    skillsGained: ['Canva Graphics Production', 'Creative Layout Design', 'typesetting', 'Adobe InDesign', 'Self-Publishing Basics']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Technical Support & Systems',
    description: 'Hardware, OS environments, troubleshooting methodologies, and user service management standard protocols.',
    iconName: 'Cpu',
    skills: [
      { name: 'Computer Troubleshooting', rating: 95, level: 'Expert' },
      { name: 'Hardware Repair & Specs', rating: 92, level: 'Expert' },
      { name: 'OS Installation (Windows/Linux)', rating: 94, level: 'Expert' },
      { name: 'Diagnostic Software Diagnostics', rating: 90, level: 'Advanced' },
      { name: 'Technical Compliance Logs', rating: 88, level: 'Advanced' },
      { name: 'IT Helpdesk Ticketing Rules', rating: 85, level: 'Advanced' }
    ]
  },
  {
    title: 'Cisco Enterprise Networking',
    description: 'Designing, configuring, and maintaining secure, scalable network environments using Cisco systems technologies.',
    iconName: 'Network',
    skills: [
      { name: 'Routing & Switching Protocols', rating: 90, level: 'Advanced' },
      { name: 'OSPF & Static Dynamic Routing', rating: 89, level: 'Advanced' },
      { name: 'Enterprise Subnetting (VLSM)', rating: 92, level: 'Expert' },
      { name: 'VLAN Security & Inter-VLANs', rating: 88, level: 'Advanced' },
      { name: 'Wireless Mesh Setup (Cisco/Deco)', rating: 87, level: 'Advanced' },
      { name: 'TCP/IP Network Diagnostics', rating: 94, level: 'Expert' }
    ]
  },
  {
    title: 'Data Architecture & Systems',
    description: 'Configuring normalized schemas, building logical integrations, optimizing server performance, and data protection.',
    iconName: 'Database',
    skills: [
      { name: 'MySQL Database Schemas', rating: 87, level: 'Advanced' },
      { name: 'Relational Database Design (3NF)', rating: 85, level: 'Advanced' },
      { name: 'SQL Query Optimization', rating: 82, level: 'Advanced' },
      { name: 'Data Security & Storage Plans', rating: 84, level: 'Advanced' },
      { name: 'Systems Analysis & Modeling', rating: 89, level: 'Advanced' }
    ]
  },
  {
    title: 'Creative Multimedia Production',
    description: 'Developing professional assets, digital communications materials, visual templates, and immersive audio-video products.',
    iconName: 'Video',
    skills: [
      { name: 'Adobe Premiere Pro Video Editing', rating: 95, level: 'Expert' },
      { name: 'Canva Social Media Framing', rating: 96, level: 'Expert' },
      { name: 'VR & 360 Video Capture Methods', rating: 85, level: 'Advanced' },
      { name: 'Motion Design & Asset Creation', rating: 91, level: 'Expert' },
      { name: 'Copyright & License Management', rating: 90, level: 'Advanced' }
    ]
  },
  {
    title: 'UI/UX & Interactive Design',
    description: 'Formulating human-centered wireframes, running interactive prototypes, and executing professional usability criteria.',
    iconName: 'Figma',
    skills: [
      { name: 'Interactive Prototyping', rating: 91, level: 'Expert' },
      { name: 'Wireframing & Typography Design', rating: 93, level: 'Expert' },
      { name: 'User Experience Research Map', rating: 86, level: 'Advanced' },
      { name: 'Usability Principles (WCAG)', rating: 89, level: 'Advanced' },
      { name: 'Figma Interactive States', rating: 92, level: 'Expert' }
    ]
  },
  {
    title: 'Artificial Intelligence & Innovation',
    description: 'Evaluating machine learning setups, applying neural models, configuring prompt frameworks, and digital automations.',
    iconName: 'Bot',
    skills: [
      { name: 'Keras & TensorFlow Basics', rating: 84, level: 'Advanced' },
      { name: 'Neural Networks Architecture', rating: 82, level: 'Advanced' },
      { name: 'Prompt Engineering Frameworks', rating: 90, level: 'Advanced' },
      { name: 'AI Tool Integrations', rating: 88, level: 'Advanced' },
      { name: 'Cybersecurity Threat Detection', rating: 86, level: 'Advanced' }
    ]
  }
];

export const certifications: Certification[] = [
  // Cisco Group
  {
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Systems Inc. (Cisco Networking Academy)',
    date: 'June 2025',
    category: 'Cisco',
    credentialId: 'CCNA-ENSA-37213',
    skillsHighlighted: ['WAN Architecture', 'ACL Security', 'OSPF Configuration', 'Network Automation'],
    verificationUrl: 'https://www.credly.com/badges/ac26a63e-cc63-4677-b048-b9f7de1d7247'
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Systems Inc. (Cisco Networking Academy)',
    date: 'June 4, 2025',
    category: 'Cisco',
    credentialId: 'CCNA-SRWE-23194',
    skillsHighlighted: ['Inter-VLAN Routing', 'DHCP Security', 'STP Protocols', 'WLAN Configurations'],
    verificationUrl: 'https://www.credly.com/badges/3414f4ad-0143-4ccd-89e0-d61e80c47316'
  },
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Systems Inc. (Cisco Networking Academy)',
    date: 'July 10, 2024',
    category: 'Cisco',
    credentialId: 'CCNA-ITN-10935',
    skillsHighlighted: ['IPv4/IPv6 Subnetting', 'Ethernet Configs', 'ISO/OSI Reference', 'Router Boot Process'],
    verificationUrl: 'https://www.credly.com/badges/b7df5cfa-be9a-4c2c-905e-f00e96f1ea12'
  },
  {
    title: 'CCNA: Computer Troubleshooting and Repair',
    issuer: 'Cisco Systems Inc.',
    date: 'July 2025',
    category: 'Cisco',
    credentialId: 'CCNA-CTR-2025',
    skillsHighlighted: ['Diagnostic Utilities', 'Hardware Replacement', 'Safe Lab Procedures', 'Motherboard Hardware']
  },
  {
    title: 'Networking Basics',
    issuer: 'Cisco Systems Inc. (Cisco Networking Academy)',
    date: 'December 2025',
    category: 'Cisco',
    credentialId: 'CCNA-NETB-4819',
    skillsHighlighted: ['Router Topology', 'Basic IP Configuration', 'Ping & Traceroute', 'Wi-Fi Protocols']
  },
  {
    title: 'Partner: NDG Linux Unhatched',
    issuer: 'Cisco Systems Inc. (NDG Network Development Group)',
    date: 'April 25, 2024',
    category: 'Cisco',
    credentialId: 'NDG-LNX-2024',
    skillsHighlighted: ['Bash Commands', 'Linux Terminal Navigation', 'User Permissions', 'Shell Text Utilities']
  },
  // IBM Group
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM (IBM SkillsBuild)',
    date: 'March 21, 2025',
    category: 'IBM',
    credentialId: 'IBM-AIF-2918',
    skillsHighlighted: ['Machine Learning Basics', 'Supervised Learning', 'NLP Foundations', 'AI Ethics'],
    verificationUrl: 'https://coursera.org/share/22e8ce3c8a590f085f1115e528870861'
  },
  {
    title: 'AI Fundamentals with IBM SkillsBuild',
    issuer: 'IBM SkillsBuild',
    date: 'March 21, 2025',
    category: 'IBM',
    credentialId: 'IBM-SB-38102',
    skillsHighlighted: ['Deep Generative Models', 'Ethical AI Principles', 'Data Sourcing', 'Model Training']
  },
  {
    title: 'Introduction to Deep Learning & Neural Networks with Keras',
    issuer: 'IBM',
    date: 'May 20, 2025',
    category: 'IBM',
    credentialId: 'IBM-DL-KERAS',
    skillsHighlighted: ['Keras Sequential API', 'Dense Layer Config', 'Weights & Biases', 'Backpropagation'],
    verificationUrl: 'https://coursera.org/share/304a6fd975f7e460131793b90b6ed2d0'
  },
  {
    title: 'Deep Learning with Keras and TensorFlow',
    issuer: 'IBM',
    date: 'May 21, 2025',
    category: 'IBM',
    credentialId: 'IBM-DL-TF',
    skillsHighlighted: ['Multi-Layer Perceptrons', 'TensorFlow Core', 'Loss Optimization', 'Adam Optimizer'],
    verificationUrl: 'https://coursera.org/share/b1ec0513ece5ef9b796b4074ca71d152'
  },
  {
    title: 'IBM Data Privacy for Information Architecture',
    issuer: 'IBM',
    date: 'May 22, 2025',
    category: 'IBM',
    credentialId: 'IBM-DP-IA',
    skillsHighlighted: ['GDPR Rules', 'Data Masking', 'Privacy-by-Design', 'Information Access Control'],
    verificationUrl: 'https://coursera.org/share/766c254d8ccd4e7294676fc742822260'
  },
  {
    title: 'Introduction to Cybersecurity Essentials',
    issuer: 'IBM',
    date: 'May 22, 2025',
    category: 'IBM',
    credentialId: 'IBM-CYB-ESS',
    skillsHighlighted: ['Malware Classification', 'Encryption Standards', 'Firewall Management', 'Phishing Audits'],
    verificationUrl: 'https://coursera.org/share/faa458ef3204981691b691c382d1c5df'
  },
  // Google / Coursera / Others
  {
    title: 'Google IT Support Professional Certificate',
    issuer: 'Google (via Coursera Career Academy)',
    date: 'April 2026',
    category: 'Google',
    credentialId: 'GOOG-IT-938210',
    skillsHighlighted: ['DNS Setup', 'Remote Administration', 'Active Directory', 'Hardware Repairs', 'Customer Support']
  },
  {
    title: 'Technical Support Fundamentals',
    issuer: 'Google',
    date: 'May 14, 2026',
    category: 'Google',
    credentialId: 'GOOG-TSF-512',
    skillsHighlighted: ['Diagnostic Methodologies', 'Binary Arithmetic', 'Software Packages', 'File System Partition']
  },
  {
    title: 'Foundations: Data, Data, Everywhere',
    issuer: 'Google',
    date: 'May 14, 2026',
    category: 'Google',
    credentialId: 'GOOG-DDE-991',
    skillsHighlighted: ['Data Analysis Life Cycle', 'Spreadsheet Formulas', 'Data Visualization', 'Database Formats'],
    verificationUrl: 'https://coursera.org/share/b0ea199fa68c49b613c7a009c8e3aa51'
  },
  {
    title: 'Microsoft Office Specialist: Excel Associate',
    issuer: 'Microsoft',
    date: 'December 2025',
    category: 'Other',
    credentialId: 'MS-EXCEL-2025',
    skillsHighlighted: ['VLOOKUP & Pivot Tables', 'Data Filtering', 'Logical Formulas', 'Chart Generation']
  },
  {
    title: 'Using Video in Social Media Posts with Canva',
    issuer: 'Coursera Project Network',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'COUR-CANVA-VID',
    skillsHighlighted: ['Video Dimensions', 'Timeline Layouts', 'Engagement Design', 'Brand Uniformity'],
    verificationUrl: 'https://coursera.org/share/9cf75088f882787f9ee77290e70ee0bf'
  },
  {
    title: 'VR and 360 Video Production',
    issuer: 'Google AR & VR',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'GOOG-VR-360',
    skillsHighlighted: ['Spatial Camera Setup', '360 Post-Production', 'Panoramic Storytelling', 'VR UX Principles'],
    verificationUrl: 'https://coursera.org/share/85d322a06ec1c2efb987de472477b800'
  },
  {
    title: 'IoT Devices',
    issuer: 'University of Illinois Urbana-Champaign',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'UIUC-IOT-99',
    skillsHighlighted: ['Sensor Integration', 'Arduino Baselines', 'Connected Gateways', 'Digital Actuators'],
    verificationUrl: 'https://coursera.org/share/d6a0a93280528769fe9bc0cea4c949ef'
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'Duke University',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'DUKE-ML-492',
    skillsHighlighted: ['Linear Classifier', 'Feature Extraction', 'Model Splitting', 'Performance Metrics'],
    verificationUrl: 'https://coursera.org/share/b0d6da0da10e8682807483def4c31186'
  },
  {
    title: 'Create Training Videos with Powtoon',
    issuer: 'Coursera Project Network',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'COUR-POW-VID',
    skillsHighlighted: ['Aesthetic Animation', 'Audio Mixing', 'Storylining', 'Character Customization'],
    verificationUrl: 'https://coursera.org/share/0e8f9de437aca09e72daf193390838a9'
  },
  {
    title: 'Adobe Premiere Pro for Beginners: Quickstart Video-Editing',
    issuer: 'Coursera',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'COUR-ADOBE-PP',
    skillsHighlighted: ['NLE Editing Tools', 'Audio Limiting', 'Keyframe Properties', 'Render Compression Settings'],
    verificationUrl: 'https://coursera.org/share/cd9f1eea8917c53cfd2f3bc822bc6169'
  },
  {
    title: 'Copyright for Multimedia',
    issuer: 'Duke, Emory, & UNC Chapel Hill',
    date: 'May 20, 2025',
    category: 'Coursera',
    credentialId: 'COUR-COPYM-1',
    skillsHighlighted: ['Fair Use Guidelines', 'Creative Commons', 'Intellectual Property', 'Asset Licensing'],
    verificationUrl: 'https://coursera.org/share/4d1623d0667cc8fb1586ea1e9fb7d646'
  },
  {
    title: 'Data Entry: Capture and Upload Fast',
    issuer: 'Coursera',
    date: 'May 14, 2026',
    category: 'Coursera',
    credentialId: 'COUR-DATA-E',
    skillsHighlighted: ['Frictionless Logging', 'Error Validations', 'Keyboard Shortcuts', 'Speed Accuracy'],
    verificationUrl: 'https://coursera.org/share/005d8da37443586c21872b4ad729a80f'
  },
  {
    title: 'Practicing COVID-19 Preventive Measures in the Workplace',
    issuer: 'TESDA (Technical Education and Skills Development Authority)',
    date: 'October 6, 2025',
    category: 'TESDA',
    credentialId: 'TESDA-COV-231',
    skillsHighlighted: ['Risk Frameworks', 'Occupational Safety', 'Active Compliance Protocols', 'Sanitary Controls']
  },
  {
    title: 'Visual Graphic Design NC III (Partial Fulfillment)',
    issuer: 'TESDA (Technical Education and Skills Development Authority)',
    date: '2025',
    category: 'TESDA',
    credentialId: 'TESDA-VGD-2025',
    skillsHighlighted: ['Graphic Design', 'Visual Layout']
  }
];

export const achievements: Achievement[] = [
  {
    title: '3rd Place Hackathon & Pitching Competition',
    organization: 'Lyceum of the Philippines University – Batangas',
    date: '2024',
    description: 'Designed, engineered, and successfully pitched a tech-fueled digital concept mitigating community resource access blockades within a compressed 48-hour cycle, winning over executive panels.',
    badge: 'Hackathon Silver',
    category: 'hackathon'
  },
  {
    title: 'Academic Dean’s Lister Honor Roll',
    organization: 'Lyceum of the Philippines University – Batangas',
    date: 'Academic Year 2022–2023',
    description: 'Maintained excellent academic marks representing top-tier performance index status for the BSIT Department.',
    badge: 'Dean’s Lister',
    category: 'academic'
  },
  {
    title: 'Multi-Disciplinary Certification Milestone',
    organization: 'LPU-B & International Partners Academies',
    date: '2024–2026',
    description: 'Broke campus-level tracking milestones by verifying over 20+ specialized high-impact global credentials in Cloud Security, IBM, Cisco, and Creative Multimedia.',
    badge: 'Elite Certified',
    category: 'professional'
  }
];

export const seminars: Seminar[] = [
  {
    title: 'DATABIZ 2025: Data Science, Artificial Intelligence, and Business Analytics',
    organizer: 'LASCA Lipa City, Batangas',
    date: 'October 25, 2025'
  },
  {
    title: 'Career Path in Networking',
    organizer: 'Lyceum of the Philippines University – Batangas',
    date: 'October 11, 2025'
  },
  {
    title: 'Designing for Impact: A Seminar on User Experience',
    organizer: 'Lyceum of the Philippines University – Batangas',
    date: 'November 8, 2025'
  },
  {
    title: 'Cybersecurity Conference 2025',
    organizer: 'Holy Angel University, Angeles, Pampanga',
    date: 'October 3, 2025'
  },
  {
    title: 'Multimedia in Marketing and Branding',
    organizer: 'Lyceum of the Philippines University – Batangas',
    date: 'September 13, 2025'
  },
  {
    title: 'Code Smarter, Not Harder: Learn How AI and Copilot Can Revolutionize Your Coding Experience',
    organizer: 'Lyceum of the Philippines University – Batangas',
    date: 'November 8, 2024'
  }
];

export const projects: Project[] = [
  {
    id: 'proj_portfolio',
    title: 'Personal Portfolio Website — Joshz Raniel Marasigan',
    category: 'Full-Stack',
    description: 'A premium, production-ready personal portfolio built with HTML, CSS, Node.js, React, TypeScript, and MySQL. It features AI-assisted interactive components, 3D scroll animations, dark/light theming, a real-time Nexus AI assistant companion, live project modals, PDF CV download, and recruiter-adaptive role personalization, designed for online publication.',
    tags: ['HTML', 'CSS', 'Node.js', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
    outcomes: [
      'Built a multi-section responsive portfolio with 3D scroll-reveal animations.',
      'Integrated an AI Nexus Assistant that dynamically adapts its guidance based on scroll context.',
      'Implemented interactive project case study modals with image carousels and full lightbox preview.',
      'Deployed recruiter-adaptive Role Personalization system with live narrative switching.',
      'Added direct PDF CV download, credential verification links, and animated click ripple system.',
    ],
    challenges: 'Balancing premium design aesthetics with performance — ensuring Framer Motion scroll animations, large image assets, and real-time interactive state updates all remain smooth without layout shifts.',
    lessons: 'Mastered advanced full-stack integration patterns and production-grade Vite bundling with code splitting.',
    imageUrl: '/assets/images/regenerated_image_1780980751610.jpg',
    images: [
      '/assets/images/portfolio_hero.png',
    ],
    keyFeatures: [
      { icon: 'Sparkles', title: 'AI Nexus Assistant', description: 'Scroll-aware AI companion that provides contextual guidance, suggested actions, and navigation prompts based on which section you\'re viewing.' },
      { icon: 'Zap', title: '3D Scroll Animations', description: 'Framer Motion-powered scroll-reveal animations with 3D tilt, staggered card entrances, and spring-based morphing transitions.' },
      { icon: 'Moon', title: 'Dark / Light Theme', description: 'Full dark and light mode support with smooth CSS transitions, carefully tuned color palettes for both themes.' },
      { icon: 'Eye', title: 'Live Project Modals', description: 'Interactive project case study modals with image carousels, key feature grids, tech stack display, and external link actions.' },
      { icon: 'Layout', title: 'Role Personalization', description: 'Recruiter-adaptive layout that shifts the narrative and highlights based on selected focus role (Networking, AI, Multimedia, Support).' },
      { icon: 'Download', title: 'PDF CV & Credentials', description: 'One-click PDF resume download and direct credential verification links to Cisco, IBM, Google, and TESDA issuers.' },
    ],
    techStack: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Node.js', color: '#339933' },
      { name: 'MySQL', color: '#00758F' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind CSS', color: '#38BDF8' },
      { name: 'HTML5/CSS3', color: '#E34F26' },
    ],
    demoUrl: 'http://localhost:3000',
  },
  {
    id: 'proj_identify',
    title: 'iDENTify: Dental Patient Information and Treatment Tracker',
    category: 'Full-Stack',
    description: "Developed iDENTify designed to modernize the dentistry department's traditional paper-based Patient Information Record. This capstone project introduces a fully digitized and centralized web-based directory, allowing authorized clinical instructors, students, and supervisors to edit, manage, and audit clinical dental records with optimum precision and operational safety.",
    tags: ['Interactive Odontogram Chart', 'Patient Records Management', 'Clinical Workflows', 'Biometric Security', 'Academic Capstone', 'Centralized Directory'],
    outcomes: [
      'Successfully transitioned dental records from paper sheets to a robust centralized full-stack master server directory.',
      'Developed an interactive 32-teeth Odontogram dental chart to map active cavities, restorations, and treatments visually.',
      'Integrated active biometric captures supporting face-profile photo capture and hardware fingerprint registration.',
      'Enforced strict Role-Based Access Control (RBAC) with four custom user portals: Admin, Clinician, Clinical Instructor (CI), and Clinician on Duty (COD).'
    ],
    challenges: 'Designing a flexible, highly intuitive page layout and patient record pagination (PIR sheets) that maps seamlessly in real-time onto typical clinic workstations without overhead lag.',
    lessons: 'Adopted rigorous systems analysis matching ISO/IEC 25010 standards, and verified medical privacy and data protection policies with institutional supervisors.',
    imageUrl: '/assets/images/identify_capstone_1780889210858.png',
    images: [
      '/assets/images/identify_capstone_1780889210858.png',
      '/assets/images/regenerated_image_1780980944980.png'
    ],
    demoUrl: 'https://i-dent-ify.netlify.app/dashboard.html',
    githubUrl: 'https://github.com/joshzraniel/iDENTify'
  },
  {
    id: 'proj_adobe_xd',
    title: 'ADOBE XD DESIGN ACCOUNT',
    category: 'UI/UX Design',
    description: 'A fully functional Adobe XD design account featuring custom animations, original raw file logos, and comprehensive PSD integrations. Showcases interactive prototypes and dynamic UI/UX design capabilities.',
    tags: ['Adobe XD', 'UI/UX Design', 'Interactive Prototyping', 'Animations', 'Wireframing'],
    outcomes: [
      'Designed a complete app interface using Adobe XD with fully functional transitions and animations.',
      'Created original raw file logos and integrated PSD assets perfectly within the prototype.',
      'Developed a smooth user experience flow showcasing interactive elements.'
    ],
    challenges: 'Ensuring complex animations and transitions run smoothly within the prototyping environment.',
    lessons: 'Mastered Adobe XD auto-animate features and component states for high-fidelity prototyping.',
    imageUrl: '/assets/ADOBE XD/ADOBE PIC.png',
    images: [
      '/assets/ADOBE XD/ADOBE PIC.png'
    ]
  },
  {
    id: 'proj_brand_suite',
    title: 'The Coffee Shop & ID Design Corporate Brand Suite',
    category: 'Multimedia',
    description: "A comprehensive dual corporate-retail graphic design and brand implementation suite. Features 'The Coffee Shop 2024' premium textured vintage badge alongside the complete double-sided corporate ID design identity, utilizing unified botanical colors, precise alignment margins, scan-ready vector barcodes, and compliant layout guidelines.",
    tags: ['Branding Design', 'Visual Assets', 'Vector Geometry', 'Barcode Optimization', 'Print-Ready Specs', 'Retail Stamp Design'],
    outcomes: [
      'Engineered a double-sided high-fidelity layout for the ID design corporate identity card.',
      'Designed a circular text stamp brand for The Coffee Shop featuring custom 2024 retro design elements.',
      'Calibrated color spaces (CMYK guidelines) and contrast layers to align perfectly with industrial print requirements.'
    ],
    challenges: 'Harmonizing rustic textured retail labels with sharp, minimal corporate vector elements within a unified portfolio display.',
    lessons: 'Mastered margin bleeds, exact physical scale specs for ID printing, circle text constraints, and barcode generation standards.',
    imageUrl: '/assets/images/coffee_shop_logo_2024_1780890752439.png',
    images: [
      '/assets/images/coffee_shop_logo_2024_1780890752439.png',
      '/assets/images/corporate_id_card_front_1780890768328.png',
      '/assets/images/corporate_id_card_back_1780890785914.png',
      '/assets/images/regenerated_image_1780894643068.jpg'
    ]
  },
  {
    id: 'proj_packaging',
    title: 'Hair Care Packaging Collection',
    category: 'Multimedia',
    description: 'A premium multi-brand hair care product packaging design collection. Features custom dieline blueprints and high-fidelity 3D mockups for shampoo, conditioner, hair serum, hair mask, and hair oil lines — engineered with precise structural geometry, cohesive brand identities, and professional CMYK print specifications using Adobe Photoshop.',
    tags: ['Packaging Design', 'Dieline Blueprint', 'Adobe Photoshop', 'Hair Care Branding', '3D Hard Copy Mockup', 'CMYK Print Specs', 'Label Typography'],
    outcomes: [
      'Engineered physical cut-and-fold dieline layouts for five premium hair care product lines including shampoo, conditioner, hair serum, hair mask, and hair oil.',
      'Developed cohesive brand color systems and typographic identities across each hair care variant, from botanical greens and creamy whites to deep moisture-rich tones.',
      'Produced print-ready files in Adobe Photoshop adhering to industrial bleed margins, CMYK color profiles, and professional label printing constraints.'
    ],
    challenges: 'Maintaining visual brand consistency across multiple hair care product types while ensuring each variant has a distinct identity that communicates its specific benefit to the consumer.',
    lessons: 'Deepened expertise in structural dieline geometry for cylindrical and rectangular containers, label wrap calculations, and ink layer depth management specific to hair care product packaging.',
    imageUrl: '/assets/images/regenerated_image_1780893454974.jpg',
    images: [
      '/assets/images/regenerated_image_1780893454974.jpg',
      '/assets/images/packaging_design_1_1780889828047.png',
      '/assets/IMG_5718.jpg',
      '/assets/IMG_4289.JPG'
    ]
  },
  {
    id: 'proj_ecommerce_2022',
    title: 'Ecommerce Website A.Y 2022',
    category: 'Full-Stack',
    description: 'This is my first ecommerce website in my first year without help of an ai with visual studio. I didnt use any ai because ai doesnt exist and I do it scratch by sratch. Built using raw HTML, CSS and Visual Studio tools.',
    tags: ['HTML5', 'CSS3', 'Visual Studio', 'No-AI', 'E-Commerce'],
    outcomes: [
      'Built a fully functional e-commerce website layout from scratch without AI assistance.',
      'Designed custom clothing and coffee product catalogs with interactive hover effects.',
      'Implemented front-end checkout and booking facilities pages.'
    ],
    challenges: 'Coding the entire layout and styling from scratch using vanilla HTML and CSS before AI tools were available, ensuring responsiveness and aesthetic appeal.',
    lessons: 'Gained a deep, foundational understanding of web development, HTML structure, and CSS styling principles by manually coding every component.',
    imageUrl: '/assets/joshz website 2/background.jpg',
    images: [
      '/assets/joshz website 2/background.jpg',
      '/assets/joshz website 2/background2.jpg',
      '/assets/joshz website 2/coffe background.jpg',
      '/assets/joshz website 2/coffe wall.jpg',
      '/assets/joshz website 2/coffe.jpg'
    ],
    keyFeatures: [
      { icon: 'Code', title: 'Scratch Built', description: 'Developed entirely from scratch using Visual Studio without any AI assistance.' },
      { icon: 'Layout', title: 'Product Catalog', description: 'Showcases coffee and clothing products with price tags and add-to-cart buttons.' },
      { icon: 'FileText', title: 'About & Facilities', description: 'Includes detailed about us section, facilities information, and booking capabilities.' }
    ],
    techStack: [
      { name: 'HTML5', color: '#E34F26' },
      { name: 'CSS3', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' }
    ],
    demoUrl: '/assets/joshz website 2/log in/index.html'
  },
  {
    id: 'proj_market_freelancer',
    title: 'Market Freelancer',
    category: 'Freelance',
    description: 'I help clients sell or rent houses and any properties they want. I edit and enhance their listings to make them more appealing and drive more sales, earning a commission for every successful deal. I manage everything from creating attractive posts to communicating with potential buyers and tenants.',
    tags: ['Real Estate', 'Freelance', 'Facebook Marketplace', 'Marketing', 'Sales'],
    outcomes: [
      'Helped multiple clients successfully sell and rent out properties through optimized online listings.',
      'Edited and enhanced property photos and descriptions to attract more buyers and tenants.',
      'Managed client communications and inquiries to convert leads into successful transactions.'
    ],
    challenges: 'Crafting compelling and trustworthy listings that stand out in competitive marketplaces while managing multiple clients simultaneously.',
    lessons: 'Developed strong real estate marketing skills, negotiation techniques, and an understanding of what drives buyer and renter decisions online.',
    imageUrl: '/assets/TITA ANLYN RENT/1.png',
    images: [
      '/assets/TITA ANLYN RENT/1.png'
    ]
  }
];

export const services: Service[] = [
  {
    id: 'srv_freelancer',
    title: 'Freelancer (Multi-Task & General Support)',
    category: 'Consulting & AI',
    description: 'I can do multi work, just tell me what kind of jobs you will ask for. Ready to adapt to any technical, design, or administrative project.',
    features: [
      'Multi-disciplinary task execution',
      'Extremely flexible project timelines',
      'Open-minded task collaboration',
      'Client-tailored administrative work'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'srv_support',
    title: 'IT Support and Maintenance',
    category: 'IT & Infrastructure',
    description: 'Enterprise and client-level diagnostic setups, operating system installations, work station servicing, and proactive networks diagnostics.',
    features: [
      'Precision system hardware diagnostics',
      'Reliable OS installations & workstation tunes',
      'Stable devices setup for office operations',
      'Comprehensive maintenance checklists'
    ],
    iconName: 'Cpu'
  },
  {
    id: 'srv_tech',
    title: 'IT Technician',
    category: 'IT & Infrastructure',
    description: 'I can manage technical capability, more related on technology maintenance, maintain, troubleshoot, and other more.',
    features: [
      'Detailed component troubleshooting',
      'System and network routing maintenance',
      'Proactive diagnostics & hardware fixes',
      'Fast tech solution debugging'
    ],
    iconName: 'Cpu'
  },
  {
    id: 'srv_creative',
    title: 'UI/UX Design, Video Editing & Designing',
    category: 'Creative & Design',
    description: 'Figma interactive prototypes, multi-layer video sequences in Adobe Premiere, corporate posters, logos, and custom structural dielines.',
    features: [
      'Figma wireframing and graphic asset design',
      'Adobe Premiere Pro quickstart video editing',
      'Creative customized logos & sales posters',
      'Interactive website layouts'
    ],
    iconName: 'Figma'
  },
  {
    id: 'srv_ai',
    title: 'AI Integration & Prompt Engineering',
    category: 'Consulting & AI',
    description: 'AI integration and prompt engineering. Can also make a full-stack webpage and other OpenAI projects, collaborating with own knowledge and unique creativity.',
    features: [
      'Custom styled system prompts & rules',
      'OpenAI full-stack webpage layouts',
      'Productive helper workflows setup',
      'Self-driven prompt diagnostics'
    ],
    iconName: 'Bot'
  },
  {
    id: 'srv_db',
    title: 'Intelligent Database Engineering',
    category: 'IT & Infrastructure',
    description: 'MySQL database design, proper relational modeling (3NF), queries performance optimization, and transactional safety configurations.',
    features: [
      'Relational modeling & diagram designs',
      'Normalized entity structures (3NF)',
      'Optimized SQL lookup statements',
      'Automated scheduling procedures'
    ],
    iconName: 'Database'
  },
  {
    id: 'srv_marketing',
    title: 'Marketing Strategy / Sales & Admin',
    category: 'Creative & Design',
    description: 'Strategic market research, compelling advertising copywriting, social media management, and online lead generation.',
    features: [
      'High-converting real estate property copies',
      'Facebook Business Suite & shop accounts lead nurturing',
      'Search tags & descriptive keyword optimization',
      'Digital store front end-to-end administration'
    ],
    iconName: 'Network'
  }
];

export const educationHistory = [
  {
    degree: 'Bachelor of Science in Information Technology',
    specialization: 'Specialization in Multimedia Technology',
    institution: 'Lyceum of the Philippines University – Batangas',
    location: 'Capitol Site, Batangas City',
    period: '2022 – 2026',
    highlights: [
      'Networking, Design, Software Development, Hardware and other more about multimedia and also about information technology.',
      '3rd Place, Hackathon/Pitching Competition 2024',
      'Dean’s Lister A.Y. 2022-2023'
    ]
  },
  {
    degree: 'Senior High School Graduate',
    specialization: 'STEM Track with Specialization in Maritime',
    institution: 'Lyceum of the Philippines University – Batangas',
    location: 'Capitol Site, Batangas City',
    period: '2020 – 2022',
    highlights: [
      'Maintained solid grades across fundamental science, maritime navigation theories, computer math, and technical systems labs.',
      'Graduated Top 6 with Honors, Academic Year 2020-2022'
    ]
  },
  {
    degree: 'Junior High School Graduate',
    institution: 'Batangas Christian School',
    location: 'Dejoya Compound, Alangilan, Batangas City',
    period: '2016 – 2020',
    highlights: []
  }
];

export const techEcosystem = [
  { name: 'Cisco Routing/Switching', category: 'network', proficiency: 92 },
  { name: 'Cisco Packet Tracer', category: 'network', proficiency: 95 },
  { name: 'Cisco IOS & Terminal', category: 'network', proficiency: 88 },
  { name: 'Static & OSPF Routing', category: 'network', proficiency: 90 },
  { name: 'Enterprise Subnetting (VLSM)', category: 'network', proficiency: 94 },
  { name: 'Deco Mesh & WLAN Systems', category: 'network', proficiency: 86 },
  
  { name: 'MySQL Database Engine', category: 'data', proficiency: 87 },
  { name: 'Relational Modelling (3NF)', category: 'data', proficiency: 89 },
  { name: 'SQL Query Syntax', category: 'data', proficiency: 84 },
  { name: 'Spreadsheet Formulas (Excel)', category: 'data', proficiency: 95 },
  { name: 'Data Visualization Metrics', category: 'data', proficiency: 85 },
  
  { name: 'Keras Neural Library', category: 'ai', proficiency: 82 },
  { name: 'TensorFlow Core Layers', category: 'ai', proficiency: 80 },
  { name: 'Structured Prompt Frameworks', category: 'ai', proficiency: 91 },
  { name: 'Cognitive Computing Basics', category: 'ai', proficiency: 85 },
  { name: 'Cybersecurity Threat Shielding', category: 'ai', proficiency: 84 },
  
  { name: 'Adobe Premiere Pro', category: 'media', proficiency: 95 },
  { name: 'Canva Pro Designs', category: 'media', proficiency: 96 },
  { name: 'Powtoon Video Asset Creator', category: 'media', proficiency: 88 },
  { name: 'Figma Interaction States', category: 'media', proficiency: 92 },
  { name: 'Vector Asset Creation Framework', category: 'media', proficiency: 90 },
  { name: 'VR Panoramic Projection', category: 'media', proficiency: 83 },
  
  { name: 'Windows Operating Hosts', category: 'sys', proficiency: 96 },
  { name: 'Linux Terminal (NDG/Bash)', category: 'sys', proficiency: 85 },
  { name: 'Active Directory Admin', category: 'sys', proficiency: 80 },
  { name: 'Remote Control RDP/VNC', category: 'sys', proficiency: 92 },
  { name: 'System Hardware Assembly', category: 'sys', proficiency: 94 }
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'internship' | 'employment';
  description: string;
  highlights: string[];
  skillsGained: string[];
}

export interface Skill {
  name: string;
  rating: number; // 1-100
  level: string; // 'Expert' | 'Advanced' | 'Intermediate'
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: Skill[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  category: 'Cisco' | 'IBM' | 'Google' | 'Coursera' | 'TESDA' | 'Other';
  credentialId?: string;
  skillsHighlighted: string[];
  verificationUrl?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  badge: string;
  category: 'academic' | 'hackathon' | 'professional';
}

export interface Seminar {
  title: string;
  organizer: string;
  date: string;
  location?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'IT' | 'Networking' | 'Database' | 'Multimedia' | 'UI/UX' | 'AI' | 'Freelance' | 'Full-Stack';
  description: string;
  tags: string[];
  outcomes: string[];
  challenges: string;
  lessons: string;
  imageUrl: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  keyFeatures?: { icon: string; title: string; description: string }[];
  techStack?: { name: string; color: string }[];
}

export interface Service {
  id: string;
  title: string;
  category: 'IT & Infrastructure' | 'Creative & Design' | 'Consulting & AI';
  description: string;
  features: string[];
  basePriceRange?: string;
  iconName: string;
}

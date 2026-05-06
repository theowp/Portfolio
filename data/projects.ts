export type ProjectId =
  | "interpol"
  | "carbonBalance"
  | "brandsistersBi"
  | "dustAgent";

/** Couleur du halo au survol (purement visuel). */
export type ProjectGlow = "ocean" | "emerald" | "amber" | "violet";

export type ProjectMeta = {
  id: ProjectId;
  stack: string[];
  link?: string;
  glow: ProjectGlow;
};

export const projectsMeta: ProjectMeta[] = [
  {
    id: "interpol",
    stack: ["Python", "BeautifulSoup", "Pandas", "SQL", "Data Viz"],
    link: "https://www.canva.com/design/DAG2_cg2RIQ/1HPsVikjcUzIKAMuoWaw0A/view",
    glow: "ocean",
  },
  {
    id: "carbonBalance",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "N8N",
      "Data Pipeline",
    ],
    link: "https://www.canva.com/design/DAG4q1S1IKs/4AwIKZ_u1WI1nWWnm4bhYQ/view",
    glow: "emerald",
  },
  {
    id: "brandsistersBi",
    stack: ["Power BI", "SQL", "Python", "Dataiku"],
    glow: "amber",
  },
  {
    id: "dustAgent",
    stack: ["DUST", "GPT-4", "API REST"],
    glow: "violet",
  },
];

export const glowClass: Record<
  ProjectGlow,
  string
> = {
  ocean:
    "hover:shadow-[0_0_48px_rgba(56,189,248,0.22)] hover:border-cyan-500/25",
  emerald:
    "hover:shadow-[0_0_48px_rgba(52,211,153,0.22)] hover:border-emerald-400/25",
  amber:
    "hover:shadow-[0_0_46px_rgba(201,168,76,0.38)] hover:border-gold/40",
  violet:
    "hover:shadow-[0_0_48px_rgba(167,139,250,0.26)] hover:border-violet-400/25",
};

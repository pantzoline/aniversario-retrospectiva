export type SlideType = "intro" | "stat" | "quiz" | "memory" | "reveal" | "finale";
export type QuizCategory = "music" | "barbie" | "architecture";

export interface SlideBase {
  id: number;
  type: SlideType;
  bgClass: string;
  gradientClass: string;
  accentColor: string;
}

export interface StatSlide extends SlideBase {
  type: "stat";
  preTitle: string;
  bigNumber: string;
  title: string;
  subtitle: string;
}

export interface QuizSlide extends SlideBase {
  type: "quiz";
  category: QuizCategory;
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  happySticker?: string;
  sadSticker?: string;
}

export interface MemorySlide extends SlideBase {
  type: "memory";
  title: string;
  text: string;
}

export interface RevealSlide extends SlideBase {
  type: "reveal";
  preTitle: string;
  lines: string[];
}

export interface FinaleSlide extends SlideBase {
  type: "finale";
}

export type GameSlide = StatSlide | QuizSlide | MemorySlide | RevealSlide | FinaleSlide;

// ═══════════════════════════════════════════════════════════════
// 21 SLIDES — Uma para cada ano da Manu
// Dados reais do Obsidian vault (Banco_De_Dados)
// ═══════════════════════════════════════════════════════════════

export const SLIDES: GameSlide[] = [
  // ── 1. STAT: Abertura ──
  {
    id: 1,
    type: "stat",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    preTitle: "Hoje voce completa",
    bigNumber: "21",
    title: "anos de pura magia",
    subtitle: "E cada um deles conta uma historia incrivel. Vamos reviver?",
  },
  // ── 2. QUIZ MUSIC: State of Grace ──
  {
    id: 2,
    type: "quiz",
    bgClass: "bg-wrapped-purple",
    gradientClass: "text-gradient-purple",
    accentColor: "#a855f7",
    category: "music",
    categoryLabel: "Musica",
    question: "Qual e a musica? Dica: Taylor Swift — Album Red",
    options: ["State of Grace", "Red", "All Too Well", "Treacherous"],
    correctIndex: 0,
  },
  // ── 3. STAT: Dedicatória ──
  {
    id: 3,
    type: "stat",
    bgClass: "bg-wrapped-green",
    gradientClass: "text-gradient-green",
    accentColor: "#1ed760",
    preTitle: "Te dedico todos os meus",
    bigNumber: "1.000+",
    title: "pensamentos a ti",
    subtitle: "\"Pontos de exclamação que eu não sei usar, se eu soubesse falar, diria que eu te amo.\" — Jovem Dionísio",
  },
  // ── 4. QUIZ BARBIE: Castelo de Diamantes ──
  {
    id: 4,
    type: "quiz",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    category: "barbie",
    categoryLabel: "Barbie",
    question: "Em 'O Castelo de Diamantes', qual e o nome das duas amigas protagonistas?",
    options: ["Liana e Alexa", "Anneliese e Erika", "Blair e Delancy", "Corinne e Viveca"],
    correctIndex: 0,
  },
  // ── 5. MEMORY: Primeira Viagem ──
  {
    id: 5,
    type: "memory",
    bgClass: "bg-wrapped-gold",
    gradientClass: "text-gradient-gold",
    accentColor: "#fbbf24",
    title: "Nossa Primeira Viagem",
    text: "Lembra da primeira vez que viajamos juntos? Cada detalhe ficou gravado no meu coracao. Foi ali que eu soube que tudo mudou.",
  },
  // ── 6. QUIZ ARCH: Oscar Niemeyer ──
  {
    id: 6,
    type: "quiz",
    bgClass: "bg-wrapped-cyan",
    gradientClass: "text-gradient-cyan",
    accentColor: "#22d3ee",
    category: "architecture",
    categoryLabel: "Arquitetura",
    question: "Qual arquiteto brasileiro desenhou o Museu de Arte Contemporanea (MAC) em Niteroi?",
    options: ["Lina Bo Bardi", "Oscar Niemeyer", "Paulo Mendes da Rocha", "Vilanova Artigas"],
    correctIndex: 1,
  },
  // ── 7. REVEAL ──
  {
    id: 7,
    type: "reveal",
    bgClass: "bg-wrapped-purple",
    gradientClass: "text-gradient-purple",
    accentColor: "#a855f7",
    preTitle: "Se a Manu fosse um estilo arquitetonico, seria",
    lines: ["Art Deco", "Glamouroso"],
  },
  // ── 8. QUIZ MUSIC: Long Live ──
  {
    id: 8,
    type: "quiz",
    bgClass: "bg-wrapped-green",
    gradientClass: "text-gradient-green",
    accentColor: "#1ed760",
    category: "music",
    categoryLabel: "Musica",
    question: "Qual e a musica? Dica: Taylor Swift — Album Speak Now",
    options: ["Sparks Fly", "Long Live", "Mine", "Enchanted"],
    correctIndex: 1,
  },
  // ── 9. STAT: Risadas ──
  {
    id: 9,
    type: "stat",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    preTitle: "Estimativa de risadas juntos",
    bigNumber: "∞",
    title: "Long live all the magic we made",
    subtitle: '"I had the time of my life fighting dragons with you."',
  },
  // ── 10. QUIZ BARBIE: Tres Mosqueteiras ──
  {
    id: 10,
    type: "quiz",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    category: "barbie",
    categoryLabel: "Barbie",
    question: "Quantas mosqueteiras a Barbie se junta em 'As Tres Mosqueteiras'?",
    options: ["Duas", "Tres", "Quatro", "Cinco"],
    correctIndex: 1,
  },
  // ── 11. MEMORY: Dia Engraçado ──
  {
    id: 11,
    type: "memory",
    bgClass: "bg-wrapped-gold",
    gradientClass: "text-gradient-gold",
    accentColor: "#fbbf24",
    title: "O Dia Mais Engracado",
    text: "O dia que rimos ate a barriga doer. Um momento que so nos dois entendemos. Guardo esse sorriso pra sempre.",
  },
  // ── 12. QUIZ MUSIC: Te Vivo ──
  {
    id: 12,
    type: "quiz",
    bgClass: "bg-wrapped-purple",
    gradientClass: "text-gradient-purple",
    accentColor: "#a855f7",
    category: "music",
    categoryLabel: "Musica",
    question: "Qual e a musica? Dica: Luan Santana",
    options: ["Tudo Que Voce Quiser", "Chuva de Arroz", "Te Vivo", "Escreve Ai"],
    correctIndex: 2,
  },
  // ── 13. QUIZ FUTEBOL: Athletico Paranaense ──
  {
    id: 13,
    type: "quiz",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#e4002b",
    category: "barbie" as QuizCategory,
    categoryLabel: "Furacão",
    question: "Athletico x Mirassol — 30/05 na Arena da Baixada! Qual vai ser o placar?",
    options: ["Athletico 1 x 0", "Athletico 2 x 1", "Athletico 3 x 0", "Empate 1 x 1"],
    correctIndex: 2,
  },
  // ── 14. QUIZ ARCH: Gotico ──
  {
    id: 14,
    type: "quiz",
    bgClass: "bg-wrapped-cyan",
    gradientClass: "text-gradient-cyan",
    accentColor: "#22d3ee",
    category: "architecture",
    categoryLabel: "Arquitetura",
    question: "O estilo gotico e conhecido por qual caracteristica arquitetonica principal?",
    options: ["Arcos de volta perfeita", "Arcos ogivais (apontados)", "Colunas doricas", "Cupulas arredondadas"],
    correctIndex: 1,
  },
  // ── 15. QUIZ BARBIE: Rapunzel ──
  {
    id: 15,
    type: "quiz",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    category: "barbie",
    categoryLabel: "Barbie",
    question: "Qual e o dom especial da Rapunzel no filme da Barbie?",
    options: ["Cantar", "Costurar", "Pintar", "Dancar"],
    correctIndex: 2,
  },
  // ── 16. STAT: Rainha ──
  {
    id: 16,
    type: "stat",
    bgClass: "bg-wrapped-yellow",
    gradientClass: "text-gradient-yellow",
    accentColor: "#fbbf24",
    preTitle: "Análise de conhecimento concluída",
    bigNumber: "Top 5%",
    title: "Especialista em Barbie",
    subtitle: "Hm? Parece que temos uma especialista por aqui. Você está oficialmente entre os 5% maiores fãs da Barbie no mundo!",
  },
  // ── 17. QUIZ MUSIC: A Rua ──
  {
    id: 17,
    type: "quiz",
    bgClass: "bg-wrapped-purple",
    gradientClass: "text-gradient-purple",
    accentColor: "#a855f7",
    category: "music",
    categoryLabel: "Musica",
    question: "Qual e a musica? Dica: Jao — Album Lobos",
    options: ["Idiota", "Vou Morrer Sozinho", "Me Beija Com Raiva", "A Rua"],
    correctIndex: 3,
  },
  // ── 18. QUIZ ARCH: Croqui ──
  {
    id: 18,
    type: "quiz",
    bgClass: "bg-wrapped-cyan",
    gradientClass: "text-gradient-cyan",
    accentColor: "#22d3ee",
    category: "architecture",
    categoryLabel: "Arquitetura",
    question: "O que e o 'Croqui' na arquitetura?",
    options: ["O orcamento da obra", "O terreno vazio", "Um esboco rapido a mao livre", "O telhado do projeto"],
    correctIndex: 2,
  },
  // ── 19. QUIZ BARBIE: Princesa e Plebeia ──
  {
    id: 19,
    type: "quiz",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    category: "barbie",
    categoryLabel: "Barbie",
    question: "Em 'A Princesa e a Plebeia', como Anneliese e Erika descobrem que sao identicas?",
    options: [
      "Elas tem o mesmo cabelo",
      "Elas tem a mesma marca de nascenca",
      "Elas cantam a mesma musica",
      "Elas encontram um espelho magico",
    ],
    correctIndex: 1,
  },
  // ── 20. STAT: Amor ──
  {
    id: 20,
    type: "stat",
    bgClass: "bg-wrapped-pink",
    gradientClass: "text-gradient-pink",
    accentColor: "#ff4db8",
    preTitle: "Nivel de amor dedicado a voce",
    bigNumber: "∞",
    title: "Absolutamente imensuravel",
    subtitle: "Nenhuma unidade de medida consegue calcular.",
  },
  // ── 21. FINALE ──
  {
    id: 21,
    type: "finale",
    bgClass: "bg-wrapped-finale",
    gradientClass: "text-gradient-finale",
    accentColor: "#fbbf24",
  },
];

// ═══ Type guards ═══
export function isQuizSlide(slide: GameSlide): slide is QuizSlide {
  return slide.type === "quiz";
}
export function isStatSlide(slide: GameSlide): slide is StatSlide {
  return slide.type === "stat";
}
export function isMemorySlide(slide: GameSlide): slide is MemorySlide {
  return slide.type === "memory";
}
export function isRevealSlide(slide: GameSlide): slide is RevealSlide {
  return slide.type === "reveal";
}
export function isFinaleSlide(slide: GameSlide): slide is FinaleSlide {
  return slide.type === "finale";
}

export const PLAYLIST = [
  { 
    id: "state_of_grace",
    title: "State of Grace", 
    artist: "Taylor Swift", 
    color: "#a855f7", 
    spotifyId: "6lzc0Al0zfZOIFsFvBS1ki",
    audioUrl: "/state_of_grace.mpeg",
    startTime: 37,
    lyrics: [
      { time: 15, text: "I'm walking fast through the traffic lights" },
      { time: 19, text: "Busy streets and busy lives" },
      { time: 23, text: "And all we know is touch and go" },
      { time: 27, text: "We are alone with our changing minds" },
      { time: 32, text: "We fall in love 'til it hurts or bleeds, or fades in time" },
      { time: 39, text: "And I never saw you coming" },
      { time: 43, text: "And I'll never be the same" }
    ]
  },
  { 
    id: "long_live",
    title: "Long Live", 
    artist: "Taylor Swift", 
    color: "#1ed760", 
    spotifyId: "1LYJqhclJHbnXhVMhQMHKB",
    audioUrl: "/long_live.mpeg",
    startTime: 17,
    lyrics: [
      { time: 13, text: "I said remember this moment" },
      { time: 17, text: "In the back of my mind" },
      { time: 20, text: "The time we stood with our shaking hands" },
      { time: 24, text: "The crowds in stands went wild" },
      { time: 27, text: "We were the kings and the queens" },
      { time: 30, text: "And they read off our names" },
      { time: 33, text: "The night you danced like you knew our lives" },
      { time: 37, text: "Would never be the same" }
    ]
  },
  { 
    id: "te_vivo",
    title: "Te Vivo", 
    artist: "Luan Santana", 
    color: "#ff4db8", 
    spotifyId: "2j5eag2AXHgL8v3muA3VDT",
    audioUrl: "/te_vivo.mpeg",
    startTime: 22,
    lyrics: [
      { time: 10, text: "Quando me sinto só" },
      { time: 14, text: "Te faço mais presente" },
      { time: 18, text: "Eu fecho os meus olhos" },
      { time: 22, text: "E enxergo a gente" },
      { time: 26, text: "Em questão de segundos" },
      { time: 30, text: "Voo pra outro mundo" },
      { time: 34, text: "Outra constelação" },
      { time: 38, text: "Não dá pra explicar" },
      { time: 42, text: "Ao ver você chegar" }
    ]
  },
  { 
    id: "a_rua",
    title: "A Rua", 
    artist: "Jao", 
    color: "#22d3ee", 
    spotifyId: "0Y6Jt8Z13J17y1K9zL5w7Q",
    audioUrl: "/a_rua.mpeg",
    startTime: 10,
    lyrics: [
      { time: 12, text: "Eu não sei se você" },
      { time: 16, text: "Ainda pensa em mim" },
      { time: 20, text: "Como eu penso em você" },
      { time: 24, text: "Antes de dormir" },
      { time: 28, text: "Eu deixei a luz acesa" },
      { time: 32, text: "Caso você queira voltar" },
      { time: 36, text: "Pra me ver, pra me ter" }
    ]
  },
  {
    id: "barbie",
    title: "Mensagem Surpresa",
    artist: "Liana e Alexa (Castelo de Diamantes)",
    color: "#ff4db8",
    audioUrl: "/audio_barbie.mpeg",
    lyrics: [
      { time: 2, text: "Feliz 21 anos, Manu!" },
      { time: 6, text: "Que o seu dia seja repleto de luz" },
      { time: 10, text: "Magia, coragem e muitos sonhos..." },
      { time: 14, text: "Nós amamos você!" }
    ]
  }
];

export type Product={id:string;title:string;description:string;category:string;price:string;rating:string;reviews:number;image:string;seller:string;source:string;badge?:string};

export const categories=[
  {name:"AI Systems",count:"340+",icon:"/images/categories/ai.svg",description:"Autonomous agents, RAG workflows, and LLM fine-tuning."},
  {name:"SaaS Templates",count:"850+",icon:"/images/categories/templates.svg",description:"Next.js, React, and full-stack boilerplates with DB & Auth."},
  {name:"Web3 & Crypto",count:"120+",icon:"/images/categories/business.svg",description:"Smart contracts, dApp UI kits, and Web3 authentication."},
  {name:"UI/UX Design",count:"1,760+",icon:"/images/categories/design.svg",description:"High-conversion UI kits, dashboards, and Figma components."},
  {name:"Backend APIs",count:"450+",icon:"/images/categories/courses.svg",description:"Microservices, gRPC templates, and event-driven architectures."},
  {name:"Data Pipelines",count:"210+",icon:"/images/categories/ebook.svg",description:"ETL scripts, real-time analytics, and data automation."}
];

export const products:Product[]=[
  {id:"1",title:"Next.js SaaS Boilerplate",description:"Complete full-stack template with Drizzle ORM, Stripe, Auth, and Tailwind.",category:"SaaS Templates",price:"$149",rating:"4.9",reviews:128,image:"/images/products/saas-ui-kit.svg",seller:"Devi Systems",source:"Lemon Squeezy",badge:"Trending"},
  {id:"2",title:"RAG Workflow Enterprise Template",description:"Vector search integration with Pinecone and LangChain for production use.",category:"AI Systems",price:"$79",rating:"4.8",reviews:94,image:"/images/products/ai-content-vault.svg",seller:"AI Architects",source:"Gumroad",badge:"Popular"},
  {id:"3",title:"Web3 Auth & Token Portal",description:"React components for decentralized login and token-based ecosystems.",category:"Web3 & Crypto",price:"$49",rating:"5.0",reviews:67,image:"/images/products/lead-generation.svg",seller:"BlockForge",source:"Payhip"},
  {id:"4",title:"FastAPI Microservices Kit",description:"Event-driven backend architectures using Kafka and Python FastAPI.",category:"Backend APIs",price:"$55",rating:"4.7",reviews:51,image:"/images/products/instagram-growth.svg",seller:"Devi Systems",source:"Gumroad"},
  {id:"5",title:"Conversion-Focused Dashboard UI",description:"Sleek dark mode dashboards, glassmorphism elements, and data charts.",category:"UI/UX Design",price:"$39",rating:"4.9",reviews:203,image:"/images/products/youtube-thumbnail.svg",seller:"Pixel Foundry",source:"Lemon Squeezy"},
  {id:"6",title:"Real-time ETL Analytics Pipeline",description:"Self-optimizing data pipelines for scalable business analytics.",category:"Data Pipelines",price:"$99",rating:"4.8",reviews:76,image:"/images/products/creator-playbook.svg",seller:"DataOps Pro",source:"Lemon Squeezy"}
];

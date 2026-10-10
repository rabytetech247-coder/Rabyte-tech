import PageShell from "@/components/PageShell";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Proven Strategies to Market Your Digital Products",
      excerpt: "Learn how to drive consistent traffic to your listings using organic social media, SEO, and targeted content marketing.",
      tag: "Marketing",
      date: "Oct 12, 2026",
      readTime: "8 min read",
      author: { name: "Devi", initials: "D" },
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      slug: "10-proven-marketing-strategies"
    },
    {
      id: 2,
      title: "How to Price Your E-books and Templates for Maximum Revenue",
      excerpt: "Discover the psychology behind pricing tiers, discount strategies, and how to find the sweet spot for your digital downloads.",
      tag: "Sales Strategy",
      date: "Oct 05, 2026",
      readTime: "6 min read",
      author: { name: "Alex K.", initials: "AK" },
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
      slug: "how-to-price-digital-products"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Building a Sales Funnel for Creators",
      excerpt: "Step-by-step guide on creating high-converting landing pages, lead magnets, and email sequences that turn followers into buyers.",
      tag: "Funnels",
      date: "Sep 28, 2026",
      readTime: "12 min read",
      author: { name: "Sarah M.", initials: "SM" },
      imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800",
      slug: "ultimate-sales-funnel-guide"
    },
    {
      id: 4,
      title: "Gumroad vs Lemon Squeezy: Which Platform is Right for You?",
      excerpt: "A deep dive comparison of fees, features, merchant of record benefits, and payouts for the top digital product platforms.",
      tag: "Platforms",
      date: "Sep 20, 2026",
      readTime: "10 min read",
      author: { name: "Devi", initials: "D" },
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
      slug: "gumroad-vs-lemon-squeezy"
    },
    {
      id: 5,
      title: "Turning Your Expertise into a Profitable Digital Course",
      excerpt: "Stop trading time for money. Learn how to outline, record, and launch a video course that generates passive income.",
      tag: "Creator Economy",
      date: "Sep 15, 2026",
      readTime: "9 min read",
      author: { name: "Elena R.", initials: "ER" },
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      slug: "create-profitable-digital-course"
    },
    {
      id: 6,
      title: "How to Use Email Marketing to Drive Digital Product Sales",
      excerpt: "Why your email list is your most valuable asset, and the exact launch sequence templates used by top digital creators.",
      tag: "Email Marketing",
      date: "Sep 02, 2026",
      readTime: "7 min read",
      author: { name: "Devi", initials: "D" },
      imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c638c9c6c3?auto=format&fit=crop&q=80&w=800",
      slug: "email-marketing-for-sales"
    }
  ];

  return (
    <PageShell>
      <div className="blog-page">
        <section className="blog-header fade-in-up">
          <div className="container">
            <span className="blog-header-badge">RESOURCES & INSIGHTS</span>
            <h1>Rabyte-Tech Blog</h1>
            <p>Expert guides, marketing strategies, and creator growth tactics for selling digital products.</p>
          </div>
        </section>

        <section className="container">
          <div className="blog-grid">
            {posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="blog-card fade-in-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="blog-card-image">
                  <img src={post.imageUrl} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-tag">{post.tag}</span>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-card-footer">
                    <div className="blog-author">
                      <div className="blog-author-avatar">{post.author.initials}</div>
                      <span className="blog-author-name">{post.author.name}</span>
                    </div>
                    <span className="blog-read-more">
                      Read <Icon name="arrow" size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
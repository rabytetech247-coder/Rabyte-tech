import PageShell from "@/components/PageShell";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = 'edge';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  return (
    <PageShell>
      <section className="dashboard">
        <div className="container dashboard-grid">
          <aside className="side">
            <b>Seller Dashboard</b>
            <a href="/dashboard">Overview</a>
            <a href="/dashboard/products">Products</a>
            <a href="/dashboard/products/new">Add product</a>
            <a href="/dashboard/analytics">Analytics</a>
            <a href="/dashboard/reviews">Reviews</a>
            <a href="/dashboard/blog">Blog</a>
            <a href="/dashboard/profile">Profile / Storefront</a>
            <form action="/api/logout" method="POST">
              <button type="submit" style={{ background: "none", border: "none", color: "#656c76", padding: 8, fontSize: 11, cursor: "pointer", marginTop: 10 }}>Log out</button>
            </form>
          </aside>
          {children}
        </div>
      </section>
    </PageShell>
  );
}

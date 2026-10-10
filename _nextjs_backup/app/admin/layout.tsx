import PageShell from "@/components/PageShell";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = 'edge';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
  if (user.role !== 'admin' && user.role !== 'superadmin') return redirect("/dashboard");

  return (
    <PageShell>
      <section className="dashboard">
        <div className="container dashboard-grid">
          <aside className="side admin">
            <b>Admin Console</b>
            <a href="/admin/panel">Overview</a>
            <a href="/admin/submissions">Submissions</a>
            <a href="/admin/products">Products</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/categories">Categories</a>
            <a href="/admin/reviews">Reviews</a>
            <a href="/admin/featured">Featured</a>
            <a href="/admin/advertising">Advertising</a>
            <a href="/admin/blog">Blog</a>
            <a href="/admin/reports">Reports</a>
            <a href="/admin/emails">Emails</a>
            <a href="/admin/analytics">Analytics</a>
            <a href="/admin/settings">Settings</a>
          </aside>
          {children}
        </div>
      </section>
    </PageShell>
  );
}

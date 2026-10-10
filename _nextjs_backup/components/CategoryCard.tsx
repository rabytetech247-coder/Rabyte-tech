import Link from "next/link";
import Icon from "./Icon";

export default function CategoryCard({ c }: { c: any }) {
  return (
    <Link href={"/categories/" + c.name.toLowerCase().replaceAll(" ", "-")} className="category-card">
      <img src={c.icon} alt={c.name} />
      <div>
        <b>{c.name}</b>
        <small>{c.count} products</small>
      </div>
      <Icon name="arrowRight" size={16} />
    </Link>
  );
}
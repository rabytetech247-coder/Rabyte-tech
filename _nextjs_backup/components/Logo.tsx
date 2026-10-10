import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="brand" style={{ display: "flex", alignItems: "center" }}>
      <img src="/logo.png" alt="Rabyte-Tech" style={{ height: "40px", width: "auto" }} />
    </Link>
  );
}
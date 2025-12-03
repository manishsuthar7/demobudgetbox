// app/components/Header.tsx (or wherever your nav is)
import Link from "next/link";
export default function Header() {
  return (
    <header>
      <Link href="/dashboard">Budget</Link>
    </header>
  );
}

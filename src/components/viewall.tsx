import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ViewAll({
  href = "/archive",
  label = "View all",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <section className="p-1.5">
      <Button
        variant="ghost"
        className="h-auto w-full rounded-lg bg-[#161616] py-12 font-serif text-5xl font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black sm:py-16 sm:text-6xl"
      >
        <Link href={href}>{label}</Link>
      </Button>
    </section>
  );
}

export default ViewAll;
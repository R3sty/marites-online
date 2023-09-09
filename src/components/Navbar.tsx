import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">Marites Online</p>
        </Link>

        <Link href="/sign-in" className={buttonVariants()}>Sign in</Link>
      </div>
    </div>
  )
};

export default Navbar;
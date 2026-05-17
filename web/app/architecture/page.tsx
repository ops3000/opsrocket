import { SiteNav, SiteFooter, ArchBody } from "@/components/site";

export const metadata = {
  title: "Architecture — one Rust engine, two frontends",
};

export default function ArchitecturePage() {
  return (
    <main className="flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/architecture" />
      <div className="flex-1">
        <ArchBody />
      </div>
      <SiteFooter />
    </main>
  );
}

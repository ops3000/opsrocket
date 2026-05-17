import { SiteNav, SiteFooter, RenderBody } from "@/components/site";

export const metadata = {
  title: "Render fidelity — pixel-checked vs OpenRocket",
};

export default function RenderPage() {
  return (
    <main className="flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/render" />
      <div className="flex-1">
        <RenderBody />
      </div>
      <SiteFooter />
    </main>
  );
}

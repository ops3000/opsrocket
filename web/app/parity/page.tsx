import { SiteNav, SiteFooter, ParityBody } from "@/components/site";

export const metadata = {
  title: "Physics parity — OpsRocket vs Java OpenRocket",
};

export default function ParityPage() {
  return (
    <main className="flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/parity" />
      <div className="flex-1">
        <ParityBody />
      </div>
      <SiteFooter />
    </main>
  );
}

import { SiteNav, SiteFooter, ValidationBody } from "@/components/site";

export const metadata = {
  title: "Academic validation — OpsRocket vs a flown altimeter",
};

export default function ValidationPage() {
  return (
    <main className="flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/validation" />
      <div className="flex-1">
        <ValidationBody />
      </div>
      <SiteFooter />
    </main>
  );
}

import Script from "next/script";
import { GA_LINKER_DOMAINS, getGaMeasurementId } from "@/lib/analytics/gtag";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) {
    return null;
  }

  const linkerDomains = GA_LINKER_DOMAINS.map((domain) => `'${domain}'`).join(",\n          ");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-loop-engine" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      linker: {
        domains: [
          ${linkerDomains}
        ]
      }
    });
  `}
      </Script>
    </>
  );
}

import Script from "next/script";
import {
  formatGaLinkerDomainsForScript,
  getGaLoaderScriptId,
  getGaMeasurementId,
} from "@/lib/analytics/gtag";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  const loaderId = getGaLoaderScriptId();
  if (!measurementId || !loaderId) {
    return null;
  }

  const linkerDomains = formatGaLinkerDomainsForScript();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-loop-engine" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', '${measurementId}', {
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

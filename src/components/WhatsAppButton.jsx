import { buildWhatsAppUrl, trackWhatsAppClick } from "../utils/whatsapp.js";
import { trackEvent } from "../utils/tracking.js";

export default function WhatsAppButton({
  children = "Konsultasi via WhatsApp",
  className = "",
  message,
  source,
  serviceInterest,
  packageName,
  auditScore,
  recommendation,
  eventName = "whatsapp_click",
  ...rest
}) {
  const href = buildWhatsAppUrl({
    message,
    source,
    serviceInterest,
    packageName,
    auditScore,
    recommendation
  });

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      {...rest}
      onClick={() => {
        if (eventName !== "whatsapp_click") {
          trackEvent(eventName, {
            source,
            serviceInterest,
            packageName,
            auditScore,
            recommendation
          });
        }
        trackWhatsAppClick({
          eventName,
          source,
          serviceInterest,
          packageName,
          auditScore,
          recommendation
        });
      }}
    >
      {children}
    </a>
  );
}

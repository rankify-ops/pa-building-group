import icons from "@/data/icons.json";
import { BASE_PATH } from "@/lib/basePath";

type SvgProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  className,
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/** Line icon from the shared set (src/data/icons.json). */
export function Icon({ name, size = 24, className }: SvgProps & { name: string }) {
  const markup = (icons as Record<string, string>)[name] ?? "";
  return <svg {...base(size, className)} strokeWidth={1.6} dangerouslySetInnerHTML={{ __html: markup }} />;
}

/** The angled arrow on every CTA. */
export function ArrowIcon({ size = 15 }: SvgProps) {
  return (
    <svg {...base(size, "btn__arrow")} strokeWidth={2}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function PhoneIcon({ size = 15, className }: SvgProps) {
  return (
    <svg {...base(size, className)} strokeWidth={2}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function MailIcon({ size = 15, className }: SvgProps) {
  return (
    <svg {...base(size, className)} strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

export function PinIcon({ size = 15, className }: SvgProps) {
  return (
    <svg {...base(size, className)} strokeWidth={2}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ShieldIcon({ size = 15, className }: SvgProps) {
  return (
    <svg {...base(size, className)} strokeWidth={2}>
      <path d="M12 2 4 5.5v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5v-6L12 2Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ClockIcon({ size = 15, className }: SvgProps) {
  return (
    <svg {...base(size, className)} strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

/**
 * Trusted, build-time copy that may contain inline links (FAQ answers).
 * Internal hrefs in the data start with "/", so the base path is added here.
 */
export function Rich({ html, className }: { html: string; className?: string }) {
  const fixed = html.replace(/href="\//g, `href="${BASE_PATH}/`);
  return <p className={className} dangerouslySetInnerHTML={{ __html: fixed }} />;
}

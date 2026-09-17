import "react";

// Inline styles carry CSS custom properties (--i for nav stagger, --d for
// reveal delay), which React's CSSProperties type doesn't know about.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

import type { Metadata } from "next";
import { href } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Page Not Found | Thornbury Builders, Melbourne",
  description: "That page isn't on the PA Building Group site. Go back home, or contact our Thornbury office about a Melbourne renovation or extension.",
  index: false,
});

export default function NotFound() {
  return (
    <section className="pagehero">
      <div className="wrap">
        <div className="pagehero__inner">
          <p className="eyebrow">404</p>
          <h1>Page <em>not found</em></h1>
          <p className="pagehero__lede">That link doesn&rsquo;t go anywhere. It may have moved, or it may never have existed.</p>
          <div className="pagehero__cta">
            <a className="btn btn--light" href={href("/")}>Back to home <ArrowIcon /></a>
            <a className="btn btn--glass" href={href("/contact/")}>Contact us <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

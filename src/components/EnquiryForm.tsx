import { SITE } from "@/data/site";
import { ArrowIcon } from "./Icon";

const SERVICE_CHOICES = [
  "Extension or addition",
  "Home renovation",
  "Kitchen or bathroom",
  "Outdoor living area",
  "Property maintenance",
  "Something else",
];
const PROPERTY_CHOICES = ["House", "Town House", "Heritage Home"];
const STAGE_CHOICES = ["Just an idea so far", "I have plans", "Permit approved", "Needs doing now"];

function Choices({ name, options, id, cols3 }: { name: string; options: string[]; id: string; cols3?: boolean }) {
  return (
    <div className={`choices${cols3 ? " choices--3" : ""}`}>
      {options.map((opt, i) => (
        <span key={opt}>
          <input className="choice__input" type="radio" id={`${id}-${name}-${i}`} name={name} value={opt} required />
          <label className="choice" htmlFor={`${id}-${name}-${i}`} tabIndex={-1}>
            <span className="choice__title">{opt}</span>
          </label>
        </span>
      ))}
    </div>
  );
}

type Props = {
  /** Shown in the email subject so Paul knows which page the lead came from. */
  context: string;
  variant?: "dark" | "light";
  title?: string;
  intro?: string;
  id?: string;
};

/**
 * Four-stage enquiry. Stages are plain HTML, so with scripting off it is one
 * long form; site-behaviour.js turns it into one stage at a time and posts it
 * to Web3Forms.
 */
export function EnquiryForm({
  context,
  variant = "light",
  title = "Get a free quote",
  intro = "Four quick questions. Paul will come back to you to book a site visit.",
  id = "enquire",
}: Props) {
  return (
    <div className={`enquiry${variant === "dark" ? " enquiry--dark" : ""}`} id={id}>
      <div className="enquiry__head">
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <form
        className="js-enquiry"
        noValidate
        data-context={context}
        data-w3f={SITE.web3formsKey}
        data-phone={SITE.mobile.label}
        data-email={SITE.email}
      >
        <div className="fstep" data-title="Project">
          <fieldset className="fieldset">
            <legend>What are you planning?</legend>
            <Choices id={id} name="service" options={SERVICE_CHOICES} />
          </fieldset>
        </div>

        <div className="fstep" data-title="Property">
          <fieldset className="fieldset">
            <legend>What sort of property?</legend>
            <Choices id={id} name="property" options={PROPERTY_CHOICES} cols3 />
          </fieldset>
        </div>

        <div className="fstep" data-title="Stage">
          <fieldset className="fieldset">
            <legend>Where are you up to?</legend>
            <Choices id={id} name="stage" options={STAGE_CHOICES} />
          </fieldset>
        </div>

        <div className="fstep" data-title="Your details">
          <div className="field">
            <label htmlFor={`${id}-name`}>Your name</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="Full name" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor={`${id}-phone`}>Phone</label>
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="04…" required />
            </div>
            <div className="field">
              <label htmlFor={`${id}-email`}>Email</label>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${id}-suburb`}>Suburb</label>
            <input id={`${id}-suburb`} name="suburb" type="text" autoComplete="address-level2" placeholder="e.g. Northcote" required />
          </div>
          <div className="field">
            <label htmlFor={`${id}-detail`}>Anything else? (optional)</label>
            <textarea id={`${id}-detail`} name="detail" placeholder="A sentence or two about the job" />
          </div>
        </div>

        <label className="hp" aria-hidden="true">
          Leave this unticked <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>

        <p className="fstatus" data-fstatus="" aria-live="polite" />
        <div className="fnav">
          <button className="btn btn--quiet" type="button" data-back="" hidden>Back</button>
          <button className={`btn ${variant === "dark" ? "btn--light" : "btn--solid"} btn--grow`} type="button" data-next="" hidden>
            Continue
          </button>
          <button className="btn btn--accent btn--grow" type="submit" data-send="">
            Send enquiry <ArrowIcon />
          </button>
        </div>
        <p className="enquiry__fine">No obligation. Your details only go to Paul.</p>
      </form>
    </div>
  );
}

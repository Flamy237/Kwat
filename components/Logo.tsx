import { site } from "@/lib/content";

export default function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
        <path d="M16 3l13 13-13 13L3 16z" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path d="M16 11l5 5-5 5-5-5z" fill="var(--taxi)" />
      </svg>
      <span>{site.name.toLowerCase()}</span>
    </span>
  );
}

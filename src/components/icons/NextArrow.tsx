import type { SVGProps } from "preact/compat";

export function NextArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      role="img"
      aria-label="next arrow icon"
      {...props}
    >
      <path fill="currentColor" d="M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6zm12 0h-2v16h2z" />
    </svg>
  );
}
export default NextArrow;

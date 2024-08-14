import type { SVGProps } from 'preact/compat'

export function VolumeThree(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 2H9v2H7v2H5v2H1v8h4v2h2v2h2v2h2zM7 18v-2H5v-2H3v-4h2V8h2V6h2v12zm6-8h2v4h-2zm8-6h-2V2h-6v2h6v2h2v12h-2v2h-6v2h6v-2h2v-2h2V6h-2zm-2 4h-2V6h-4v2h4v8h-4v2h4v-2h2z"
      ></path>
    </svg>
  )
}
export default VolumeThree

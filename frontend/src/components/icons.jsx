/**
 * Reusable SVG icon components for RentLink.
 *
 * Each icon accepts optional `fill`, `fillOpacity`, and `className` props
 * so they can be customised per usage while keeping defaults that match the design.
 */

/* ------------------------------------------------------------------ */
/*  PersonIcon – user avatar silhouette (sidebar profile & cards)     */
/* ------------------------------------------------------------------ */
export function PersonIcon({
  size = 31,
  fill = "#B0E4CC",
  fillOpacity,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-hidden relative ${className}`}
      style={{ width: size, height: size }}
    >
      <path
        d="M15.4361 15.4351C18.909 15.4351 21.6101 12.7339 21.6101 9.26099C21.6101 5.78807 18.909 3.08691 15.4361 3.08691C11.9631 3.08691 9.26197 5.78807 9.26197 9.26099C9.26197 12.7339 11.9631 15.4351 15.4361 15.4351ZM15.4361 18.5221C11.32 18.5221 3.08789 20.5801 3.08789 24.6962V27.7832H27.7842V24.6962C27.7842 20.5801 19.5521 18.5221 15.4361 18.5221Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  DashboardIcon – 4-square grid (Dashboard & management menus)      */
/* ------------------------------------------------------------------ */
export function DashboardIcon({
  size = 25,
  fill = "#B0E4CC",
  fillOpacity,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-hidden relative ${className}`}
      style={{ width: size, height: size }}
    >
      <path
        d="M3.08643 13.3771H11.3185V3.08691H3.08643V13.3771ZM3.08643 21.6092H11.3185V15.4351H3.08643V21.6092ZM13.3766 21.6092H21.6087V11.319H13.3766V21.6092ZM13.3766 3.08691V9.261H21.6087V3.08691H13.3766Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  DocumentIcon – file/document (Tagihan & Riwayat menus)            */
/* ------------------------------------------------------------------ */
export function DocumentIcon({
  size = 25,
  fill = "#B0E4CC",
  fillOpacity,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-hidden relative ${className}`}
      style={{ width: size, height: size }}
    >
      <path
        d="M14.4059 2.05811H6.17375C5.04183 2.05811 4.11572 2.98422 4.11572 4.11613V20.5804C4.11572 21.7123 5.03154 22.6384 6.17375 22.6384H18.5219C19.6538 22.6384 20.5799 21.7123 20.5799 20.5804V8.23219L14.4059 2.05811ZM16.4639 18.5223H8.23178V16.4643H16.4639V18.5223ZM16.4639 14.4063H8.23178V12.3482H16.4639V14.4063ZM13.3768 9.2612V3.60163L19.0364 9.2612H13.3768Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ChevronDownIcon – dropdown arrow 16×20 (filters & selects)        */
/* ------------------------------------------------------------------ */
export function ChevronDownIcon({
  fill = "black",
  fillOpacity = "0.65",
  className = "",
}) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 w-4 h-5 overflow-hidden relative ${className}`}
    >
      <path
        d="M7.22453 14.7071C7.61506 15.0976 8.24822 15.0976 8.63875 14.7071L15.0027 8.34315C15.3932 7.95262 15.3932 7.31946 15.0027 6.92893C14.6122 6.53841 13.979 6.53841 13.5885 6.92893L7.93164 12.5858L2.27479 6.92893C1.88426 6.53841 1.2511 6.53841 0.860573 6.92893C0.470048 7.31946 0.470048 7.95262 0.860573 8.34315L7.22453 14.7071ZM7.93164 12H6.93164V14H7.93164H8.93164V12H7.93164Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ChevronDownIconLg – dropdown arrow 20×20 (larger variant)         */
/* ------------------------------------------------------------------ */
export function ChevronDownIconLg({
  fill = "black",
  fillOpacity = "0.65",
  className = "",
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 w-5 h-5 overflow-hidden relative ${className}`}
    >
      <path
        d="M9.22453 14.7071C9.61506 15.0976 10.2482 15.0976 10.6387 14.7071L17.0027 8.34315C17.3932 7.95262 17.3932 7.31946 17.0027 6.92893C16.6122 6.53841 15.979 6.53841 15.5885 6.92893L9.93164 12.5858L4.27479 6.92893C3.88426 6.53841 3.2511 6.53841 2.86057 6.92893C2.47005 7.31946 2.47005 7.95262 2.86057 8.34315L9.22453 14.7071ZM9.93164 12H8.93164V14H9.93164H10.9316V12H9.93164Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}

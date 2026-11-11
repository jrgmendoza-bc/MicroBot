const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export function Icon({ name, size = 24 }) {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "chip":
      return (<svg {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></svg>);
    case "pcb":
      return (<svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1.4" /><circle cx="16" cy="15" r="1.4" /><path d="M9.4 9H13a2 2 0 0 1 2 2v2.6M8 15h4" /></svg>);
    case "kit":
      return (<svg {...p}><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" /><path d="M3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></svg>);
    case "web":
      return (<svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 14l-2 1.5L8 17M16 14l2 1.5-2 1.5M13 13l-2 5" /></svg>);
    case "mail":
      return (<svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>);
    case "bag":
      return (<svg {...p}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
    case "social":
      return (<svg {...p}><path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.5.2-.8.8-.8Z" /></svg>);
    case "arrow":
      return (<svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
    case "arrow-ur":
      return (<svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
    case "left":
      return (<svg {...p}><path d="m15 5-7 7 7 7" /></svg>);
    case "right":
      return (<svg {...p}><path d="m9 5 7 7-7 7" /></svg>);
    case "doc":
      return (<svg {...p}><path d="M7 3h7l5 5v13H7V3Z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>);
    case "cart":
      return (<svg {...p}><path d="M3 4h2.5l2 11h10l2-8H7" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>);
    case "check":
      return (<svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
    default:
      return null;
  }
}

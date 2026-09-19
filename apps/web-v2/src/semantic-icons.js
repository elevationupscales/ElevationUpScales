const ICONS = {
  lithium: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="14" width="36" height="24" rx="3"/><path d="M15 14v-4h7v4m11 0v-4h-7v4M26 19l-7 10h7l-4 9 9-12h-7l2-7Z"/></svg>',
  solar: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="37" cy="10" r="4"/><path d="M37 2v3m0 10v3m-8-8h3m10 0h3M9 20h28l5 20H4l5-20Zm5 0 2-7h14l2 7M9 27h30M7 34h34M17 20l-2 20M29 20l2 20"/></svg>',
  rv: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 15h27l9 9v12H5V15Zm27 4v9h9M12 36a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm23 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM10 21h9m4 0h5"/></svg>',
  backup: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m5 23 19-15 19 15M10 20v22h28V20M18 42V29h12v13M27 15l-7 10h6l-3 8 9-11h-6l1-7Z"/></svg>',
  commercial: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 43h38M8 43V20l12-7v30M20 43V8l20-4v39M26 15h7m-7 8h7m-7 8h7M12 27h4m-4 8h4"/></svg>',
  hawaii: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 30h25v10H4V30Zm25 3h7l7 7H29V33ZM10 40a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm27 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM15 29V15m0 0c-5-5-9-3-11-1m11 1c5-5 9-3 11-1m-11 1c-3-7 0-11 3-13m-3 13c3-7 0-11-3-13"/></svg>',
  trusted: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 39 10v12c0 10-6 18-15 22C15 40 9 32 9 22V10l15-6Z"/><path d="m16 24 6 6 11-13"/></svg>',
  freight: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 13h26v25H4V13Zm26 9h7l7 8v8H30V22ZM11 38a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm25 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM10 19h14m-14 7h14"/></svg>',
  support: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 25a16 16 0 0 1 32 0v10M8 26H4v9a5 5 0 0 0 5 5h4V26H8Zm32 0h4v9a5 5 0 0 1-5 5h-4V26h5ZM35 40c0 3-4 4-9 4h-3"/></svg>',
  inverter: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="8" width="38" height="30" rx="4"/><path d="M11 23c3-7 6 7 10 0s7 7 11 0 5 0 6 0M14 14h6m-6 18h7M34 30v10m-5 0h10"/></svg>',
  accessories: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 8v11m-5-6h10M35 29v11m-5-6h10M13 19c0 9 4 12 11 12h6m5-7v6m-4-6h8v6h-8v-6ZM8 4h10v8H8V4Z"/></svg>'
};

export function semanticIcon(kind) {
  const svg = ICONS[kind];
  if (!svg) return '';
  return `<span class="shortcut-icon semantic-icon semantic-icon--${kind}">${svg}</span>`;
}

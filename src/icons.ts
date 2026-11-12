import type { IconName } from './data';

const paths: Record<IconName | 'whatsapp' | 'phone' | 'pin' | 'clock' | 'arrowL' | 'arrowR' | 'close' | 'check' | 'up' | 'menu' | 'facebook' | 'instagram' | 'tiktok', string> = {
  snow: '<path d="M12 2v20M4.9 7l14.2 10M4.9 17L19.1 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  wind: '<rect x="2" y="5" width="20" height="8" rx="2"/><path d="M6 10h12M7 17c0 2 2 2 2 4M12 17v4M17 17c0 2-2 2-2 4"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  cabinet: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M12 3v18M3 12h18M9.5 7.5v1M14.5 7.5v1M9.5 15.5v1M14.5 15.5v1"/>',
  wall: '<path d="M3 4h18v16H3zM3 9.3h18M3 14.6h18M9 4v5.3M15 9.3v5.3M9 14.6V20"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
  fridge: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M8 6v2M8 13v3"/>',
  tiles: '<rect x="3" y="3" width="8" height="8" rx=".5"/><rect x="13" y="3" width="8" height="8" rx=".5"/><rect x="3" y="13" width="8" height="8" rx=".5"/><rect x="13" y="13" width="8" height="8" rx=".5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrowL: '<path d="M15 18l-6-6 6-6"/>',
  arrowR: '<path d="M9 18l6-6-6-6"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  up: '<path d="M18 15l-6-6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  whatsapp: '',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  facebook: '',
  tiktok: '',
};

export type AnyIcon = keyof typeof paths;

export function icon(name: AnyIcon, size = 24): string {
  if (name === 'whatsapp') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.8a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.5 3.5z"/></svg>`;
  }
  if (name === 'facebook') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7a10 10 0 1 1 3.1 0z"/></svg>`;
  }
  if (name === 'tiktok') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.2 6.2 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.5 4.5 0 0 1-4.4-4.7z"/></svg>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

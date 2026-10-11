import type { ImageMetadata } from 'astro';
import site from '../site.config';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/*.{jpg,jpeg,png,webp}', { eager: true });

/** The avatar image from src/assets/, or undefined if none is configured */
export const avatar: ImageMetadata | undefined = site.avatar
  ? files[`../assets/${site.avatar}`]?.default
  : undefined;

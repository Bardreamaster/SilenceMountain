// Astro's Sharp image service with the WebP encoder settings chosen per source: PNG sources
// (screenshots, diagrams) are saved lossless, since lossy encoding smears their text and edges
// and lossless is often even smaller for them; everything else (photos) uses the lossy settings.
// Both come from site.imageQuality. Wired up in astro.config.mjs (image.service.entrypoint).
import type { LocalImageService } from 'astro';
import sharpService from 'astro/assets/services/sharp';
import site from '../site.config';

const isPng = (data: Uint8Array) => data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47;

const service: LocalImageService = {
  ...sharpService,
  async transform(input, options, config, logger) {
    const webp = isPng(input) ? site.imageQuality.graphic : site.imageQuality.photo;
    const withWebp = { ...config, service: { ...config.service, config: { ...config.service.config, webp } } };
    return sharpService.transform(input, options, withWebp, logger);
  },
};

export default service;

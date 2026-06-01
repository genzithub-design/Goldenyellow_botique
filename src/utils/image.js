/**
 * Utility to dynamically resize and optimize Unsplash image URLs on the fly.
 * Reduces bandwidth usage and decreases loading times dramatically.
 *
 * @param {string} url - Original Unsplash image URL
 * @param {number} width - Desired output width in pixels
 * @param {number} quality - Compression quality (1-100)
 * @returns {string} Optimized image URL
 */
export const optimizeUnsplashUrl = (url, width = 600, quality = 75) => {
  if (!url || typeof url !== 'string' || !url.includes('images.unsplash.com')) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('w', width.toString());
    u.searchParams.set('q', quality.toString());
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch (e) {
    return url;
  }
};

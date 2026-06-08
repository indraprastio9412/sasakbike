export const SITE_URL = "https://sasakbike.web.id";
export const SITE_NAME = "Sasak Bike";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

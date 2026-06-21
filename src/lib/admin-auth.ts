/**
 * Autentikasi admin sederhana untuk dashboard internal Sasak Bike.
 *
 * PENTING: Project ini adalah situs front-end statis tanpa server/database,
 * jadi login ini hanya gerbang sederhana di sisi browser (bukan sistem
 * autentikasi yang aman untuk data sensitif). Cukup untuk kebutuhan
 * "kunci halaman admin dari pengunjung biasa".
 */

const ADMIN_USERNAME = "indra";
const ADMIN_PASSWORD = "2026";

const SESSION_KEY = "sasakbike-admin-session";

export function loginAdmin(username: string, password: string): boolean {
  const ok =
    username.trim().toLowerCase() === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD;

  if (ok) {
    try {
      localStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore (mis. private mode tanpa storage)
    }
  }

  return ok;
}

export function logoutAdmin() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

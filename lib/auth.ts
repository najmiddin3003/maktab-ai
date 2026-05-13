/** Demo login — productionda olib tashlang yoki server-side auth bilan almashtiring */
export const AUTH_COOKIE = "maktab_auth";
export const AUTH_COOKIE_VALUE = "ok";

export const DEMO_USERNAME = "admin";
export const DEMO_PASSWORD = "admin12345";

export function validateCredentials(username: string, password: string): boolean {
  return username === DEMO_USERNAME && password === DEMO_PASSWORD;
}

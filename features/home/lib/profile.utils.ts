import { Social } from "./profile.types";

export function normalizeEmailUrl(raw: string) {
  const value = raw.replace(/^mailto:/, "").trim();

  if (!value.includes("@") || value.includes("http")) {
    return null;
  }

  return {
    href: `mailto:${value}`,
    label: "Contact me",
    email: value,
  };
}

export function getPrimaryEmail(socials: Social[]) {
  return socials.map((s) => normalizeEmailUrl(s.url)).find(Boolean) ?? null;
}

export function getGithub(socials: Social[]) {
  return socials.find((s) => s.url.includes("github.com"));
}

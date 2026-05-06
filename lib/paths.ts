const base =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_BASE_PATH || ""
    : "";

export function stripBasePath(pathname: string): string {
  if (base && pathname.startsWith(base)) {
    const rest = pathname.slice(base.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

export function swapLocaleInPath(pathname: string, locale: "fr" | "en"): string {
  const raw = stripBasePath(pathname);
  const segments = raw.split("/").filter(Boolean);
  if (segments.length === 0) return withBasePath(`/${locale}`);
  if (segments[0] === "fr" || segments[0] === "en") {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return withBasePath(`/${segments.join("/")}`);
}

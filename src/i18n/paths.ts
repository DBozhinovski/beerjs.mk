export function localizedPath(lang: string, pathname: string) {
  const path =
    lang === "mk"
      ? pathname.replace(/^\/en/, "")
      : pathname.startsWith("/en")
        ? pathname
        : `/en${pathname}`;

  return path || "/";
}

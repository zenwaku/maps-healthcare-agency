const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function getStorage(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  return safeJsonParse(window.localStorage.getItem(key), fallback);
}

export function setStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendStorageList(key, value, limit = 30) {
  const current = getStorage(key, []);
  const next = [value, ...current].slice(0, limit);
  setStorage(key, next);
  return next;
}

export function getUtmPayload() {
  return getStorage("maps_utm", {});
}

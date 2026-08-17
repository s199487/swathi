// Deterministic avatar color per username, so the same person always
// gets the same color across sessions, without storing anything extra.
const AVATAR_COLORS = ["bg-franchise", "bg-dealer", "bg-associate", "bg-job"];

export function getInitial(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

export function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function filmTime(fraction: number, duration: number) {
  if (!Number.isFinite(fraction) || !Number.isFinite(duration) || duration <= 0) return 0;
  return Math.min(Math.max(0, duration - 0.04), Math.max(0, Math.min(1, fraction)) * duration);
}

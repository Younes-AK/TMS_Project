type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      out.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      val.forEach(walk);
      return;
    }
    if (typeof val === "object") {
      for (const key in val) {
        if (val[key]) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

export function formatNumber(
  n: number,
  opts: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    ...opts,
  }).format(n);
}

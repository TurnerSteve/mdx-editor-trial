// src/lib/markdown/parseParams.ts
interface RawComponentData {
  id: string;
  type: string;
  label: string;
  [key: string]: string;
}

export function parseParams(paramStr: string): RawComponentData {
  const result: RawComponentData = { id: '', type: '', label: '' };
  const parts = paramStr.trim().split(/\s+/);
  for (const part of parts) {
    const [key, ...rest] = part.split(':');
    if (!key) continue;
    const value = rest.join(':');
    if (key === 'id' || key === 'label' || key === 'cards' || key === 'seq' || key === 'type') {
      result[key] = value;
    } else if (['N', 'E', 'S', 'W'].includes(key)) {
      result[key] = value;
    }
  }
  return result;
}
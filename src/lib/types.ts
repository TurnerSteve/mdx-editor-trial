// $lib/types.ts (or wherever ParsedBlock is defined)
export type ParsedBlock =
  | {
      kind: 'text';
      content: string;
      key: string;
      line?: number;
    }
  | {
      kind: 'component';
      type: string;
      value: string;
      key: string;
      line?: number;
      raw: string;  // <-- add this!
    };
import { getCollection, type CollectionEntry } from 'astro:content';

export type Edition = CollectionEntry<'editions'>['data'] & {
  slug: string;
  binary: string;
};

/** Numer edycji zapisany binarnie, np. 13 → "1101". Edycje 1–7 mają 3 cyfry (001…111), tak jak w historycznym nazewnictwie. */
export const toBinary = (n: number) => n.toString(2).padStart(3, '0');

export async function getEditions(): Promise<Edition[]> {
  const entries = await getCollection('editions');
  return entries
    .map(({ id, data }) => ({
      ...data,
      slug: id,
      binary: toBinary(data.number),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' });
export const fmtShort = (d: Date) =>
  d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Warsaw' });

export function stats(editions: Edition[]) {
  const talks = editions.flatMap((e) => e.talks);
  const speakers = new Set(talks.filter((t) => t.kind !== 'panel').flatMap((t) => t.speaker.split(', ')));
  // Liczba edycji = numer ostatniej (archiwum ma luki, np. 16 i 17).
  return { editions: Math.max(...editions.map((e) => e.number)), talks: talks.length, speakers: speakers.size, since: Math.min(...editions.map((e) => e.date.getFullYear())) };
}

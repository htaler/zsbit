import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const talk = z.object({
  speaker: z.string(),
  title: z.string(),
  kind: z.enum(['talk', 'lightning', 'panel']).default('talk'),
});

const editions = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/editions' }),
  schema: z.object({
    number: z.number().int().positive(),
    name: z.string(),
    date: z.coerce.date(),
    venue: z.object({ name: z.string(), address: z.string().optional() }).optional(),
    banner: z.string(),
    hosts: z.array(z.string()).default([]),
    talks: z.array(talk).default([]),
    sponsors: z.array(z.string()).default([]),
    partners: z.array(z.string()).default([]),
    registrationUrl: z.url().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { editions };

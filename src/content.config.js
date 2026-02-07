import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "*.{md,mdx}", base: "./src/data/blog-posts" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.union([z.string(), z.date()]),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(), // Путь к файлу изображения (без /assets/blog/)
		imageAlt: z.string().optional(), // Alt текст для изображения
		imageTitle: z.string().optional(), // Заголовок изображения
	}),
});

export const collections = { posts };
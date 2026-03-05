import { defineField, defineType } from "sanity";

export const foodGallery = defineType({
  name: "foodGallery",
  title: "Food Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "galleryItem",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "ingredients",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Food Gallery" };
    },
  },
});

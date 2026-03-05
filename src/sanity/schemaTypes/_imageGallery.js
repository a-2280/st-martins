import { defineField, defineType } from "sanity";

export const imageGallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "galleryImage",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery" };
    },
  },
});

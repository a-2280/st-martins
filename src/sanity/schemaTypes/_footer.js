import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "careers",
      type: "object",
      fields: [
        defineField({ name: "visible", type: "boolean", initialValue: true }),
        defineField({ name: "text", type: "string" }),
        defineField({ name: "link", type: "string" }),
      ],
    }),
    defineField({
      name: "press",
      type: "object",
      fields: [
        defineField({ name: "visible", type: "boolean", initialValue: true }),
        defineField({ name: "text", type: "string" }),
        defineField({ name: "link", type: "string" }),
      ],
    }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "handle", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "image", type: "image" }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});

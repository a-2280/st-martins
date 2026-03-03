import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "address",
      type: "object",
      fields: [
        defineField({ name: "street", type: "string" }),
        defineField({
          name: "cityState",
          title: "City & State",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reservation",
      type: "object",
      fields: [
        defineField({ name: "button", title: "Button Text", type: "string" }),
        defineField({ name: "link", type: "url" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Restaurant Hours",
      type: "object",
      fields: [
        defineField({
          name: "weekdays",
          title: "Sun – Thu",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "text",
              title: "Display Text",
              type: "string",
            }),
            defineField({
              name: "open",
              title: "Opens (24h)",
              type: "number",
              description: "17 for 5pm",
            }),
            defineField({
              name: "close",
              title: "Closes (24h)",
              type: "number",
              description: "22 for 10pm",
            }),
          ],
        }),
        defineField({
          name: "weekend",
          title: "Fri & Sat",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "text",
              title: "Display Text",
              type: "string",
            }),
            defineField({
              name: "open",
              title: "Opens (24h)",
              type: "number",
              description: "17 for 5pm",
            }),
            defineField({
              name: "close",
              title: "Closes (24h)",
              type: "number",
              description: "23 for 11pm",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header" };
    },
  },
});

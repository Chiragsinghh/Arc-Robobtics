import { defineType, defineField } from "sanity";

export default defineType({
  name: "system",
  title: "System",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "System Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "System Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});

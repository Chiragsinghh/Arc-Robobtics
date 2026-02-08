import { defineType, defineField } from "sanity";

export default defineType({
  name: "knowledgeTrack",
  title: "Knowledge Track",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Track Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order in which tracks appear",
    }),
  ],
});

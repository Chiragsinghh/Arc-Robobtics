import { defineType, defineField } from "sanity";

export default defineType({
  name: "knowledgeModule",
  title: "Knowledge Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Module Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "track",
      title: "Belongs to Track",
      type: "reference",
      to: [{ type: "knowledgeTrack" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pdf",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Module Order",
      type: "number",
      description: "Controls module ordering inside a track",
    }),
  ],
});

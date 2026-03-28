import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    // ✅ SHORT DESCRIPTION (for hover)
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    // ✅ NEW FIELD (for popup)
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "text",
      rows: 8,
      description: "This will be shown in the popup modal",
    }),

    defineField({
      name: "image",
      title: "Optional Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
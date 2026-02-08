import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Coordinator, Lead, Core Member, etc.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Academic Year",
      type: "string",
      options: {
        list: [
          { title: "Third Year", value: "third" },
          { title: "Second Year", value: "second" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = higher priority",
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Instagram", value: "instagram" },
                ],
              },
            },
            {
              name: "url",
              title: "Profile URL",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
});

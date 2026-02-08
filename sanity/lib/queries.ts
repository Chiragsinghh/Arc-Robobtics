import { sanityClient } from "./sanity.client";

export async function getSystems() {
  return sanityClient.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      date,
      description,
      "slug": slug.current
    }
  `);
}

export async function getEventBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "event" && slug.current == $slug][0] {
      title,
      date,
      description,
      content,
      image
    }
  `,
    { slug }
  );
}


export async function getKnowledgeTracks() {
    return sanityClient.fetch(`
      *[_type == "knowledgeTrack"] | order(order asc) {
        _id,
        title,
        intro,
        order,
        "modules": *[
          _type == "knowledgeModule" &&
          references(^._id)
        ] | order(order asc) {
          _id,
          title,
          summary,
          "pdfUrl": pdf.asset->url
        }
      }
    `);
  }
  export async function getEvents() {
    return sanityClient.fetch(`
      *[_type == "event"] | order(date asc) {
        _id,
        title,
        date,
        description,
        image
      }
    `);
  }
  

import { sanityClient } from "./sanity.client";

/* ---------------- SYSTEMS ---------------- */

export async function getSystems() {
  return sanityClient.fetch(`
    *[_type == "system"] | order(_createdAt desc) {
      _id,
      title,
      description,
      tags,
      image
    }
  `);
}

/* ---------------- EVENTS ---------------- */

export async function getEvents() {
  return sanityClient.fetch(`
    *[_type == "event"] | order(date asc) {
      _id,
      title,
      date,
      description,
      image,
      "slug": slug.current
    }
  `);
}


export async function getEventBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      date,
      description,
      image,
      "slug": slug.current
    }`,
    { slug }
  );
}


/* ---------------- KNOWLEDGE ---------------- */

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
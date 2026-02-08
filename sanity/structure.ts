import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("ARC Robotics Content")
    .items([
      S.documentTypeListItem("system").title("Systems"),
      S.documentTypeListItem("knowledgeTrack").title("Knowledge Tracks"),
      S.documentTypeListItem("knowledgeModule").title("Knowledge Modules"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("teamMember").title("Team Members"),
    ]);



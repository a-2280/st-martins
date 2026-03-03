import { header } from "./_header";
import { hero } from "./_hero";
import { gallery } from "./_gallery";

export const singletonTypes = new Set(["header", "hero", "gallery"]);

export const schema = {
  types: [header, hero, gallery],
};

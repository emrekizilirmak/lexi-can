/*
 *
 * i think name is self explanatory for now
 *
 */

export type Word = {
  id: number;
  word: string;
  TypeData: TypeData;
  translations: string[];
};

type TypeData = NounData | OtherData;

type NounData = {
  type: "noun";
  article: "der" | "die" | "das";
};

type OtherData = {
  type: "verb" | "adjective" | "adverb";
};

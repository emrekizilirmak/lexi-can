import { useState } from "react";
import type { Word } from "../types/word";

type WordFormProps = {
  onAdd: (word: Word) => void;
};

function WordForm({ onAdd }: WordFormProps) {
  const [word, setWord] = useState("");
  const [type, setType] = useState("noun");
  const [article, setArticle] = useState("");
  const [translations, setTranslations] = useState<string[]>([""]);

  function updateTranslation(index: number, value: string) {
    setTranslations(translations.map((t, i) => (i === index ? value : t)));
  }

  function addTranslation() {
    setTranslations([...translations, ""]);
  }

  function removeTranslation(index: number) {
    setTranslations(translations.filter((_, i) => i !== index));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const newWord: Word = {
      id: Date.now(),
      word: word,
      TypeData:
        type === "noun"
          ? { type: "noun", article: article as "der" | "die" | "das" }
          : { type: type as "verb" | "adjective" | "adverb" },
      translations: translations.filter((t) => t.trim() !== ""),
    };

    onAdd(newWord);

    setWord("");
    setType("noun");
    setArticle("");
    setTranslations([""]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="word">word</label>
          <input
            id="word"
            name="word"
            type="text"
            required
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="type"> type </label>
          <select
            id="type"
            name="typeData.type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="noun">noun</option>
            <option value="verb">verb</option>
            <option value="adjective">adjective</option>
            <option value="adverb">adverb</option>
          </select>
        </div>
        {type === "noun" && (
          <div>
            <label htmlFor="article">article</label>
            <select
              id="article"
              required
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            >
              <option value="">-</option>
              <option value="der">der</option>
              <option value="die">die</option>
              <option value="das">das</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="translation-0">translation</label>
          {translations.map((t, i) => (
            <div key={i}>
              <input
                id={`translation-${i}`}
                type="text"
                required={i === 0}
                value={t}
                onChange={(e) => updateTranslation(i, e.target.value)}
              />
              {i > 0 && (
                <button type="button" onClick={() => removeTranslation(i)}>
                  remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={addTranslation}>
          add translation
        </button>

        <button type="submit">send</button>
      </form>
      <p>
        {word} {type} {article} {translations.join(", ")}
      </p>
    </>
  );
}

export default WordForm;

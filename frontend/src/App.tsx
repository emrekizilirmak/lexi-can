import { useState, useEffect } from "react";
import type { Word } from "./types/word";
import Header from "./components/Header";
import WordForm from "./components/WordForm";

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  function addWord(word: Word) {
    setWords([...words, word]);
  }

  useEffect(() => {
    fetch("/words.json")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(String(err));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <WordForm onAdd={addWord} />
      {loading && <p>loading..</p>}
      {fetchError && <p> error: {fetchError}</p>}
      <ul>
        {words.map((w) => (
          <li key={w.id}> {w.word} </li>
        ))}
      </ul>
    </>
  );
}

export default App;

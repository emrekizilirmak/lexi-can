import { useState, useEffect } from "react";
import Header from "./components/Header";
import type { Word } from "./types/word";

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

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

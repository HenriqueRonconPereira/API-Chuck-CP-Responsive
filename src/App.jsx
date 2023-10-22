import { useEffect, useState } from "react";
import chuck from "./assets/chuck.png";
function App() {
  const [joke, setJoke] = useState("");
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const jokesparse = JSON.parse(localStorage.getItem("joke"));
    if (jokesparse) {
      setJokes(jokesparse);
    }
  }, []);

  function apiCall() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.value);
      })
      .catch((error) => console.log(error));
  }

  const favorite = () => {
    const jokesFav = [...jokes, joke];
    setJokes(jokesFav);
    localStorage.setItem("joke", JSON.stringify(jokesFav));
    console.log(jokesFav);
  };

  const removefav = (index) => {
    const Confirmed = window.confirm("Tem certeza que quer deletar?");
    if (Confirmed) {
      const jokesFav = [...jokes];
      jokesFav.splice(index, 1);
      setJokes(jokesFav);
      localStorage.setItem("joke", JSON.stringify(jokesFav));
    }
  };

  return (
    <main>
      <h1>Piadas do Chuck Norris</h1>
      <img src={chuck} alt="imagem do chuck norris" />
      <p>{joke}</p>
      <button onClick={apiCall}>Gerar Nova Piada</button>
      <button onClick={favorite}>Favoritar Piada</button>
      <h1>Piadas Favoritadas</h1>
      {jokes.map((item, index) => (
        <div>
          <p key={index}>{item}</p>
          <button onClick={() => removefav(index)}>Remover</button>
        </div>
      ))}
    </main>
  );
}

export default App;

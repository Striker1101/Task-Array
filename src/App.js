import "./styles.css";
import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import uniqid from "uniqid";

import photo1 from "./Media/Gin_Gagamaru.webp";
import photo2 from "./Media/Asahi_Naruhaya.webp";
import photo3 from "./Media/Gurimu_Igarashi.webp";
import photo4 from "./Media/Hyoma_Chigiri.webp";
import photo5 from "./Media/Jingo_Raichi.webp";
import photo6 from "./Media/Meguru_Bachira.webp";
import photo7 from "./Media/Shoei_Baro.webp";
import photo8 from "./Media/Seishiro_Nagi.webp";
import photo9 from "./Media/Reo_Mikage.webp";
import photo10 from "./Media/Yoichi_Isagi.webp";
import photo11 from "./Media/Zantetsu_Tsurugi.webp";
import photo12 from "./Media/Rensuke_Kunigami.webp";
import photo13 from "./Media/Rin_Itoshi.webp";
import photo14 from "./Media/Ikki_Niko.webp";
import photo15 from "./Media/Ryusei_Shido.webp";

export default function App() {
  const list = [
    { img: photo1, text: "Gin_Gagamaru" },
    { img: photo2, text: "Asahi_Naruhaya" },
    { img: photo3, text: "Gurimu_Igarashi" },
    { img: photo4, text: "Hyoma_Chigiri" },
    { img: photo5, text: "Jingo_Raichi" },
    { img: photo6, text: "Meguru_Bachira" },
    { img: photo7, text: "Shoei_Baro" },
    { img: photo8, text: "Seishiro_Nagi" },
    { img: photo9, text: "Reo_Mikage" },
    { img: photo10, text: "Yoichi_Isagi" },
    { img: photo11, text: "Zantetsu_Tsurugi" },
    { img: photo12, text: "Rensuke_Kunigami" },
    { img: photo13, text: "Rin_Itoshi" },
    { img: photo14, text: "Ikki_Niko" },
    { img: photo15, text: "Ryusei_Shido" }
  ];
  let [items, setItems] = useState(list);
  const [id, setId] = useState(uniqid());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pick, setPick] = useState([]);
  const [toggle, setToggle] = useState(false);
  let take = [];
  for (let i = 0; i < items.length; i++) {
    take.push(items[i].text);
  }
  const storedKey = "highScore";

  useEffect(() => {
    onclick = (e) => {
      let x = e.target.parentElement.lastChild.textContent;
      const _items = items.sort(function () {
        return 0.5 - Math.random();
      });

      if (take.includes(x)) {
        if (pick.includes(x)) {
          setScore(0);
          setPick([]);
        } else {
          setPick(pick.concat(x));
          setScore(score + 1);
          setItems((items = _items));
        }
      }

      document.querySelector(".cards").addEventListener("click", onclick);
    };

    return () => {
      document.querySelector(".cards").removeEventListener("click", onclick);
    };
  });

  useEffect(() => {
    let storedHighScore = localStorage.getItem(storedKey);
    setHighScore(JSON.parse(storedHighScore));
  }, []);
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
    localStorage.setItem(storedKey, JSON.stringify(highScore));
  }, [score]);
  return (
    <>
      <div className="container">
        <div className="first">
          <div className="intro">
            <h1>BLUELOCK MEMORY GAME</h1>
            <h4>try remembering every card you pick</h4>
            <h5>pick cards by clicking on them </h5>
          </div>
          <div className="score">
            <h4> your score: {score}</h4>
            <h3> highest score:{highScore}</h3>
            <button
              className="clear"
              onClick={() => {
                setScore(0);
                setHighScore(0);
                setPick([]);
                localStorage.setItem(storedKey, "0");
              }}
            >
              reset
            </button>
          </div>
        </div>
        <div className="second">
          {items.map((item) => {
            return <Cards item={item} click={onclick} id={id} />;
          })}
        </div>
      </div>
    </>
  );
}

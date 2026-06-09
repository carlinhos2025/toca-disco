import { useRef, useState } from "react"
import "./App.css"

export default function App() {
  const audioRef = useRef(null)

  const [tocando, setTocando] = useState(false)
  const [musica, setMusica] = useState(null)

  const tocarMusica = () => {
    if (!audioRef.current) return

    if (tocando) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setTocando(!tocando);
  }

  const carregarMusica = (event) => {
    const arquivo = event.target.files[0]
    
// verifica se existe um arquivo selecionado
    if (arquivo) {
      const url = URL.createObjectURL(arquivo)
      setMusica(url)
      setTocando(false)
    }
  }

  return (
    <div className="container">
      <h1>Toca-Discos</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={carregarMusica}
      />

      <div className={`disco ${tocando ? "girando" : ""}`}>
        <div className="centro"></div>
      </div>

      <button onClick={tocarMusica}>
        {tocando ? "Pausar" : "Tocar"}
      </button>

      <audio ref={audioRef} src={musica}></audio>
    </div>
  );
}
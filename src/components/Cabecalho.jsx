export default function Cabecalho({ titulo, abas, abaAtiva, aoClicar }) {
  return (
    <header>
      <h1>{titulo}</h1>
      <nav className="tabs">
        {abas.map(aba => (
          <a
            key={aba.id}
            href="#"
            className={aba.id === abaAtiva ? 'tab active' : 'tab'}
            onClick={e => {
              e.preventDefault()
              aoClicar(aba.id)
            }}
          >
            {aba.rotulo}
          </a>
        ))}
      </nav>
    </header>
  )
}

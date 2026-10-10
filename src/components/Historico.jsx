export default function Historico({ dados, edicoes }) {
  return (
    <section id="historico">
      <h2>{dados.titulo}</h2>
      {edicoes.length === 0 ? (
        <p>{dados.vazio}</p>
      ) : (
        <ul>
          {edicoes.map((registro, i) => (
            <li key={i}>{registro}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

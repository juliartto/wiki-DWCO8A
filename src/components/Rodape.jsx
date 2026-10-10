export default function Rodape({ rodape, data }) {
  return (
    <footer>
      <p>
        {rodape.prefixo} <span id="last-edit">{data}</span>
        {rodape.sufixo}
      </p>
    </footer>
  )
}

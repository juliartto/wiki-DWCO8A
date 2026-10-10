import Thumb from './Thumb.jsx'

export default function Secao({ secao, editando, aoEditarTexto }) {
  return (
    <section id={secao.id}>
      {secao.titulo && <h2>{secao.titulo}</h2>}
      {secao.thumb && <Thumb thumb={secao.thumb} />}
      <p
        contentEditable={editando}
        suppressContentEditableWarning={true}
        onBlur={editando ? e => aoEditarTexto(secao.id, e.currentTarget.textContent) : undefined}
      >
        {secao.texto}
      </p>
    </section>
  )
}

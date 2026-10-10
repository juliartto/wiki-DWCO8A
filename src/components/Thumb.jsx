export default function Thumb({ thumb }) {
  return (
    <div className="thumb">
      <img src={thumb.imagem} alt={thumb.legenda} className="thumb-img" />
      <p className="thumb-caption">{thumb.legenda}</p>
    </div>
  )
}

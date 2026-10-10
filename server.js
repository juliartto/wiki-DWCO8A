// Servidor Express: entrega o build do React (dist/) e uma API que guarda
// os textos editados e o histórico de edições no servidor.
import express from 'express'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url))
const conteudo = JSON.parse(readFileSync(path.join(raiz, 'src/data/conteudo.json'), 'utf-8'))

// Estado em memória: some quando o serviço reinicia ou hiberna (plano Free do Render).
const estado = {
  textos: Object.fromEntries(conteudo.secoes.map(s => [s.id, s.texto])),
  edicoes: []
}
const MAX_EDICOES = 50
const iniciadoEm = new Date()

function agoraFormatado() {
  const agora = new Date()
  const fuso = { timeZone: 'America/Sao_Paulo' }
  const data = agora.toLocaleDateString('pt-BR', { ...fuso, day: 'numeric', month: 'long', year: 'numeric' })
  const hora = agora.toLocaleTimeString('pt-BR', { ...fuso, hour: '2-digit', minute: '2-digit' }).replace(':', 'h') + 'min'
  return `${data}, às ${hora}`
}

const app = express()
app.use(express.json({ limit: '50kb' }))

// Prova de que há código rodando no servidor
app.get('/api/status', (req, res) => {
  res.json({
    servidor: `Express no Node.js ${process.version}`,
    hospedagem: process.env.RENDER ? 'Render' : 'local',
    commit: process.env.RENDER_GIT_COMMIT?.slice(0, 7) ?? null,
    horarioServidor: agoraFormatado(),
    iniciadoEm: iniciadoEm.toISOString(),
    segundosNoAr: Math.round(process.uptime()),
    edicoesRegistradas: estado.edicoes.length
  })
})

app.get('/api/wiki', (req, res) => res.json(estado))

app.put('/api/wiki', (req, res) => {
  const textos = req.body?.textos
  if (!textos || typeof textos !== 'object') {
    return res.status(400).json({ erro: 'Envie { "textos": { "<idDaSecao>": "<texto>" } }' })
  }
  for (const id of Object.keys(estado.textos)) {
    if (typeof textos[id] === 'string') estado.textos[id] = textos[id].slice(0, 5000)
  }
  estado.edicoes.push(agoraFormatado())
  if (estado.edicoes.length > MAX_EDICOES) estado.edicoes.shift()
  res.json(estado)
})

app.use(express.static(path.join(raiz, 'dist')))

const porta = Number(process.env.PORT) || 3000
app.listen(porta, () => console.log(`Wiki no ar na porta ${porta}`))

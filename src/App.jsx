/*
  PLANO (passo 1):
  Árvore de componentes:
  App (estado: aba ativa, textos das seções, data da última edição, histórico)
  ├── Cabecalho  → título + abas vindas do JSON (lista com .map e key)
  ├── Secao (×3, reutilizada com dados diferentes)
  │   └── Thumb  → imagem com legenda, só no resumo
  ├── Historico  → aparece no lugar das seções na aba "Ver histórico"
  └── Rodape     → texto do rodapé + data da última edição
  Tempo previsto: JSON 10min (maior parte só copiar do html antigo) | componentes 25min | estado/edição 10min | estilo 5min (mantendo o mesmo arquivo de antes, com pequenas alterações)
  IA: Usar IA para criar o esqueleto dos arquivos necessários de componentes jsx e do json de conteúdo, formatação dos copmentários dos passos 1 e 3.
*/
import { useEffect, useState } from 'react'
import conteudo from './data/conteudo.json'
import Cabecalho from './components/Cabecalho.jsx'
import Secao from './components/Secao.jsx'
import Historico from './components/Historico.jsx'
import Rodape from './components/Rodape.jsx'

function formatarAgora() {
  const agora = new Date()
  const data = agora.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h') + 'min'
  return `${data}, às ${hora}`
}

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('artigo')
  const [secoes, setSecoes] = useState(conteudo.secoes)
  const [dataEdicao, setDataEdicao] = useState(conteudo.rodape.dataInicial)
  const [edicoes, setEdicoes] = useState([])

  const editando = abaAtiva === 'editar'

  function aplicarEstado(estado) {
    setSecoes(atuais => atuais.map(s => ({ ...s, texto: estado.textos[s.id] ?? s.texto })))
    setEdicoes(estado.edicoes)
    if (estado.edicoes.length > 0) setDataEdicao(estado.edicoes[estado.edicoes.length - 1])
  }

  // carrega do servidor os textos já editados e o histórico
  useEffect(() => {
    fetch('/api/wiki')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(aplicarEstado)
      .catch(() => {}) // sem servidor: segue com o JSON local
  }, [])

  function trocarAba(id) {
    if (editando && id !== 'editar') {
      const textos = Object.fromEntries(secoes.map(s => [s.id, s.texto]))
      fetch('/api/wiki', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textos })
      })
        .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
        .then(aplicarEstado)
        .catch(() => {
          // sem servidor: registra só no navegador, como antes
          const registro = formatarAgora()
          setDataEdicao(registro)
          setEdicoes(anteriores => [...anteriores, registro])
        })
    }
    setAbaAtiva(id)
  }

  function atualizarTexto(id, novoTexto) {
    setSecoes(secoes.map(s => (s.id === id ? { ...s, texto: novoTexto } : s)))
  }

  return (
    <>
      <Cabecalho
        titulo={conteudo.titulo}
        abas={conteudo.abas}
        abaAtiva={abaAtiva}
        aoClicar={trocarAba}
      />

      <main id="conteudo">
        {abaAtiva === 'historico' ? (
          <Historico dados={conteudo.historico} edicoes={edicoes} />
        ) : (
          secoes.map(secao => (
            <Secao
              key={secao.id}
              secao={secao}
              editando={editando}
              aoEditarTexto={atualizarTexto}
            />
          ))
        )}
      </main>

      <Rodape rodape={conteudo.rodape} data={dataEdicao} />
    </>
  )
}

/*
  AUTOAVALIAÇÃO (passo 3):
  - Critérios atingidos: Abas separadas para o artigo, para a edição de texto e uma aba com o histórico de edições, todas funcionais.
  - Critérios não atingidos: Foi possível implementar todos os componentes que eu queria, sendo uma página bem simples.
  - O componente mais difícil de separar foi o histórico de edições, sendo necessária uma explicação da IA para entender como fazer a separação em um jsx e como implementar ela na página.
  - IA: Cumpriu todas as funções previstas no planejamento, além de explicar conceitos do react que foram utilizados.
*/

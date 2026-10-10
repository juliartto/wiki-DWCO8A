# Wiki React + Express

Página no estilo Wikipédia sobre HTML, com as abas **Artigo**, **Editar** e **Ver histórico**. O front-end é em React + Vite. Um servidor Express entrega o build e guarda as edições e o histórico.

**No ar:** https://wiki-dwco8a.onrender.com

Avaliação Prática 1 (Parte 3) de Desenvolvimento de Aplicações Web, UTFPR Câmpus Apucarana.

## Tecnologias

- React 18 + Vite 5
- Node.js 22 + Express 5
- Hospedagem: Render (Web Service, plano Free)

## Como rodar localmente

```bash
npm install
npm run build
npm start
```

Abra http://localhost:3000.

Para desenvolver com recarregamento automático, rode `npm start` em um terminal e `npm run dev` em outro. O Vite repassa as chamadas `/api` para o Express na porta 3000.

## API

| Método | Rota          | O que faz                                             |
| ------ | ------------- | ----------------------------------------------------- |
| GET    | `/api/wiki`   | Retorna os textos das seções e o histórico de edições |
| PUT    | `/api/wiki`   | Salva os textos editados e registra a edição          |
| GET    | `/api/status` | Versão do Node, horário do servidor e tempo no ar     |

Os dados ficam em memória. Ao reiniciar o servidor, a página volta ao conteúdo de `src/data/conteudo.json`.

## Estrutura

```
├── server.js              servidor Express (API + arquivos do build)
├── src/
│   ├── App.jsx            estado da página e comunicação com a API
│   ├── components/        Cabecalho, Secao, Thumb, Historico, Rodape
│   └── data/conteudo.json conteúdo inicial da wiki
└── public/html_logo.png
```

## Deploy no Render

| Campo         | Valor                          |
| ------------- | ------------------------------ |
| Language      | Node                           |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start`                    |
| Instance Type | Free                           |

No plano Free, o serviço hiberna depois de 15 minutos sem acesso. O primeiro acesso depois disso leva cerca de 1 minuto.

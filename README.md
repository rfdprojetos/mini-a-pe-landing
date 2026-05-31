# Mini a Pé | Landing Page Premium

Uma landing page premium, responsiva e ultra-polida para o aplicativo **Mini a Pé** — um guia de percursos lúdicos ao ar livre por Porto Alegre para conectar famílias, infâncias e território.

Este repositório foi construído seguindo as melhores práticas modernas de **Engenharia de Software** e **Front-end**, estruturado para máxima compatibilidade e segurança (LGPD).

---

## 📂 Estrutura do Projeto

Para garantir a **máxima compatibilidade local** (permitindo que o site funcione perfeitamente tanto em servidores web quanto abrindo o arquivo `index.html` diretamente por duplo clique no computador via protocolo `file://`), mantivemos os arquivos estruturados de forma limpa e unificada:

```bash
├── index.html         # Estrutura semântica principal e SEO do site
├── style.css          # Folha de estilos premium consolidada (Vanilla CSS)
├── app.js             # Lógica e interações JavaScript (Vanilla JS)
└── assets/            # Diretório de mídias otimizadas do projeto (SVG e PNG)
```

Tanto o CSS quanto o JavaScript possuem comentários ricos delimitando cada seção de código, tornando a navegação e a edição extremamente intuitivas para qualquer desenvolvedor.

---

## 🔒 Segurança e Privacidade (LGPD & ECA Digital)

A segurança da navegação e a privacidade dos usuários são prioritárias nesta landing page:

1.  **Proteção contra Vulnerabilidades (Tab-Nabbing):** Todos os links externos com destino a páginas corporativas (`target="_blank"`) utilizam a diretiva `rel="noopener noreferrer"`. Isso impede que scripts de páginas de terceiros interceptem ou controlem a aba de origem.
2.  **Referrer Policy:** O site conta com a política de referência `<meta name="referrer" content="strict-origin-when-cross-origin">`, protegendo as informações de navegação do usuário contra vazamento entre servidores.
3.  **Content Security Policy (CSP):** Blindamos a aplicação contra ataques de injeção de código e *Cross-Site Scripting* (XSS) através de políticas rígidas de carregamento de recursos externos:
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; frame-src https:;">
    ```

---

## 🎨 Guia de Manutenção Visual (Design Tokens)

Todas as cores e tipografias estão centralizadas nas primeiras linhas do arquivo `style.css` dentro do bloco `:root`:

*   **Azul Elétrico Principal:** `--color-accent-emerald` (`#675bff`)
*   **Azul Escuro (Contraste):** `--color-accent-emerald-dark` (`#5246e6`)
*   **Fundo Lilás Suave:** `--color-bg-mint` (`#f4f1f8`)
*   **Tipografia do Título:** `--font-display: 'Outfit', sans-serif;`
*   **Tipografia do Texto:** `--font-body: 'Inter', sans-serif;`

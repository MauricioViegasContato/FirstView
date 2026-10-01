# Guia: Como Adicionar e Atualizar as Logos dos Clientes

Todas as imagens e logos dos clientes ficam centralizadas na pasta pública:
`d:/mauri/Antigravity/FirstView/public/clients/`

---

## 1. Formatos Recomendados
1. **SVG (Vetor) - Recomendado**:
   - Qualidade infinita em qualquer tela (Retina, 4K).
   - Peso minúsculo (2 a 5 KB).
   - Adaptação monocromática perfeita no Dark Mode com CSS.
2. **PNG com Fundo Transparente ou WebP**:
   - Resolução recomendada: largura entre **300px** e **600px**, altura proporcional.
   - Fundo 100% transparente.

---

## 2. Nomenclatura dos Arquivos
Basta salvar a imagem na pasta `public/clients/` com os seguintes nomes padronizados:

| Cliente | Nome do Arquivo Esperado | Status Atual |
|---|---|---|
| **BYD - DENZA** | `byd.svg` (ou `.png`) | ✅ Ativo |
| **METRÓPOLES** | `metropoles.svg` (ou `.png`) | ✅ Ativo |
| **BRB** | `brb.svg` (ou `.png`) | ✅ Ativo |
| **CAIXA ECONÔMICA** | `caixa.svg` (ou `.png`) | ✅ Ativo |
| **BANCO DO BRASIL** | `banco-do-brasil.svg` (ou `.png`) | ✅ Ativo |
| **UNICEF** | `unicef.svg` (ou `.png`) | ✅ Ativo |
| **C6 BANK** | `c6.svg` (ou `.png`) | ✅ Ativo |
| **DENISE ZUBA** | `denise-zuba.svg` (ou `.png`) | ✅ Ativo |
| **EMPLAVI** | `emplavi.svg` (ou `.png`) | ✅ Ativo |
| **BALI PARK** | `bali-park.svg` (ou `.png`) | Disponível para adicionar |
| **TECNA** | `tecna.svg` (ou `.png`) | Disponível para adicionar |
| **CASSI** | `cassi.svg` (ou `.png`) | Disponível para adicionar |
| **ALBERO** | `albero.svg` (ou `.png`) | Disponível para adicionar |
| **EDN** | `edn.svg` (ou `.png`) | Disponível para adicionar |
| **APRENDE BRASIL** | `aprende-brasil.svg` (ou `.png`) | Disponível para adicionar |
| **BANCORBRÁS** | `bancorbras.svg` (ou `.png`) | Disponível para adicionar |
| **WEOOH** | `weooh.svg` (ou `.png`) | Disponível para adicionar |

---

## 3. Comportamento Inteligente
- O componente já possui **fallback automático**: se uma marca ainda não tiver a logo na pasta, ela exibirá um monograma estilizado de alto padrão, garantindo que o design nunca fique quebrado.
- Assim que você colar um arquivo (por exemplo, `bali-park.png`), a logo original aparecerá instantaneamente no carrossel monocromático!

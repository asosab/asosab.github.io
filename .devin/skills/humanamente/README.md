# humanamente

> Un Claude Code Skill que reescribe texto generado por IA para que suene **humano y natural en castellano**, eliminando los rasgos típicos de la IA. Prompt-puro: sin regex, sin listas de buscar-y-reemplazar, sin scripts. Solo criterio del modelo.

*A Claude Code Skill that rewrites AI-generated text so it reads **human and natural in Spanish**, removing the usual AI tells. Prompt-only: no regex, no find-and-replace lists, no scripts — just the model's judgment.*

---

## 🇪🇸 Castellano

### Qué es

Los humanizadores en inglés (como el excelente [`blader/humanizer`](https://github.com/blader/humanizer)) procesan español, pero se guían por **tics ingleses**: vocabulario, ejemplos y tipografía pensados para el inglés. Se les escapan los rasgos propios del español-IA y arrastran criterios que en castellano no aplican (title case, comillas curvas inglesas, etc.).

`humanamente` es un **fork relocalizado al castellano nativo**. No es una traducción: es una adaptación con los tics, ejemplos, vocabulario y tipografía reales del español-IA.

### Qué detecta y corrige

- **Inflación de importancia** ("marcó un antes y un después", "se erige como testimonio de").
- **Vocabulario-IA** (profundizar, fomentar, subrayar, el panorama, un sinfín de, holístico, disruptivo…).
- **Paralelismos negativos** — el tic estrella del español-IA ("no solo X, sino Y").
- **Regla de tres** compulsiva ("rápido, fácil y eficaz").
- **Gerundio de consecuencia** ("…, logrando así…", "…, garantizando…").
- **Relleno y muletillas** ("cabe destacar", "en el mundo actual", "en la era digital").
- **Conclusiones genéricas** y **signposting mecánico** ("en primer lugar… en segundo lugar…").
- **Tipografía inglesa**: comillas curvas → «latinas», raya sobreusada, *title case* en titulares.
- **Prosa sin alma** — y le inyecta voz, que es la mitad olvidada del trabajo.

### Cómo funciona

1. **Identifica** los patrones IA (busca racimos, no casos sueltos).
2. **Reescribe** conservando el significado y cubriendo todo el contenido.
3. **Auditoría en bucle**: borrador → autointerrogación ("¿qué sigue sonando a IA?") → reescritura final, con una rúbrica de 6 dimensiones (Claridad, Ritmo, Confianza, Autenticidad, Densidad, Alma; umbral 42/60; hasta 3 iteraciones).
4. **Entrega** el texto humanizado + un informe de los tics encontrados.

Es **prompt-puro**: las listas de palabras son *señales descriptivas con ejemplos, no prohibiciones*. La regla de oro: si quitar una palabra debilita la frase, es que la frase ya era débil; si la palabra es la correcta, se queda.

### Modos

- **Simple** (por defecto): voz natural y viva. Si aportas una muestra de tu escritura, se calibra a tu estilo.
- **Perfil de voz** (opcional): registros *cercano*, *corporativo*, *técnico* o *comercial*.

### Instalación

```bash
git clone https://github.com/vicentealvarezasencio/humanamente ~/.claude/skills/humanamente
```

O copia manual de la carpeta `humanamente/` (con `SKILL.md`, `README.md`, `LICENSE`) a `~/.claude/skills/`. Disponible en todos tus proyectos de Claude Code.

### Uso

El skill se activa solo cuando le pides editar o humanizar texto en español. Ejemplos:

- "Humaniza este texto: [pega el texto]"
- "Revisa este párrafo y quítale el tono de IA."
- "Humaniza esto en tono cercano. Aquí va una muestra de mi escritura: [muestra]"
- "Humaniza esto pero dame solo el texto, sin informe."

### Cómo validar que funciona

- **Texto IA puro** → debe eliminar los tics conservando el significado.
- **Texto humano bien escrito** → apenas debe tocarlo (mide falsos positivos).
- **Con muestra de voz** → el resultado se parece a tu estilo, no a un "limpio genérico".
- **Tipografía** → convierte comillas a «latinas», quita *title case*, respeta ¿¡.
- **Burstiness** → el texto final varía de verdad la longitud de frase.

---

## 🇬🇧 English

### What it is

English humanizers (like the excellent [`blader/humanizer`](https://github.com/blader/humanizer)) can process Spanish, but they steer by **English tells**: English vocabulary, examples, and typography. They miss the tells specific to Spanish AI text and carry over rules that don't apply in Spanish (title case, English curly quotes, etc.).

`humanamente` is a **fork relocalized to native Spanish**. Not a translation — an adaptation built around the real tics, examples, vocabulary, and typography of Spanish AI writing.

### How it works

Identify AI patterns → rewrite preserving meaning → run a self-audit loop (draft → "what still sounds like AI?" → final) scored on 6 dimensions (Clarity, Rhythm, Trust, Authenticity, Density, Soul; threshold 42/60; up to 3 iterations) → deliver the humanized text plus a short report of the tells found.

It is **prompt-only**: the word lists are *descriptive signals with examples, not blacklists*. Golden rule: if removing a word weakens the sentence, the sentence was already weak; if the word is the right one, it stays.

### Install

```bash
git clone https://github.com/vicentealvarezasencio/humanamente ~/.claude/skills/humanamente
```

Works in any Claude Code project. Trigger it by asking to humanize or edit Spanish text.

---

## Créditos / Credits

Basado en [`blader/humanizer`](https://github.com/blader/humanizer) (MIT) — la fuente canónica, apoyada en la guía de [Wikipedia: "Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

Incorpora ideas de:
- [`Hainrixz/humanizalo`](https://github.com/Hainrixz/humanizalo) — arquitectura del motor (categorías numeradas, bucle de autoauditoría, scoring de 6 dimensiones, principio del "alma").
- [`toniperea/humanizar-texto-es`](https://github.com/toniperea) — alma lingüística española (marcadores discursivos, regla 70/30, *burstiness*).

El banco de tics del español-IA y los ejemplos en castellano son originales de este proyecto.

## Licencia / License

[MIT](LICENSE). Conserva el copyright del original (Siqi Chen, 2025) y añade el de la adaptación (Vicente Álvarez Asencio, 2026).

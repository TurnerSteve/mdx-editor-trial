# Svelte Bridge markup project

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

- src/lib/.  
>-  markdown/
>-    markdownIt.ts             ← exports the configured markdown-it instance.  
>-    customSyntaxPlugin.ts     ← defines the {{custom:tag}} plugin.  
>-    customPlugin              ← deprecated  
>-    hydrate.                  ← deprecated  
>-    Markdown.svelte           ← deprecated  

-  components/
>- shared/
>>-    SuitSymbol.svelte.  
>>-    DealComponent.svelte.  
>>-    HandComponent.svelte.  
>>-    BidsComponent.svelte.  
>>-    UnknownCommand.svelte.   

-  markdown/
>- hydrate.ts
>- Markdown.svelte
>- markdownIt.ts
>- MarkdownRenderer.svelte
>- parseMarkdownTokens.ts

- stypes/
>-  prose.ts

- routes/
>-  test/

  

### Components are added like this and this is easily expanded

`
{{component:id key1:value1 key2:value2 ...}}
`

### Currently we have these component types

`
hand:id label:MyHand cards:T987.6.5432.AKQJ
`

`deal:id label:MyDeal N:AKxxxx.AJT.xxx.x E:xx.Qxx.Kxx.QTxxx W:JT9x.x.Jxxx.KJxx S:Q.K86532.AQxx.Ax
`


`
bids:id label:MyBids seq: - 1S.P.2H.P.3H.P.4C.P.5H.P.6H.P.P.P
`

# File Structure

src/
├── lib/
│   ├── components/
│   │   ├── DealComponent.svelte
│   │   ├── HandComponent.svelte
│   │   ├── BidsComponent.svelte
│   │   ├── SuitSymbol.svelte
│   │   ├── UnknownCommand.svelte
│   │   └── shared/
│   │       ├── parseBid.ts
│   │       ├── parseDeal.ts
│   │       └── parseHand.ts
│   │
│   ├── markdown/
│   │   ├── MarkdownRenderer.svelte
│   │   ├── markdownIt.ts
│   │   ├── parseMarkdownTokens.ts
│   │   ├── parseParams.ts
│   │   ├── validators/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── validateBids.ts
│   │   │   ├── validateDeal.ts
│   │   │   └── validateHand.ts
│   │   └── index.ts                # re-exporting parser, params, validators, markdownIt
│   │
│   ├── styles/
│   │   └── prose.css
│   │
│   ├── tests/
│   │   ├── bids1.md
│   │   ├── deal1.md
│   │   ├── hand1.md
│   │   └── Test0.svx
│   │
│   └── types.ts
│
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── test/
│       ├── +layout.svelte
│       └── +page.svelte


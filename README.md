# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

- src/lib/.  
>-  markdown/
>-    markdownIt.ts             ← exports the configured markdown-it instance.  
>-    customSyntaxPlugin.ts     ← defines the {{custom:tag}} plugin.  
-  components/.  
>-    SuitSymbol.svelte.  
>-    DealComponent.svelte.  
>-    UnknownCommand.svelte.   
-  Markdown.svelte             ← textarea + preview renderer

### Components are added like this and this is easily expanded

`
{{component:id key1:value1 key2:value2 ...}}
`

### Currently we have several 

`
hand:id label:MyHand cards:T987.6.5432.AKQJ
`

`deal:id label:MyDeal N:AKxxxx.AJT.xxx.x E:xx.Qxx.Kxx.QTxxx W:JT9x.x.Jxxx.KJxx S:Q.K86532.AQxx.Ax
`

`
bids:id label:MyBids seq: - 1S.P.2H.P.3H.P.4C.P.5H.P.6H.P.P.P
`

# Svelte Bridge markup project

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

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


### Simple Rule List for Bridge Bidding Validation

1.	Up to 3 dashes (-) allowed only at the start of the sequence. This determines the opening bidder.
2.	Contract bids (1–7 + C/D/H/S/NT) must strictly increase in level and follow suit order (C < D < H < S < NT) within the same level.
3.	A pass (P) is always allowed, but no more than 3 passes can occur consecutively.
4.	Three consecutive passes (P P P) end the auction — no further bids allowed afterward.
5.	A double (X) can only follow a contract bid or up to 2 passes after a contract bid.
6.	A redouble (XX) can only follow a double or up to 2 passes after a double.
7.	No bidding (contract, double, redouble, or pass) is allowed after 3 passes in a row.
8.	Any bid that breaks the sequence order or the above rules is invalid.

It is impossible to enter a legal contract that can be viewed !!

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


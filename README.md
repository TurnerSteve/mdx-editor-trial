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


### Bidding rules

- Contract bid: e.g. 1C, 2D, 7NT
- Special actions: P (Pass), X (Double), XX (Redouble)
- Skip token: - (denotes a missing bid — usually a placeholder for turn order)

- R1 Max 3 total skip (-) tokens allowed
- R2 Contract bid must be from 1C to 7NT
- R3 Contract levels must increase or stay same with higher suit
- R4 Contract suit order at same level: C < D < H < S < NT
- R5X (double) must follow a contract bid
- R6 XX (redouble) must follow a double
- R7 P (pass) must follow a contract, double, or redouble
- R8 No more than 3 passes in a row
- R9 Auction ends after 3 passes in a row (optional logic for completion check)
- R10 No skip allowed mid-sequence (optional strictness)
- First 4 bids determine the dealer and direction of play.
- Doubles and redoubles only apply to the last contract bid.
- Only one contract may be doubled or redoubled at a time.
- Opening bid must be a contract or pass — not double/redouble.


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


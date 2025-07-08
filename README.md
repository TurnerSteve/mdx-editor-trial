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

###  Rule List for Bridge Hand

	1.	Separator Count
	•	The raw string must contain exactly three . characters, producing four suit segments (in S → H → D → C order).
	2.	Card Count Limit
	•	Across all four segments you may have up to 13 cards; any more flags an error.
	3.	Allowed Symbols
	•	Each card token must be one of:
	•	Ranks: A, K, Q, J, T
	•	Pips: 2 through 9
	•	Wildcard: x
	•	Anything else (including digits outside 2–9, or other letters) is invalid.
	4.	No Duplicates (except wildcards)
	•	A specific card code (e.g. “Q”, “7”) may not appear more than once in the flattened hand—’x’ is exempt and may repeat.
	5.	Descending‐Order Within Each Suit
	•	Within each segment, tokens must follow strict descending order according to this ranking:

### Rule List for Bridge Bidding Validation

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
│   │   ├── demoDealBids.md
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


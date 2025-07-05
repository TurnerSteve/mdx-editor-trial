<script lang="ts">
  import MarkdownRenderer from '$lib/markdown/MarkdownRenderer.svelte';

  const demoMarkdown = `
### This is a test.

{{hand:Myhand cards:AKQJ.543.AKQ.42 label:North}}

{{deal:MyDeal , N:AKxxxx.AJT.xxx.x , E:xx.Qxx.Kxx.QTxxx , W:JT9x.x.Jxxx.KJxx , S:Q.K86532.AQxx.Ax label=ExampleDeal}}

{{bids:Mybids seq:1S.P.2H.P.3H.P.4C.P.5H.P.6H.P.P.P label:Auction}}
`;
</script>

<MarkdownRenderer markdownText={demoMarkdown} />






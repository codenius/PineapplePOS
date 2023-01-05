<script lang="ts">
    import { Button, Icon } from "sveltestrap";
    import type { Item } from "$lib/types/Item";

    export let id: Item['id']
</script>
<Button color="primary" outline><Icon name="pencil"></Icon></Button>
<Button on:click={(e)=>{e.stopPropagation()}} color="danger" outline><Icon name="trash"></Icon></Button>
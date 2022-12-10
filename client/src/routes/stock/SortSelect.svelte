<script lang="ts">
	import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "sveltestrap";

    export let options: []
</script>
<Dropdown>
    <DropdownToggle caret></DropdownToggle>
    <DropdownMenu>
        {#each options as option}
            <DropdownItem></DropdownItem>
        {/each}
    </DropdownMenu>
</Dropdown>
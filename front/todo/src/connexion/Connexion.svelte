<script>
    import SignInForm from './SignInForm/SignInForm.svelte'
    import SignUpForm from './SignUpForm/SignUpForm.svelte'
    let toggleSignType = true
</script>

<main>
    <button on:click={() => {toggleSignType = true}} class="{toggleSignType && 'selected'}">Sign In</button>
    <button on:click={() => {toggleSignType = false}} class="{!toggleSignType && 'selected'}">Sign Up</button>
    {#if toggleSignType} 
    <SignInForm/>
    {:else} 
    <SignUpForm/>
    {/if}
</main>

<style>
.selected {
	background-color: rgb(128, 130, 255);
	color: white;
}
</style>
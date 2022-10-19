<script>
    import { onMount } from 'svelte';
    import SignInForm from './SignInForm/SignInForm.svelte'
    import SignUpForm from './SignUpForm/SignUpForm.svelte'
    let toggleSignType = true
    let popUpData;
    $: {changeBtnFocusOnSignIn(popUpData)}

    const changeBtnFocusOnSignIn = (data) => {
        data?.isRegistered && (toggleSignType = true)
    }
</script>

<main>
    <p>{popUpData?.isRegistered ? popUpData.msg : ''}</p>
    <button on:click={() => {toggleSignType = true}} class="{toggleSignType && 'selected'}">Sign In</button>
    <button on:click={() => {toggleSignType = false}} class="{!toggleSignType && 'selected'}">Sign Up</button>
    {#if toggleSignType} 
    <SignInForm/>
    {:else} 
    <SignUpForm bind:signUpData={popUpData}/>
    {/if}
</main>

<style>
.selected {
	background-color: rgb(128, 130, 255);
	color: white;
}
</style>
<script>
  import Connexion from './connexion/Connexion.svelte'
  import Todo from './todo/TodoVue.svelte';
  import { userData } from './store/store';
</script>

<main>

  <h1>Online todo-list</h1>

  <div class="connexion-box">
    {#if !$userData.isConnected} 
    <Connexion/>
    {:else} 
    <Todo userId={$userData.id}/>
    {/if}
  </div>


</main>

<style>
</style>

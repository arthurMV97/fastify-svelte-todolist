<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    export let userId;
    export let newTask;
    let previousTask
    let taskList = []

    $: {if(newTask?.task?.length > 0 && newTask !== previousTask){
        taskList = [...taskList, newTask]
        previousTask = newTask
    }}


    onMount((async () => {
        axios.get(`http://localhost:8080/todo/${userId}`)
        .then((res) => {
           taskList = res.data
        })
        .catch(err => console.log(err))
    }))

</script>

<main>
    <button on:click={() => console.log(previousTask, newTask)}>AAAAA</button>
    <ul>
  {#each taskList as item}
  <li>{item.task} </li>
  {:else}
  <li>Empty list</li>
  {/each}
</ul>

</main>
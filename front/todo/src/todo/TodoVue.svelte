<script>
    import ListOfTodos from "./ListOfTodos.svelte";
    import axios from 'axios'
    export let userId;
    let taskToAdd = {
        userId,
        task: ''
    };
    let newTaskToAdd;
    const notifyError = {
        isError:false,
        msg: "An error has occurred while adding a new task. Please try later. \nIf the error persists, contact us."
    }
    const handleSubmit = () => {
        if (taskToAdd.task.length > 0) {
            axios.post(`http://localhost:8080/todo/${userId}`, taskToAdd)
            .then(() => {
                let count = 1
                newTaskToAdd = taskToAdd
                count++
            console.log(count)})
            .catch((err) => {
                if (err) {
                    notifyError.isError = true
                }
            })
        }
    }
</script>

<main>
    <ListOfTodos userId={userId} newTask={newTaskToAdd}/>
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" bind:value={taskToAdd.task}/>
        <input type="submit" value="Add Todo"/>
        <p>{notifyError.isError ? notifyError.msg : ''}</p>
    </form>
</main>
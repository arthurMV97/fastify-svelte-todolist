
<script>
    let user = {}
</script>
<main>
    <h3>Sign In</h3>
    <form>
    <label for="nickname">Nickname:</label>
    <input type="text" name="nickname" bind:value={user.nickname} />
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={user.password} />
    <label for="confirm">Confirm password:</label>
    <input type="password" name="confirm" bind:value={user.confirm} />
    <input type="submit" value="Submit"/>
    </form>
</main>

<script>
    import axios from 'axios'
    let user = {}
    let confirmationPassInput;
    let wrongPassMsg = ''
    let nicknameTakenMsg= '';
    export let signUpData = {
        isRegistered: false,
        msg: ''
    }
    const isPasswordConfirmed = (initialPass, confirmPass) => initialPass === confirmPass
    const handleSubmit = () => {
        if(isPasswordConfirmed(user.password, confirmationPassInput)) {
            axios.post('http://localhost:8080/user', user)
            .then((res) => {
                signUpData = {isRegistered: true, msg: res.data}
            }).catch(err => {
                if (err.response.status === 400) {
                    nicknameTakenMsg = err.response.data
                }
            })
        } else {
            wrongPassMsg = 'Passwords are not the same'
        }
    }
</script>
<main>
    
    <h3>Sign Up</h3>
    <form on:submit|preventDefault={handleSubmit}>
    <label for="nickname">Nickname:</label>
    <input type="text" name="nickname" bind:value={user.nickname} />
    <p>{nicknameTakenMsg}</p>
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={user.password} minlength="8" />
    <p>Password should contain at least 8 characters</p>
    <label for="confirm">Confirm password:</label>
    <input type="password" name="confirm" bind:value={confirmationPassInput} minlength="8" />
    <p>{wrongPassMsg}</p>
    <input type="submit" value="Submit"/>
    </form>
</main>
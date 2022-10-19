
<script>
    import axios from 'axios';
    import { userData } from '../../store/store';

    let user = {}
    let error = {
        nickname: false,
        password: false,
        msg: ''
    }
    const handleSubmit = () => {
        axios.post('http://localhost:8080/sign-user', user)
            .then(res => {
                $userData = res.data
                $userData.isConnected = true
                })
            .catch(err => {
                if (err.response.status === 401) {
                    error.password = true;
                    error.msg = err.response.data
                } else {
                    error.nickname = true;
                    error.msg = err.response.data
                }
            })}
        
</script>
<main>
    <h3>Sign In</h3>
    <form on:submit|preventDefault={handleSubmit}>
    <label for="nickname">Nickname:</label>
    <input type="text" name="nickname" bind:value={user.nickname} />
    <p>{error.nickname ? error.msg : ''}</p>
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={user.password} />
    <p>{error.password ? error.msg : ''}</p>
    <input type="submit" value="Submit" />
    </form>
</main>
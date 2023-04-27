<script>
    import {BASE_URL} from "../../store/globalStore.js";
    import toast, {Toaster} from "svelte-french-toast";
    import {navigate} from "svelte-navigator";

    let user = {
        username: "",
        password: ""
    }

    async function handleLogin() {
        let response = await fetch($BASE_URL + '/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        let result = await response.json();
        if(result.username === user.username) {
            console.log("f_session: " + result.username);
            toast.success("login confirmed");
            setTimeout(()=>navigate("/user"), 1500);
        }
        else {
            toast.error("unsuccessful login")
        }
    }
</script>

<a href="/">Home</a>
<div class="c-div">
    <div class="login-div">
        <h1 class="login-title">Login</h1>
        <div class="form-div">
            <form>
                <div>
                    <label for="un">username</label>
                    <input id="un" bind:value={user.username} type="text">
                </div>
                <div>
                    <label for="pw">password</label>
                    <input id="pw" bind:value={user.password} type="password">
                </div>
            </form>
            <div>
                <button class="login-button" on:click={handleLogin}>
                    LogIn
                </button>
            </div>
        </div>
    </div>
</div>
<Toaster/>
<script>
    import {BASE_URL} from "../../store/globalStore.js";
    import {navigate} from "svelte-navigator";
    import {onMount} from "svelte";
    import toast, {Toaster} from "svelte-french-toast";

    let auth = false;
    let email = {
        subject: "",
        text: "",
        from: ""
    }
    let sessionUser;
    onMount(async () => {
        const response = await fetch($BASE_URL + "/test/session", {
            credentials: "include"
        });
        if (response.status === 401) {
            toast.error("unauthorized");
            setTimeout(() => navigate("/"), 2000);
        } else {
            auth = true;
            const {sessionUsername} = await response.json();
            sessionUser = sessionUsername;
        }
    });

    async function handleLogOut() {
        const response = await fetch($BASE_URL + "/logout", {
            credentials: "include"
        });
        const {message} = await response.json();
        console.log(message);
        navigate("/");
    }

    async function handleContact() {
        const response = await fetch($BASE_URL + "/email", {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(email)
        });
        const {url} = await response.json();
        if(response.status === 416) {
            toast.error("error sending email");
        } else {
            toast.success("email successfully sent");
            document.getElementById("f1").reset();
            setTimeout(()=>window.open(url), 1500);
        }
    }
</script>
{#if (!auth)}
    <h1>Unauthorized</h1>
{:else}
    <h1>Welcome {sessionUser}</h1>
    <button on:click={handleLogOut}>Logout</button>
    <div class="c-div">
        <div class="login-div" style="min-height: 600px">
            <h1 class="login-title">Contact</h1>
            <div class="form-div">
                <form id="f1">
                    <div>
                        <label for="un">email</label>
                        <input id="un" bind:value={email.from} type="email" placeholder="your email address">
                    </div>
                    <div>
                        <label for="pw">subject</label>
                        <input id="pw" bind:value={email.subject} type="text" placeholder="subject">
                    </div>
                    <div>
                        <label for="tx">text</label>
                        <textarea id="tx" cols="10" rows="10" bind:value={email.text} placeholder="write your email here"></textarea>
                    </div>
                </form>
                <div>
                    <button class="login-button" on:click={handleContact}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
<Toaster/>
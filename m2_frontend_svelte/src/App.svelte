<script>
    import {Router, Route} from "svelte-navigator";
    import LoginPage from "./assets/pages/LoginPage.svelte";
    import RegisterPage from "./assets/pages/RegisterPage.svelte";
    import UserPage from "./assets/pages/UserPage.svelte";
    import HomePage from "./assets/pages/HomePage.svelte";

</script>
<Router>
    <Route path="/" component={HomePage} primary={false}/>
    <Route path="register" component={RegisterPage} primary={false}/>
    <Route path="login" component={LoginPage} primary={false}/>
    <Route path="user" component={UserPage} primary={false}/>
</Router>

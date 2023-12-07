<template>
    <body class="container">

    <main>
    <div class="mt-4 p-5 bg-secondary bg-gradient rounded text-white">
        <h1>Coming Soon</h1>
    </div>
    </main>

    </body>
</template>

<script>
    export default {
        name: "HomeView",
        data () {

        },
        computed: {
            currentUser() {
                return this.$store.state.user;
            },
        },
    }
</script>
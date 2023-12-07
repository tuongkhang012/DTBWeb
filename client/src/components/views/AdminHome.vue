<template>
    <body class="container">

    <main>
    <div v-if="currentUser" class="mt-4 p-5 bg-secondary bg-gradient rounded text-white">
        <h1>Welcome back, Admin!</h1>
    </div>
    </main>

    </body>
</template>

<script>
    export default {
        name: "AdminHome",
        data () {

        },
        computed: {
            currentUser() {
                return this.$store.state.user;
            },
        },
    }
</script>
<template>
    <body class="container">

    <main>
    <div v-if="currentUser" class="mt-4 p-5 bg-secondary bg-gradient rounded text-white">
        <h1>Welcome back, {{ currentUser.StudentInfo.Name }}!</h1>
    </div>
    </main>

    </body>
</template>

<script>
    export default {
        name: "StudentHome",
        data () {

        },
        computed: {
            currentUser() {
                return this.$store.state.user;
            },
        },
    }
</script>
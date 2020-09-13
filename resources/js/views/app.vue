<template>
   <router-view></router-view>
</template>

<script>
// import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
    export default {
        name: 'App',
        data() {
            return {
                currentRoute: window.location.pathname
            }
        },
        computed:{
            layout(){
               
                    return this.$route.meta.layout? this.$route.meta.layout : defaultLayout
                
            }
             
        },
        mount() {
            console.log('test')
        }
    }
</script>
<style scoped>

</style>
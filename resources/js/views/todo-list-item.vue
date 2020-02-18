<template>
    
</template>
<script>
export default {
name:'todolistitem',
props:'[todos]',
data(){
    return{
        todos:this.props.todos
    }
}
}
</script>
<style scoped>

</style>
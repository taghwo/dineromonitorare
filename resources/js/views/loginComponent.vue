<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        
                        <form @submit.prevent="loginUser()">
                            <input v-model="email" placeholder="email">
                            <span v-if="errors.email" class="help-block text-danger">{{errors.email[0]}}</span>
                            <input v-model="password" type="password" placeholder="password">
                            <span v-if="errors.password" class="help-block">{{errors.password[0]}}</span>
                            <br>
                            <button type="submit">Login</button>
                            <span v-if="message">{{message}}</span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                email:'',
                password:'',
                errors:[],
                message:''
            }
        },
        mounted() {
            console.log('Component mounted.')

            this.User();
        },
        methods:{
            User(){
                setInterval( () => {
                     let config =
                     { headers: {'accept': 'application/json' }}

                     axios.get('/authuser',config)
                    .then(res => {
                        if(res.data.status == 'success'){
                            console.log(res.data);
                            this.message = res.data.data.name

                            //  location.reload()
                        }
                    
                    })
                .catch(error => {
                //   this.loading = false;
                if(error.response.data.status == 'social-login' || error.response.data.status == 'Invalid-credentials'){
                this.message = error.response.data.message
                this.errors.email = ''
                this.errors.password =''
                }else{
                    this.errors = error.response.data.errors
                    this.message = ''

                }
                })
                },5000)
            },
            loginUser(){
                    const email = this.email;
                    const password = this.password

                    const cred = {
                        email: this.email,
                        password: this.password
                    }

                     let config =
                     { headers: {'accept': 'application/json' }}

                     axios.post('/auth/login-user',cred,config)
                    .then(res => {
                        if(res.data.status == 'success'){
                            this.message = 'Logged in ...'
                             location.reload()
                        }
                    
                    })
                .catch(error => {
                //   this.loading = false;
                if(error.response.data.status == 'social-login' || error.response.data.status == 'Invalid-credentials'){
                this.message = error.response.data.message
                this.errors.email = ''
                this.errors.password =''
                }else{
                    this.errors = error.response.data.errors
                    this.message = ''

                }
                })
                }
                }
    }
</script>

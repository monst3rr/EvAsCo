<template>
  <div>
    <b-form-input v-model="text1"
                  class="text-center"
                  size="lg"
                  type="text"
                  placeholder="Enter your message"></b-form-input>
    <p></p>
    <b-button variant="primary" @click="PostMessage">Post Message</b-button>
  </div>
</template>

<script>
const axios = require('axios');


export default {
  data () {
    return {
      text1: ''
    }
  },
  methods:{
      PostMessage:function(){
        axios.post('/api/v1/message', {
            message: this.text1
        })
        .then(function (response) {
            this.text1=''
            // this.$store.dispatch("setMessage",response.data)
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        }.bind(this));
      }
  },
  mounted:function(){

  }
}
</script>
<style>

</style>

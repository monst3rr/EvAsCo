<template>
  <div id="app">
    <b-container fluid>
        <b-row class="text-center">
            <b-col col lg="3"></b-col>
            <b-col cols="6">
              <img alt="logo" src="./assets/message.png">
              <Input></Input>
            </b-col>
            <b-col col lg="3"></b-col>
        </b-row>
        <p></p>
        <br>
        <p></p>
        <b-row class="text-center">
            <b-col col lg="2"></b-col>
            <b-col cols="8">
              <b-card bg-variant="light"
                      header="Messages"
                      class="text-center">
                  <p class="card-text" style="height:50vh;overflow-y:scroll;">
                    <b-list-group>
                      <ListModal v-for="(msg,i) in messages" :message="msg" :key="i"></ListModal>
                    </b-list-group>
                  </p>
              </b-card>
            </b-col>
            <b-col col lg="2"></b-col>
        </b-row>
    </b-container>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Input from './components/Input.vue'
import ListModal from './components/ListModal.vue'
const io = require('socket.io-client');
var socket = io();

export default {
  name: 'app',
  data(){
    return{
      id:'modal-center'
    }
  },
  computed:{
    messages:function(){
      return this.$store.getters.getMessages;
    }
  },
  mounted:function(){
    this.$store.dispatch("setMessages",null)

    socket.on('message', function(msg){
      this.$store.dispatch("setMessage",msg)
    }.bind(this));
    socket.on('delete', function(id){
      this.$store.dispatch("deleteMessage",id)
    }.bind(this));
  },
  components: {
    HelloWorld,
    Input,
    ListModal
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>

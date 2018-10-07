<template>
    <b-list-group-item @click="showModal" href="#">
        {{message.message}}

            <b-button size="md" variant="link" class="float-right" @click="Delete($event)">
                Delete
            </b-button>

        <b-modal ref="myModalRef" centered title="Details" no-close-on-backdrop="true" @hidden="hidden">
            <p class="my-4">{{message.message}}</p>
            <div slot="modal-footer" class="w-100">

                <img v-if="loading" class="float-left" src="./../assets/tenor.gif" alt="Loading..." style="height:40px;width:70px;">
                <b-badge variant="primary" pill class="float-left" v-if="!loading">{{palindrome}}</b-badge>
                <b-btn size="md" class="float-right" variant="primary" @click="checkPalindrome">
                Property
                </b-btn>
            </div>
        </b-modal>
    </b-list-group-item>
</template>

<script>
import axios from 'axios'
export default {
  props:["message"],
  data(){
      return{
          palindrome:'',
          loading:false
      }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    hidden(){
      this.palindrome=''
    },
    checkPalindrome(){
        this.loading=true;
      var url="/api/v1/palindrome/"+this.message._id
      axios.get(url)
        .then(function(response){
            var status=response.data.status
            if(status)
                this.palindrome=" Palindrome "
            else{
                this.palindrome= " Not Palindrome "
            }
            this.loading=false;
        }.bind(this))
    },
    Delete(event){
        var url="/api/v1/message/"+this.message._id
        this.$store.dispatch("deleteMessage",this.message._id)
        axios.delete(url).then(function(response){

        }.bind(this))
        event.stopPropagation();
    }
  },
  mounted:function(){

  }
}
</script>

<style>

</style>

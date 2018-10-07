import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        messages:[]
    },
    getters:{
        getMessages(state){
            return state.messages;
        }
    },
    mutations:{
        setMessages(state,data){
            state.messages=data;
        },
        setMessage(state,data){
            state.messages.unshift(data)
        },
        deleteMessage(state,data){
            var result=state.messages.filter(item=>{
                if(item._id!=data){
                    return true;
                }else{
                    return false;
                }
            })
            state.messages=result;
        }
    },
    actions:{
        setMessages(context,payload){
            axios.get('/api/v1/message')
                .then(function(response){
                    context.commit('setMessages',response.data.messages)
                })
                .catch(function(error){
                    
                })
        },
        setMessage(context,payload){
            context.commit('setMessage',payload)
        },
        deleteMessage(context,payload){
            context.commit('deleteMessage',payload)
        }
    }
})

export default store;
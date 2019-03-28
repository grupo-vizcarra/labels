import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'http';

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          innerpack:false,
          finder:{item:''},
          labels:[],
          labstoprint:'green',
          prices:{ use:true, ids:[1,2,3] },
          pricelists:[],
          print:{ devices:[], selected:''}
     },
     mutations: {
          addLabel(state,data){ state.labels.unshift(data);},
          removeLabel(state,idx){ state.labels.splice(idx,1)},
          setUseIpack(state,val){ state.innerpack = val},
          setLabsToPrint(state,val){state.labstoprint=val},
          setPriceListsUse(state,ids){
               state.prices.ids = ids
               if(state.prices.ids.length==0){
                    state.prices.use = false
               }
          }
     },
     actions:{
          addLabel(context,data){ context.commit('addLabel',data); }
     }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'http';

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          innerpack:false,
          finder:{item:''},
          labels:[
               {
                    "type":"std",// articulo standard
                    "tool":true,//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[
                         {"idlist":1,"labprint":"MAY","price":225},
                         {"idlist":2,"labprint":"MEN","price":230},
                         {"idlist":3,"labprint":"DOC","price":235}
                    ]
               }
          ],
          prices:{
               use:true,
               ids:[1,2,3]
          },
          pricelists:[],
          printers:[]
     },
     mutations: {
          addLabel(state,data){ state.labels.push(data); this.state.finder.item = '';},
          removeLabel(state,idx){ state.labels.splice(idx,1)},
          setUseIpack(state,val){ state.innerpack = val},
          setPriceListsUse(state,ids){
               state.prices.ids = ids
               if(state.prices.ids.length==0){
                    state.prices.use = false
               }
          }
     },
     actions:{
          addLabel(context,data){
               context.commit('addLabel',data);
          }
     }
})

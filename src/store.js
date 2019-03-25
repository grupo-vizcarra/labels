import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          innerpack:false,
          labels:[
               {
                    "type":"std",// articulo standard
                    "tool":false,//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[
                         {"idlist":1,"labprint":"MAY","price":225},
                         {"idlist":2,"labprint":"MEN","price":230},
                         {"idlist":3,"labprint":"DOC","price":235}
                    ]
               },
               {
                    "type":"std",// articulo standard
                    "tool":false,//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[
                         {"idlist":1,"labprint":"MAY","price":225},
                         {"idlist":3,"labprint":"DOC","price":235}
                    ]
               },
               {
                    "type":"my",// articulo de mayoreo
                    "tool":'C',//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[{"idlist":null,"labprint":"MAYOREO","price":230}]
               },

               {
                    "type":"my",// articulo de mayoreo
                    "tool":'CC',//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[{"idlist":null,"labprint":"MAYOREO","price":230}]
               },

               {
                    "type":"my",// articulo de mayoreo
                    "tool":false,//con carrito?
                    "item":"LP-5678",
                    "ipack":18,
                    "scode":"56923",
                    prices:[{"idlist":null,"labprint":"MAYOREO","price":230}]
               },
               {
                    "type":"off",// el articulo es oferta
                    "tool":false,//con carrito?
                    "item":"MOC-9632",
                    "ipack":18,
                    "scode":"56923",
                    prices:[{"idlist":null,"labprint":"OFERTA","price":230}]
               }
          ]
     },
     mutations: {
          addLabel(state,data){
               state.labels.push(data)
          },
          setIpack(state,val){
               state.innerpack = val
          }
     },
     actions: {

     }
})

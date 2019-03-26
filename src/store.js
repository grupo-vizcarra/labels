import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'http';

Vue.use(Vuex)

export default new Vuex.Store({
     state: {
          innerpack:false,
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
          ],
          pricelists:[
               {"id":1,"name":"Mayoreo","labelprint":"MAY"},
               {"id":2,"name":"Menudeo","labelprint":"MEN"},
               {"id":3,"name":"Docena","labelprint":"DOC"},
               {"id":4,"name":"Caja","labelprint":"CAJ"}
          ],
          usepriceslists:[1,2,3]
     },
     mutations: {
          addLabel(state,data){ state.labels.push(data)},
          setUseIpack(state,val){ state.innerpack = val},
          setPriceListsUse(state,pricesuse){ state.usepriceslists = pricesuse}
     }
})

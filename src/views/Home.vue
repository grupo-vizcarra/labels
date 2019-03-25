<template>
     <div>
          <!-- 
               ================================================================
               =============== C O L U M N A  F I J A  I Z Q. =================
               ================================================================
          -->
               <v-navigation-drawer fixed v-model="drawer" clipped app >
                    <v-list subheader three-line >
                         <v-subheader>Precios</v-subheader>
                         <v-container fluid>
                              <p><small>Seleccione los precios que desea agregar a las etiquetas</small></p>
                              <v-switch 
                                   v-for="pricelist in priceLists" :key="pricelist.id" 
                                   v-model="useprices"
                                   color="success"
                                   :label="'['+pricelist.labelprint+'] '+pricelist.name" 
                                   :value="pricelist.id"
                              >
                              </v-switch>
                         </v-container>

                         <v-divider></v-divider>
                         <v-container fluid>
                              <v-switch 
                                   v-model="innerpack"
                                   color="info"
                                   label="Piezas por caja" 
                                   :value="true"
                              >
                              </v-switch>
                         </v-container>
                    </v-list>
               </v-navigation-drawer>
               <!-- SEGUNO OVERLAY, LADO IZQUIERDO -->
               <!-- <v-navigation-drawer temporary v-model="left" fixed >ovrlay 2 left side</v-navigation-drawer> -->

          <!-- 
               ================================================================
               ======================== C A B E C E R A =======================
               ================================================================
          -->
               <v-toolbar color="purple" dark fixed app clipped-right >
                    <v-btn flat icon color="white" @click.stop="drawer = !drawer"> <v-icon>settings</v-icon> </v-btn>
                    <span>Grupo Vizcarra | Etiquetas</span>
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon> -->
                    <v-btn flat icon color="white" @click.stop="drawerRight = !drawerRight"> <v-icon>menu</v-icon> </v-btn>
               </v-toolbar>

          <!-- 
               ================================================================
               ================== M A I N  W R A P P E R ======================
               ================================================================
          -->
                    <v-container fluid grid-list-sm id="mainwrapper">
                         <v-layout row wrap>
                              <v-flex v-if="labels.length==0">
                                   <h1>No has agregado etiquetas</h1>
                              </v-flex>
                              <v-flex v-for="(label, index) in labels" :key="index">
                                   <v-card
                                        class="mx-auto"
                                        :class="{_green:label.type=='std'||label.type=='my',_orange:label.type=='off',label}"
                                   >
                                        <v-card-title>
                                             <v-list-tile-avatar color="grey darken-3">
                                                  <v-img class="elevation-3"
                                                       src="https://cdn4.iconfinder.com/data/icons/product-management-flat-icons/270/Product_Box-512.png"
                                                  ></v-img>
                                             </v-list-tile-avatar>

                                             <v-list-tile-content>
                                                  <v-list-tile-title class="headline font-weight-bold">{{ label.scode }}</v-list-tile-title>
                                             </v-list-tile-content>

                                             <v-spacer></v-spacer>

                                             <v-list-tile-content>
                                                  <v-btn fab dark small color="error">
                                                       <v-icon dark>close</v-icon>
                                                  </v-btn>
                                             </v-list-tile-content>
                                        </v-card-title>

                                        <div class="txt_a_c headline font-weight-light">
                                             {{ label.item }}
                                        </div>
                                        <div class="txt_a_c" v-if="innerpack">
                                             {{ label.ipack }} pzs
                                        </div>

                                        <v-card-text>
                                             <div class="txt_a_c" v-if="label.type=='off'">
                                                  <div class="title"> {{ label.prices[0].labprint }}</div>
                                                  <div class="display-3 font-weight-bold"> {{ label.prices[0].price }}</div>
                                             </div>

                                             <div class="txt_a_c" v-if="label.type=='my'">
                                                  <div class="title"> {{ label.prices[0].labprint }}</div>
                                                  <div class="display-3 font-weight-bold"> {{ label.prices[0].price }}</div>
                                             </div>

                                             <div v-if="label.type=='std'">
                                                  <table border="0" width="50%" style="margin:0 auto;">
                                                       <tr v-for="(prices, index) in label.prices" :key="index">
                                                            <td><h2>{{ prices.labprint }}</h2></td>
                                                            <td><h2>{{ prices.price }}</h2></td>
                                                       </tr>
                                                  </table>
                                             </div>
                                        </v-card-text>
                                   </v-card>
                              </v-flex>
                         </v-layout>
                    </v-container>

          <!-- 
               ================================================================
               =============== C O L U M N A  F I J A  D E R. =================
               ================================================================
          -->
               <v-navigation-drawer fixed v-model="drawerRight" right clipped app >
                    <!-- <v-list dense>
                         <v-list-tile @click.stop="right = !right">
                              <v-list-tile-action> <v-icon>exit_to_app</v-icon> </v-list-tile-action>
                              <v-list-tile-content> <v-list-tile-title>Columna fija derecha</v-list-tile-title> </v-list-tile-content>
                         </v-list-tile>
                    </v-list> -->
                    <v-list subheader three-line >
                         <v-subheader>Imprimir</v-subheader>
                         <v-container fluid>
                              <p><small>Seleccione las etiquetas a imprimir</small></p>
                              <v-radio-group v-model="labelsprint" row>
                                   <v-radio color="info" label="Estandard" value="greens"></v-radio>
                                   <v-radio color="info" label="Ofertas" value="orange"></v-radio>
                              </v-radio-group>

                              <p><small>Seleccione impresora</small></p>
                              <v-radio-group v-model="printer" column>
                                   <v-radio color="info" label="Ventas" value="printer1"></v-radio>
                                   <v-radio color="info" label="Ventas 2" value="printer2"></v-radio>
                                   <v-radio color="info" label="Bodega" value="printer3"></v-radio>
                              </v-radio-group>
                              <v-btn color="success"><v-icon>local_printshop</v-icon></v-btn>
                         </v-container>

                         <v-divider></v-divider>
                    </v-list>
               </v-navigation-drawer>
               
               <!-- SEGUNO OVERLAY, LADO DERECHO -->
               <!-- <v-navigation-drawer right temporary v-model="right" fixed ></v-navigation-drawer> -->

          <!-- 
               ================================================================
               ========================= F O O T E R ==========================
               ================================================================
          -->
               <v-footer color="white" class="white--text" app>
                    <div class="finder" fixed fluid>
                         <v-form>
                              <v-layout row>
                                   <v-flex xs12 lg3>
                                        <v-text-field
                                             outline
                                             :label="labelforsearch"
                                             @focus="helpForSearch(true)"
                                             @blur="helpForSearch(false)"
                                             :type="typefieldsearch"
                                             v-model="ipttocreatelabel"
                                             id="ipttocreatelabel"
                                             prepend-icon="art_track"
                                             hint="..."
                                        >
                                        </v-text-field>
                                   </v-flex>

                                   <v-flex>
                                        <v-btn
                                             id="btntglkeyboard"
                                             flat icon @click="toggleKeyboardType()"
                                             :class="{keyboard_active: keyboardtype}"
                                        >
                                             <v-icon>spellcheck</v-icon>
                                        </v-btn>
                                   </v-flex>
                              </v-layout>
                         </v-form>
                    </div>
               </v-footer>
     </div>
</template>

<script>

export default {
     props:{ source:String },
     data(){
          return {
               drawer: false,
               drawerRight: false,
               right: null,
               left: null,
               labelsprint:'greens',
               printer:'',
               ipttocreatelabel:'',
               typefieldsearch:'number',
               keyboardtype:false,
               innerpack:true,
               priceLists:[
                    {"id":1,"name":"Mayoreo","labelprint":"MAY"},
                    {"id":2,"name":"Menudeo","labelprint":"MEN"},
                    {"id":3,"name":"Docena","labelprint":"DOC"},
                    {"id":4,"name":"Caja","labelprint":"CAJ"}
               ],
               useprices:[1,2,3],
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
               ],
               labelforsearch:'Generar etiqueta'
          }
     },
     methods:{
          helpForSearch(op){
               let text = op ? 'Ingrese codigo o codigo corto' : 'Generar etiqueta';
               this.labelforsearch = text;
          },
          toggleKeyboardType(){
               this.keyboardtype = !this.keyboardtype

               if(this.keyboardtype){
                    this.typefieldsearch = 'text';
               }else{
                    this.typefieldsearch = 'number';
               }

               document.getElementById("ipttocreatelabel").focus();
          }
     }
}
</script>

<style lang="scss">
     .see{ border:4px solid red; }
     .see2{ border:2px dashed blue; }
     .see3{ border:2px dotted green; }
     .see4{ border:4px solid red; }

     ._green{  background: rgba(#00b894,.8) !important; }
     ._orange{  background: rgba(#e17055,.8) !important; }

     #mainwrapper{
          padding-bottom: 75px !important;

          .txt_a_c{
               text-align: center;
          }
     }

     .v-footer{
          height: auto!important;
          border-top:2px solid purple !important;
          background: rgba(#fff,.95)!important;
          // border:4px solid greenyellow!important;

          .finder{
               padding: 5px;

               #btntglkeyboard{ opacity: 0.3; }
               .keyboard_active{ opacity: 1!important; }
               // border: 3px solid  red;
               margin:0 auto;
          }
     }
</style>

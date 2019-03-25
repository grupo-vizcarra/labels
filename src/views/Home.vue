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
                                   v-model="ipack"
                                   :value="innerpack"
                                   color="info"
                                   label="Piezas por caja"
                                   @change="setIpack"
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
                         <Labels />
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
                    <LabFinder/>
               </v-footer>
     </div>
</template>

<script>

import Labels from '@/components/LabelsComp.vue'
import LabFinder from '@/components/LabFinderComp.vue'
import {mapState, mapMutations} from 'vuex' 

export default {
     props:{ source:String },
     components:{Labels,LabFinder},
     data(){
          return {
               drawer: false,
               drawerRight: false,
               right: null,
               left: null,

               ipack:false,
               labelsprint:'greens',
               printer:'',
               priceLists:[
                    {"id":1,"name":"Mayoreo","labelprint":"MAY"},
                    {"id":2,"name":"Menudeo","labelprint":"MEN"},
                    {"id":3,"name":"Docena","labelprint":"DOC"},
                    {"id":4,"name":"Caja","labelprint":"CAJ"}
               ],
               useprices:[1,2,3]
          }
     },
     computed: {
          ...mapState(['innerpack'])
     },
     methods: {
          ...mapMutations(['setIpack'])
     },
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

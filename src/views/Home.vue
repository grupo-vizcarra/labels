<template>
     <div>
          <!-- 
               ================================================================
               =============== C O L U M N A  F I J A  I Z Q. =================
               ================================================================
          -->
               <v-navigation-drawer fixed v-model="drawer" clipped app >
                    <MenuLeft/>
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
                    <span>Grupo Vizcarra | Etiquetas ({{labels.length}})</span>
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
               <v-navigation-drawer fixed v-model="drawerRight" right clipped app>
                    <!-- <v-list dense>
                         <v-list-tile @click.stop="right = !right">
                              <v-list-tile-action> <v-icon>exit_to_app</v-icon> </v-list-tile-action>
                              <v-list-tile-content> <v-list-tile-title>Columna fija derecha</v-list-tile-title> </v-list-tile-content>
                         </v-list-tile>
                    </v-list> -->
                    <MenuRight/>
               </v-navigation-drawer>
               
               <!-- SEGUNO OVERLAY, LADO DERECHO -->
               <!-- <v-navigation-drawer right temporary v-model="right" fixed ></v-navigation-drawer> -->

          <!-- 
               ================================================================
               ========================= F O O T E R ==========================
               ================================================================
          -->
               <v-footer class="white--text" app>
                    <LabFinder/>
               </v-footer>
     </div>
</template>

<script>

import Labels from '@/components/LabelsComp.vue'
import LabFinder from '@/components/LabFinderComp.vue'
import MenuLeft from '@/components/MenuLeftComp.vue'
import MenuRight from '@/components/MenuRightComp.vue'

import PriceListsAPI from '@/services/api/PriceLists.js'
import PrintersAPI from '@/services/api/Printers.js'

import {mapState} from 'vuex'

export default {
     props:{ source:String },
     components:{Labels,LabFinder,MenuLeft,MenuRight},
     data(){
          return {
               drawer: false, drawerRight: false,
               right: null, left: null
          }
     },
     created(){
          PriceListsAPI.all().then(pricelists => {
               this.$store.state.pricelists = pricelists;
               console.log("Listas de precios montadas");
               console.log(pricelists);

               // PrintersAPI.all().then(printers => {
               //      this.$store.state.print.devices = printers;
               //      console.log("Impresoras montadas");
               //      console.log(printers);
               // });

               let labelsstorage = JSON.parse(localStorage.getItem("labels"));
                    // console.log(labelsstorage);
               if(labelsstorage!=null){ this.$store.state.labels = labelsstorage; }
          }).catch(error => {
               alert(error);
          });
     },
     mounted() {
          console.log('Componente Home montado');
     },
     computed: {
          ...mapState(['labels'])
     }
}
</script>

<style lang="scss">
     .see{ border:4px solid red; }
     .see2{ border:2px dashed blue; }
     .see3{ border:6px dotted green; }
     .see4{ border:4px solid red; }

     ._green{  background: rgba(#00b894,.8) !important; }
     ._orange{  background: rgba(#e17055,.8) !important; }

     #mainwrapper{
          padding-bottom: 75px !important;

          .txt_a_c{ text-align: center; }
     }

     .v-footer{
          height: auto!important;
          border-top:1px solid rgba(0,0,0,0.12) !important;
          background: rgba(#fff,.95)!important; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

          .finder{
               padding: 5px;

               #btntglkeyboard{ opacity: 0.3; }
               .keyboard_active{ opacity: 1!important; }
               // border: 3px solid  red;
               margin:0 auto;
          }
     }
</style>

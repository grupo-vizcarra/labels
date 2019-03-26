<template>
     <v-list subheader three-line >
          <v-subheader>
               <v-switch
                    v-model="prices.use"
                    color="info"
                    label="Precios"
               >
               </v-switch>
          </v-subheader>
          <v-container fluid v-if="prices.use">
               <p><small>Seleccione los precios que desea agregar a las etiquetas</small></p>
               <span v-if="pricelists.length==0">Cargando listas...</span>
               <v-switch 
                    v-for="pricelist in pricelists" :key="pricelist.lp_id" 
                    v-model="prices.ids"
                    color="success"
                    :label="'['+pricelist.lp_desc+'] '+pricelist.lp_name" 
                    :value="pricelist.lp_id"
                    @change="setPriceListsUse"
               >
               </v-switch>
          </v-container>

          <v-divider></v-divider>
          <v-container fluid>
               <v-switch 
                    v-model="innerpack"
                    color="info"
                    label="Piezas por caja"
                    @change="setUseIpack"
               >
               </v-switch>
          </v-container>
     </v-list>
</template>


<script>
import {mapState, mapMutations} from 'vuex' 
import PriceListsAPI from '@/services/api/PriceLists.js'

export default {
     name:'MenuLeft',
     mounted(){console.log('Compnente MenuLeft montado')},
     created(){
          PriceListsAPI.all().then(pricelists => {
               this.$store.state.pricelists = pricelists;
               console.log("Listas de precios montadas");
               console.log(pricelists);
          })
     },
     data(){
          return{}
     },
     computed: {
          ...mapState(['innerpack','pricelists','prices'])
     },
     methods: {
          ...mapMutations(['setUseIpack','setPriceListsUse'])
     }
}
</script>
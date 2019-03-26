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
               <v-switch 
                    v-for="pricelist in pricelists" :key="pricelist.id" 
                    v-model="prices.ids"
                    color="success"
                    :label="'['+pricelist.labelprint+'] '+pricelist.name" 
                    :value="pricelist.id"
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

export default {
     name:'MenuLeft',
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
<template>
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
                              <v-list-tile-title class="headline font-weight-bold">{{prices.use ? label.scode : label.item }}</v-list-tile-title>
                         </v-list-tile-content>

                         <v-spacer></v-spacer>

                         <v-list-tile-content>
                              <v-btn fab dark small color="error" @click="removeLabel(index)">
                                   <v-icon dark>close</v-icon>
                              </v-btn>
                         </v-list-tile-content>
                    </v-card-title>

                    <div class="txt_a_c headline font-weight-light">
                         {{prices.use ? label.item : label.scode}}
                    </div>
                    <div class="txt_a_c" v-if="innerpack">
                         {{ label.ipack }} pzs
                    </div>

                    <v-card-text v-if="prices.use">
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
</template>

<script>

import {mapState,mapMutations} from 'vuex' 
export default {
     name:'LabelsBody',
     mounted(){console.log('Compnente Labels montado')},
     created(){console.log('Compnente Labels creado')},
     computed: {
          ...mapState(['labels','innerpack','prices'])
     },
     methods: {
          ...mapMutations(['addLabel','removeLabel'])
     }

}
</script>


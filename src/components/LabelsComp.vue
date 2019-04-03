<template>
     <v-container fluid grid-list-sm>
          <v-layout row wrap>
                         <v-flex v-if="labels.length==0">
                              <h1>No has agregado etiquetas</h1>
                         </v-flex>

                         <v-flex v-for="(label, index) in labels" :key="index" xs12 md5 lg3>
                              <v-card
                                   class="mx-auto"
                                   :class="{_green:label.type=='std'||label.type=='my',_orange:label.type=='off',label}"
                              >
                                   <v-img
                                        :src="'http://tablero.grupovizcarra.net:2222/gvresources/imgproducts/'+label.item+'.jpg'"
                                        height="100px"
                                   >
                                             <v-layout row class="see">
                                                  <v-flex class="see"> 
                                                       <p class="display-1">
                                                            {{prices.use ? label.scode : label.item }}
                                                       </p>
                                                  </v-flex>
                                                  <v-flex class="see">
                                                       <v-btn fab dark small color="error" @click="removeLabel(index)">
                                                            <v-icon dark>close</v-icon>
                                                       </v-btn>
                                                  </v-flex>
                                             </v-layout>
                                   </v-img>

                                   <v-card-text>
                                        <div class="txt_a_c headline font-weight-bold">
                                             {{prices.use ? label.item : label.scode}}
                                        </div>
                                        <div class="txt_a_c" v-if="innerpack">
                                             {{ label.ipack }} pzs
                                        </div>
                                   </v-card-text>

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
     </v-container>
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

<style lang="scss">

.see{
     border:3px solid red !important;
}
     .fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


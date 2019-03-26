<template>
     <div class="finder" fixed fluid>
          <v-form @submit.stop.prevent>
               <v-layout row>
                    <v-flex xs12 lg3>
                         <v-text-field
                              outline
                              :label="labelforsearch"
                              @focus="helpForSearch(true)"
                              @blur="helpForSearch(false)"
                              :type="typefieldsearch"
                              v-model="finder.item"
                              id="ipttocreatelabel"
                              prepend-icon="art_track"
                              :hint="msgHint"
                              @keyup.enter="searchItem"
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
</template>
<script>

import {mapState, mapMutations} from 'vuex'

export default {
     name: 'LabFinder',
     data(){
          return {
               msgHint:'...',
               typefieldsearch:'number',
               keyboardtype:false,
               labelforsearch:'Generar etiqueta'
          }
     },
     computed: {
          ...mapState(['finder'])
     },
     methods:{
          ...mapMutations(['addLabel']),
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
          },
          searchItem(){
               // this.msgHint = 'Buscando '+this.$store.state.finder.item+', espere...';

               let newLabel = {
                    "type":"std",// articulo standard
                    "tool":false,//con carrito?
                    "item":"ML52-63",
                    "ipack":18,
                    "scode":"36252",
                    prices:[
                         {"idlist":1,"labprint":"MAY","price":550},
                         {"idlist":3,"labprint":"DOC","price":575}
                    ]
               };

               this.$store.commit('addLabel',newLabel);
          }
     }
}
</script>

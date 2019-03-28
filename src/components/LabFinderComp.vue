<template>
          <v-form @submit.stop.prevent>
               <v-container class="finder" fluid>
                    <v-layout row justify-center>
                         <v-flex xs10 md3>
                              <v-text-field
                                   color="info"
                                   :label="labelforsearch"
                                   @focus="helpForSearch(true)"
                                   @blur="helpForSearch(false)"
                                   :type="typefieldsearch"
                                   v-model="finder.item"
                                   id="ipttocreatelabel"
                                   :hint="msgHint"
                                   @keyup.enter="searchItem"
                                   :loading="loading"
                              >
                              </v-text-field>
                         </v-flex>

                         <v-flex xs1 px-0>
                              <v-btn
                                   id="btntglkeyboard"
                                   flat icon @click="toggleKeyboardType()"
                                   :class="{keyboard_active: keyboardtype}"
                                   class="mx-0"
                              >
                                   <v-icon>spellcheck</v-icon>
                              </v-btn>
                         </v-flex>
                    </v-layout>
               </v-container>
          </v-form>
</template>
<script>

import {mapState, mapMutations} from 'vuex'
import LabelsAPI from '@/services/api/Labels.js'

export default {
     name: 'LabFinder',
     mounted(){console.log('Compnente LebFinder montado')},
     created(){console.log('Compnente LebFinder creado')},
     data(){
          return {
               msgHint:'...',
               typefieldsearch:'number',
               keyboardtype:false,
               labelforsearch:'Generar etiqueta',
               txtdisab:false,
               loading:false
          }
     },
     computed: {
          ...mapState(['finder'])
     },
     methods:{
          ...mapMutations(['addLabel']),
          helpForSearch(op){

               let text;
               text = 'Generar etiqueta';
               this.msgHint = '';

               if(op){
                    text = 'Ingrese codigo o codigo corto';
                    this.msgHint = '...';
               }
               
               this.labelforsearch = text;
          },
          toggleKeyboardType(){
               this.keyboardtype = !this.keyboardtype

               if(this.keyboardtype){
                    this.typefieldsearch = 'text';
               }else{
                    this.typefieldsearch = 'number';
               }

               setTimeout(function(){
                    document.getElementById("ipttocreatelabel").focus();
               },100);

          },
          searchItem(){
               // this.msgHint = 'Buscando '+this.$store.state.finder.item+', espere...';
               this.txtdisab=true;

               let codetosearch = this.$store.state.finder.item;

               if(codetosearch!=""&&this.txtdisab){
                    this.msgHint = 'Buscando '+codetosearch;
                    this.loading = 'success';

                    let target = {
                         product:codetosearch,
                         price_id:this.$store.state.prices.ids
                    };

                    console.log(target);
                    LabelsAPI.tryGenerate(target).then(datalabel => {
                         console.log(datalabel);

                         this.$store.commit('addLabel',datalabel);
                         this.msgHint = datalabel.item+' agregada';

                         this.$store.state.finder.item = '';
                         this.txtdisab=false;
                         this.loading = false;
                    }).catch(error=>{
                         console.log(error);
                         this.loading = false;
                         switch(error.response.status){
                              case 404: 
                                   // alert(codetosearch+' no existe');
                                   this.msgHint = codetosearch+' no existe';
                              break;
                              case 405:
                                   // alert("La extension de accesorio no es valida");
                                   this.msgHint = "La extension de accesorio no es valida";
                              break;

                              case 406:
                                   // alert("Selecciona al menos 2 precios");
                                   this.msgHint = "Selecciona al menos 2 precios";
                              break;
                         }
                    });
               }else{
                    this.msgHint = 'El campo no puede estar vacio';
               }
          }
     }
}
</script>

<style lang="scss" scoped>
     form{width: 100%;}
</style>
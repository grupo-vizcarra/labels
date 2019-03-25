<template>
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
</template>
<script>
export default {
     name: 'LabFinder',
     data(){
          return {
               ipttocreatelabel:'',
               typefieldsearch:'number',
               keyboardtype:false,
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

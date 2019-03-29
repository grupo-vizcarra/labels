<template>
     <v-list subheader three-line>
          <v-subheader>Impresion</v-subheader>
          
          <v-container fluid v-if="print.devices.length==0">
               <span>No hay impresoras disponibles</span>
          </v-container>
          <v-container fluid v-else>
               <p><small>Etiquetas a imprimir</small></p>
               <v-radio-group @change="setLabsToPrint" v-model="labstoprint" row :disabled="!prices.use">
                    <v-radio color="info" label="Estandard" value="green"></v-radio>
                    <v-radio color="info" label="Ofertas" value="orange"></v-radio>
               </v-radio-group>

               <p><small>Impresora</small></p>
               <v-radio-group v-model="print.selected" column>
                    <v-radio 
                         v-for="(printer, index) in print.devices" :key="index" 
                         color="info" 
                         :label="printer.print_name" 
                         :value="printer.print_name">
                    </v-radio>
               </v-radio-group>
               <v-btn color="info" :loading="btnload" :disabled="btndis" v-if="print.selected!=''" @click="printing"><v-icon>local_printshop</v-icon></v-btn>
          </v-container>

          <v-divider></v-divider>

          <v-subheader>Pagina</v-subheader>
          
          <v-container fluid v-if="labels.length!=0">
               <v-btn color="error" @click="truncateLabels"><v-icon>delete_forever</v-icon></v-btn>
          </v-container>
     </v-list>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import LabelsAPI from '@/services/api/Labels.js'

export default {
     name:'MenuRight',
     data(){
          return {
               btnload:false,
               btndis:false
          }
     },
     computed: {
          ...mapState(['print','labstoprint','labels','prices'])
     },
     methods: {
          ...mapMutations(['setLabsToPrint','truncateLabels']),
          printing(){
               if(this.$store.state.labels.length>0){

                    this.btnload=true;
                    this.btndis=true;
                    let labelsToSend = [];
                    let txtshow='';

                    if(!this.$store.state.prices.use){
                         labelsToSend = this.$store.state.labels;
                    }else{
                         switch(this.$store.state.labstoprint){
                              case 'green':
                                   labelsToSend = this.$store.state.labels.filter(label => label.type!="off");
                                   txtshow = 'estandard';
                              break;

                              case 'orange':
                                   labelsToSend = this.$store.state.labels.filter(label => label.type=="off");
                                   txtshow = 'ofertas';
                              break;
                         }
                    }

                    let dataprint = {
                         "tickets" :labelsToSend,
                         "isPrice" :this.$store.state.prices.use,
                         "isPack" :this.$store.state.innerpack,
                         "printer" :this.$store.state.print.selected
                    }

                    LabelsAPI.tryPrint(dataprint).then(resp =>{
                         console.log(resp);
                         this.btnload=false;
                         this.btndis=false;
                         alert("Etiquetas "+txtshow+" enviadas :)");
                    }).catch(error => {
                         console.log(error);
                    })
               }else{alert("Primero agrega algunas etiquetas");}
          }
     },
}
</script>
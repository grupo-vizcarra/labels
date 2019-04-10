<template>
     <v-list subheader three-line>
          <v-subheader>Pagina</v-subheader>
          
          <v-container fluid v-if="labels.length!=0">
               <v-btn color="info" @click="exportLabels" :loading="btnexport" :disabled="btndis"><v-icon>cloud_download</v-icon></v-btn>
               <v-btn color="error" @click="truncateLabels" :disabled="btndis"><v-icon>delete_forever</v-icon></v-btn>
          </v-container>

          <v-container fluid v-else>
               <p>agregue algunas etiquetas...</p>
          </v-container>

          <v-divider></v-divider>
     </v-list>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import LabelsAPI from '@/services/api/Labels.js'
import { setTimeout } from 'timers';

export default {
     name:'MenuRight',
     data(){
          return {
               btnload:false,
               btnexport:false,
               btndis:false
          }
     },
     computed: {
          ...mapState(['print','labstoprint','labels','prices'])
     },
     methods: {
          ...mapMutations(['truncateLabels']),
          exportLabels(){
               if(this.$store.state.labels.length>0){
                    this.btnexport = true
                    this.btndis = true

                    let dataprint = {
                         "tickets" :this.$store.state.labels,
                         "isPrice" :this.$store.state.prices.use,
                         "isPack" :this.$store.state.innerpack
                    }

                    LabelsAPI.createPDF(dataprint).then(resp =>{
                         console.log(resp);
                         this.btnload=false;
                         this.btnexport=false;
                         this.btndis=false;
                         if(this.$store.state.prices.use){
                              alert("Hojas verdes: "+resp.std+", Hojas Naranjas: "+resp.off);
                         }else{
                              let sust = resp.hojas == 1 ? 'hoja' : 'hojas'; 
                              alert("Ingrese "+resp.hojas+" "+sust);
                         }
                         window.open('http://192.168.1.176:1618/api_labels/files/'+resp.archivo);
                    }).catch(error => {
                         console.log(error);
                    })
               }
          },
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
                                   labelsToSend = this.$store.getters.labsStd;
                                   txtshow = 'estandard';
                              break;

                              case 'orange':
                                   labelsToSend = this.$store.getters.labsOff;
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

                    console.log(dataprint);

                    // LabelsAPI.tryPrint(dataprint).then(resp =>{
                    //      console.log(resp);
                    //      this.btnload=false;
                    //      this.btndis=false;
                    //      alert("Etiquetas "+txtshow+" enviadas :)");
                    // }).catch(error => {
                    //      console.log(error);
                    // })
               }else{alert("Primero agrega algunas etiquetas");}
          }
     },
}
</script>
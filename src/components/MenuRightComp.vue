<template>
     <v-list subheader three-line>
          <v-subheader>Imprimir</v-subheader>
          
          <v-container fluid v-if="print.devices.length==0">
               <span>No hay impresoras disponibles</span>
          </v-container>
          <v-container fluid v-else>
               <p><small>Seleccione las etiquetas a imprimir</small></p>
               <v-radio-group @change="setLabsToPrint" v-model="labstoprint" row>
                    <v-radio color="info" label="Estandard" value="green"></v-radio>
                    <v-radio color="info" label="Ofertas" value="orange"></v-radio>
               </v-radio-group>

               <p><small>Seleccione impresora</small></p>
               <v-radio-group v-model="print.selected" column>
                    <v-radio 
                         v-for="(printer, index) in print.devices" :key="index" 
                         color="info" 
                         :label="printer.print_name" 
                         :value="printer.print_name">
                    </v-radio>
               </v-radio-group>
               <v-btn color="success" v-if="print.selected!=''" @click="printing"><v-icon>local_printshop</v-icon></v-btn>
          </v-container>

          <v-divider></v-divider>
     </v-list>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import LabelsAPI from '@/services/api/Labels.js'

export default {
     name:'MenuRight',
     computed: {
          ...mapState(['print','labstoprint'])
     },
     methods: {
          ...mapMutations(['setLabsToPrint']),
          printing(){
               if(this.$store.state.labels.length>0){

                    
                    let labelsToSend = [];

                    switch(this.$store.state.labstoprint){
                         case 'green':
                              labelsToSend = this.$store.state.labels.filter(label => label.type!="off");
                         break;

                         case 'orange':
                              labelsToSend = this.$store.state.labels.filter(label => label.type=="off");
                         break;
                    }

                    let dataprint = {
                         "tickets" :labelsToSend,
                         "isPrice" :this.$store.state.prices.use,
                         "isPack" :this.$store.state.innerpack,
                         "printer" :this.$store.state.print.selected
                    }

                    LabelsAPI.tryPrint(dataprint).then(resp =>{
                         console.log(resp);
                    }).catch(error => {
                         console.log(error);
                    })
               }else{alert("Primero agrega algunas etiquetas");}
          }
     },
}
</script>
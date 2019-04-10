import axios from 'axios'

export default {
     async tryGenerate(target){
          console.log('generando etiqueta...');
          const response = await axios.post('/ticket',target);
          return response.data;
     },

     async tryPrint(data){
          console.log('imprimiendo...');
          const response = await axios.post('/printer',data);
          return response.data;
     },

     async createPDF(data){
          console.log('creando documento...');
          const response = await axios.post('/pdf',data);
          return response.data;
     },
}
import axios from 'axios'

export default {
     async tryGenerate(target){
          console.log('getting');
          const response = await axios.post('/ticket',target);
          return response.data;
     },

     async tryPrint(data){
          console.log('printing');
          const response = await axios.post('/printer',data);
          return response.data;
     },
}
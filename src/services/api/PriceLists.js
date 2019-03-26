import axios from 'axios'

export default {
     async all(){
          console.log('obteniendo impresoras');
          const response = await axios.get('/priceList');
          return response.data;
     }
}
import axios from 'axios'

export default {
     async all(){
          console.log('obteniendo Listas de precios');
          const response = await axios.get('/priceList');
          return response.data;
     }
}
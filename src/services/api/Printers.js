import axios from 'axios'

export default {
     async all(){
          console.log('obteniendo impresoras');
          const response = await axios.get('/printer');
          return response.data;
     }
}
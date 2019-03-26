import axios from 'axios'

export default {
     async getUsers(){
          console.log('getting');
          const response = await axios.get('https://randomuser.me/api/?results=50');
          return response.data;
     }
}
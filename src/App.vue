<template>
  <v-app id="inspire">
     <!-- <v-toolbar app>
          <v-toolbar-title class="headline text-uppercase">
               <span>Grupo Vizcarra</span>
               <span class="font-weight-light"> Etiquetas</span>
          </v-toolbar-title>
     </v-toolbar> -->

     <v-content>
          <router-view/>
     </v-content>
  </v-app>
</template>

<script>

export default {
     name: 'App',
     data () {
          return {
               //
          }
     }
}
</script>

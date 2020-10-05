<template>
  <v-app-bar
      height="64"
      fixed
      color='purple darken-3'
      dark
    >
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
        <template v-if="DRAWER_STATE">
            <v-icon  style="font-size: 28px">mdi-arrow-left</v-icon>
        </template>
        <template v-else>
            <v-icon style="font-size: 28px">mdi-menu</v-icon>
        </template>
    </v-btn>
    <v-toolbar-title>
      <v-img src="@/assets/img-logo.svg" max-width="130" height="50" block color="white" elevation="0" class="ml-10"></v-img>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu
        min-width="180"
        offset-y
        bottom
        left
        nudge-bottom="10"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                >
                <v-icon
                    style="font-size: 28px"
                    color="white"
                >mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list >
            <div class="d-flex justify-center my-3">
                <v-btn
                    width="80%"
                    large
                    outlined
                    color="pink darken-3"
                    class="text-capitalize"
                    @click="logOut"
                >Sign Out</v-btn>
            </div>
        </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  import config from '../../config';

  export default {
    name: 'Header',
    data: () => ({
      config,
    }),
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE :{
        get() {
          return this.drawer
        },
      }
    },
    methods: {
      ...mapActions([ 'TOGGLE_DRAWER' ]),
      logOut: function () {
        window.localStorage.setItem('authenticated', false);
        this.$router.push('/login');
      }
    }
  };
</script>

<style src="./Header.scss" lang="scss"></style>

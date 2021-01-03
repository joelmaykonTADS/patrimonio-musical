<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-content>
        <v-list-item class="title justify-center">
          <span class="grey--text text--darken-2 font-weight-bold">{{
            modulo
          }}</span>
        </v-list-item>
        <v-divider />
      </v-list-item-content>
      <v-list-group color="grey darken-2" :value="true" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              ><v-icon left>mdi-music-box-outline</v-icon>Patrimônio</v-list-item-title
            >
          </v-list-item-content>
        </template>
        <v-list-item @click="page('instrumentos')">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>mdi-music-clef-treble</v-icon
              ><span class="grey--text text--darken-2 font-weight-bold"
                >Instrumentos</span
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider />
      <v-list-group color="grey darken-2" :value="true" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              ><v-icon left>mdi-folder-open-outline</v-icon>Secretaria</v-list-item-title
            >
          </v-list-item-content>
        </template>
        <v-list-item @click="page('igrejas')">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>mdi-city</v-icon
              ><span class="grey--text text--darken-2 font-weight-bold"
                >Igrejas</span
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="page('irmaos')">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left>mdi-account-tie</v-icon
              ><span class="grey--text text--darken-2 font-weight-bold"
                >Irmãos</span
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider />
      <v-list>  
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-2 font-weight-bold">
             <v-icon>mdi-application-cog</v-icon> Configurações do sistema
            </v-list-item-title>
          </v-list-item-content>         
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-2 font-weight-bold">
             <v-icon>mdi-close-box-outline</v-icon> Sair do sistema
            </v-list-item-title>
          </v-list-item-content>         
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="white">
      <v-app-bar-nav-icon
        class="grey lighten-2 grey--text text--darken-4"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-row>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="grey--text text--darken-2 font-weight-bold">{{
            title
          }}</v-toolbar-title>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: { title: String, modulo: String },
  data: () => ({ drawer: null }),
  methods: {
    page(page) {
      this.$router.push(`/${page}`);
    },
  },
};
</script>

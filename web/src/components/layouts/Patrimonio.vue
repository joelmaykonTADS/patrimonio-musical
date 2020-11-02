<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-content>
        <v-list-item class="title">
          <span class="black--text">{{ modulo }}</span>
        </v-list-item>
        <v-divider />
      </v-list-item-content>
      <v-list-group color="grey" :value="true" no-action sub-group>
        <template v-slot:activator>
          <v-list-item-content @click="pageModule()">
            <v-list-item-title>Patrimônio</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item @click="pageStudents()" color="grey">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-music-clef-treble</v-icon
              >Instrumentos</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list> </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="grey lighten-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-row>
        <v-col class="d-flex justify-space-around">
          <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: { title: String, modulo: String },
  data: () => ({ drawer: null }),
  methods: {
    pageStudents() {
      this.$router.push("/instrumentos");
    },
    pageModule() {
      this.$router.push("/");
    },
  },
};
</script>

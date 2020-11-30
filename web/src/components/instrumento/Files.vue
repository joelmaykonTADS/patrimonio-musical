<template>
  <v-container>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
      >
        <v-card-text>
          <file-pond
            name="test"
            ref="pond"
            class="mouse-open"
            class-name="my-pond"
            :label-idle="label"
            allow-multiple="true"
            accepted-file-types="application/pdf"
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
          />
        </v-card-text>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
// Import FilePond
import vueFilePond from "vue-filepond";
// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster
);
export default {
  props:{label:String},
  components: {
    FilePond,
  },
  data() {
    return {
      myFiles: [],
    };
  },
};
</script>

<style>
.mouse-open {
  cursor: pointer;
}

/* the color of the focus ring */
.filepond--file-action-button:hover,
.filepond--file-action-button:focus {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
}

.filepond--root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

</style>
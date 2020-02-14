<template>
  <div id="pdfvuer">
    <div id="pdfcontainer">
      <pdf
        :src="pdfdata"
        v-for="i in numPages"
        :key="i"
        :id="i"
        :page="i"
        :scale.sync="scale"
        :resize="true"
        style="width:100%;margin:20px auto;"
      >
        <template slot="loading">loading content here...</template>
      </pdf>
    </div>
  </div>
</template>

<script>
import pdfvuer from "pdfvuer";
export default {
  components: {
    pdf: pdfvuer
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: "page-width"
    };
  },
  mounted() {
    this.getPdf();
  },
  methods: {
    getPdf(url) {
      var self = this;
      self.pdfdata = pdfvuer.createLoadingTask("./one.pdf");
      self.pdfdata.then(pdf => {
        self.numPages = pdf.numPages;
        // Get the offset position of the navbar
        var sticky = document.querySelector("#buttons")[0].offsetTop;
      });
    },
    findPos(obj) {
      return obj.offsetTop;
    }
  }
};
</script>

<style lang="css">
#buttons {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
/* Page content */
.content {
  padding: 16px;
}
</style>

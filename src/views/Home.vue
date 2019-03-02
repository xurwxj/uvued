<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    {{ $t("cmsg.hello") }}
    <no-ssr>
    <uploader
      :options="uploadDesignUploader"
      @file-success="uploadDesignFileSuccess"
      class="new-doc-uploader"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop here or</p>
        <uploader-btn>Select file</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
    </no-ssr>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  metaInfo: {
    title: "Home !",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "my application home page"
      }
    ]
  },
  data() {
    return {
      uploadDesignUploader: {
        target: "/api/mpupc?category=dsr&bucket=pub",
        allowDuplicateUploads: true,
        singleFile: false,
        initFileFn: this.fileAdded,
        simultaneousUploads: 10,
        chunkSize: 1 * 1024 * 1024,
        speedSmoothingFactor: 0.02,
        maxChunkRetries: undefined
      }
    };
  },
  methods: {
    fileAdded(file) {
      if (file.size > 1000 * 1024 * 1024) {
        file.uploader.opts.chunkSize = 10 * 1024 * 1024;
      }
    },
    uploadDesignFileSuccess(rootFile, file, message, chunk) {
      console.log(message);
    }
  }
};
</script>

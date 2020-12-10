import firebase from "firebase";

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env" : ".env",
});

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY_FIREBASE,
  authDomain: process.env.VUE_APP_API_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL_FIREBASE,
  projectId: process.env.VUE_APP_PROJECT_ID_FIREBASE,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID_APP_FIREBASE,
};

const upload = async (url, arquivo) => {
  console.log(arquivo);
  if (arquivo.length == 1) {
    const upload = firebase
      .storage()
      .ref(url)
      .put(arquivo[0].file);
    console.log(upload);
  }
};

const download = async (url) => {
  const documento = firebase.storage().ref(url);
  let files = [];
  await documento.getDownloadURL().then(async (link) => {
    const documentoCompleto = await firebase.storage().refFromURL(link);
    await documentoCompleto.getMetadata().then((metadata) => {
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const date = new Date(metadata.updated).toLocaleDateString(
        "pt-br",
        options
      );
      files.push({
        src: "https://www.svgrepo.com/show/33873/pdf.svg",
        title: metadata.name,
        date: date,
        size: metadata.size,
        url: link,
        unit: "kB",
      });
    });
  });
  return files;
};

const start = () => {
  firebase.initializeApp(firebaseConfig);
};

export { upload, download, start };

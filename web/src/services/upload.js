import firebase from "firebase";

const uploadArquivo = async (url, arquivo) => {
    console.log(arquivo)
    if (arquivo.length == 1) {
        const upload = firebase
            .storage()
            .ref(url)
            .put(arquivo[0].file);
        console.log(upload)
    }
}

export { uploadArquivo }
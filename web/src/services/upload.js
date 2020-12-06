import firebase from "firebase";

async const uploadArquivos = (arquivos, url) => {
    // var d = new Date();
    //"Instrumentos/NotasFiscaisDoacao/"+d.getFullYear()+"/nota_fiscal_doacao_" + this.tombamento + ".pdf"   
    if (arquivos.length == 1) {
        firebase
            .storage()
            .ref(url)
            .put(arquivos[0].file);
    }
},

export { uploadArquivos }
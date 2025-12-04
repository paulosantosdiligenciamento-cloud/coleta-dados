emailjs.init("SUA_PUBLIC_KEY_AQUI");

document.getElementById("formulario").addEventListener("submit", async function(event){
event.preventDefault();

```
const status = document.getElementById("status");
status.innerText = "Enviando...";

const responsavel = document.getElementById("responsavel").value;
const local = document.getElementById("local").value;
const descricao = document.getElementById("descricao").value;
const dataRelatorio = document.getElementById("dataRelatorio").value;
const fotos = document.getElementById("fotos").files;

// Converter cada imagem para PDF separado
const pdfsBase64 = [];

for (let foto of fotos) {
    const base64 = await toBase64(foto);
    pdfsBase64.push(base64);
}

const templateParams = {
    responsavel,
    local,
    descricao,
    dataRelatorio,
    emailDestino: "paulosantos.diligenciamento@gmail.com",
    anexos: pdfsBase64
};

emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", templateParams)
.then(() => {
    status.innerText = "Enviado com sucesso!";
})
.catch((err) => {
    status.innerText = "Erro ao enviar.";
    console.error(err);
});
```

});

function toBase64(file) {
return new Promise((resolve, reject) => {
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => resolve(reader.result);
reader.onerror = (error) => reject(error);
});
}

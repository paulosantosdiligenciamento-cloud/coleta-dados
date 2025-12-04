emailjs.init("twBjj51IiTzZ6hHJA"); // PUBLIC KEY

document.getElementById("dataForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const arquivos = document.getElementById("fotos").files;
    const pdfsBase64 = [];
    const leitor = new FileReader();

    function processarFoto(i) {
        if (i >= arquivos.length) {
            enviarDados();
            return;
        }

        leitor.onload = function(evt) {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.addImage(evt.target.result, "JPEG", 10, 10, 180, 160);
            pdfsBase64.push(pdf.output("datauristring"));
            processarFoto(i + 1);
        };

        leitor.readAsDataURL(arquivos[i]);
    }

    function enviarDados() {
        const dados = {
            proprietario: document.getElementById("proprietario").value,
            cpf: document.getElementById("cpf").value,
            endereco: document.getElementById("endereco").value,
            matricula: document.getElementById("matricula").value,
            descricao:
                document.getElementById("descricao").value +
                "\n\nData do relatório: " +
                new Date().toLocaleDateString("pt-BR"),
            dataEnvio: new Date().toLocaleString("pt-BR"),
            pdfs: pdfsBase64.join("\n\n")
        };

        emailjs
            .send("service_761ouhk", "template_jvlzymf", {
                to_email: "paulosantos.diligenciamento@gmail.com",
                dados_json: JSON.stringify(dados, null, 2)
            })
            .then(() => {
                document.getElementById("successMsg").style.display = "block";
                document.getElementById("dataForm").reset();
            })
            .catch((err) => {
                alert("Erro ao enviar: " + err);
                console.error(err);
            });
    }

    if (!arquivos || arquivos.length === 0) {
        enviarDados();
    } else {
        processarFoto(0);
    }
});

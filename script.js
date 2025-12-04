<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coleta de Dados</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
    }
    label {
      display: block;
      margin-top: 15px;
      font-weight: bold;
    }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      background: #0a7bf2;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #0662c4;
    }
    .success {
      margin-top: 15px;
      color: green;
      text-align: center;
      display: none;
    }
  </style>

  <!-- jsPDF -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <!-- EmailJS SDK -->
  <script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      emailjs.init("twBjj51IiTzZ6hHJA"); // PUBLIC KEY
    });
  </script>

</head>
<body>

  <div class="container">
    <h2>Formulário de Coleta de Dados</h2>

    <form id="dataForm">
      <label>Nome do Proprietário:</label>
      <input type="text" id="proprietario" required />

      <label>CPF:</label>
      <input type="text" id="cpf" required />

      <label>Endereço:</label>
      <input type="text" id="endereco" required />

      <label>Nº da Matrícula:</label>
      <input type="text" id="matricula" required />

      <label>Descrição:</label>
      <textarea id="descricao" rows="5" required></textarea>

      <label>Foto(s):</label>
      <input type="file" id="fotos" accept="image/*" multiple />

      <button type="submit">Enviar Dados</button>
    </form>

    <div class="success" id="successMsg">Dados enviados com sucesso!</div>
  </div>

  <script>
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
          });
      }

      if (!arquivos || arquivos.length === 0) {
        enviarDados();
      } else {
        processarFoto(0);
      }
    });
  </script>

</body>
</html>

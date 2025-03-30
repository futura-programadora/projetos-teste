
 src="https://cdn.emailjs.com/dist/email.min.js">


    document.addEventListener("DOMContentLoaded", function() {
        emailjs.init("SEU_USER_ID"); // Substitua pelo seu User ID do EmailJS

        document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o recarregamento da página

            // Captura os dados do formulário
            let nome = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let mensagem = document.getElementById("message").value;

            // Envia o e-mail via EmailJS
            emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
                from_name: nome,
                from_email: email,
                message: mensagem
            }).then(function(response) {
                alert("E-mail enviado com sucesso!");
                console.log("Sucesso:", response);
            }).catch(function(error) {
                alert("Erro ao enviar e-mail.");
                console.log("Erro:", error);
            });

            // Opcional: Limpar o formulário após o envio
            document.querySelector("form").reset();
        });
    });
</script>

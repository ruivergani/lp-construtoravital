<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contactMethod = isset($_POST['contactMethod']) ? strip_tags(trim($_POST['contactMethod'])) : '';
    $name = isset($_POST['firstName']) ? strip_tags(trim($_POST['firstName'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $message = isset($_POST['mensagem']) ? strip_tags(trim($_POST['mensagem'])) : '';

    if (empty($contactMethod)) {
        $errors[] = 'Forma de contato está vazia';
    }

    if (empty($name)) {
        $errors[] = 'Nome está vazio';
    }

    if (empty($email)) {
        $errors[] = 'Email está vazio';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email é inválido';
    }

    if (empty($message)) {
        $errors[] = 'Mensagem está vazia';
    }

    if (empty($errors)) {
        $mail = new PHPMailer(true);

        try {
            // Configurações do servidor de email (Gmail)
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'pedro.devprog@gmail.com'; // Substitua pelo seu endereço de email do remetente
            $mail->Password = 'mpqh amta oqgi mlgk '; // Substitua pela sua senha de aplicativo
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Remetente e destinatário
            $mail->setFrom('contato.vital@gmail.com', $name); // Substitua 'pedro.devprog@gmail.com' pelo seu endereço de email do remetente
            $mail->addAddress('pedro.eng98@gmail.com'); // Endereço do destinatário

            // Conteúdo do email
            $mail->isHTML(true);
            $mail->Subject = "Novo contato: $contactMethod";
            $mail->Body = "Nome: $name<br>Email: $email<br>Telefone: $phone<br>Forma de Contato: $contactMethod<br><br>Mensagem:<br>$message";

            $mail->send();
            echo json_encode(['status' => 'success', 'message' => 'Email enviado com sucesso!']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => "Envio de email falhou. Erro: {$mail->ErrorInfo}"]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'O formulário possui os seguintes erros:', 'errors' => $errors]);
    }
} else {
    header("HTTP/1.1 403 Forbidden");
    echo json_encode(['status' => 'error', 'message' => 'Não tem permissões para aceder a esta página.']);
}
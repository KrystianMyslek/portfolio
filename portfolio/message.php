<?php 

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    $mail = new PHPMailer(true);

    if (!file_exists(".env")) {
        echo "No config file !";
    } else {
    
        $env = json_decode(file_get_contents(".env"), true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $env['smtp']['username'];
            $mail->Password = $env['smtp']['password'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;
    
            $mail->setFrom('krystian.myslek@gmail.com', 'OVH');
            $mail->addAddress('krystian.myslek@gmail.com');
    
            $mail->CharSet = 'UTF-8';
    
            $mail->isHTML(true);
            $mail->Subject = "krystianmyslek.me " . $_POST['name'] . " zostawił wiadomość";
            $mail->Body = $_POST['message'] . "<br/><br/>" . $_POST['email'];
    
            $mail->send();
            echo 'OK';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    die();
?>



<?php 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json");

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/Exception.php';
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';

	$mail = new PHPMailer(true);
	$env_file_path = "server/.env";

	if (!file_exists($env_file_path)) {
		echo "No config file !";
    } else {
		$json = file_get_contents('php://input');
		$data = json_decode($json, true);

        if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
			echo "Incomplete data !";
            die();
		}
			
		$env = json_decode(file_get_contents($env_file_path), true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $env['smtp']['username'];
            $mail->Password = $env['smtp']['password'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;
    
            $mail->setFrom('krystian.myslek@gmail.com', 'krystianmyslek.com');
            $mail->addAddress('krystian.myslek@gmail.com');
    
            $mail->CharSet = 'UTF-8';
    
            $mail->isHTML(true);
            $mail->Subject = $data['name'] . " zostawił wiadomość";
            $mail->Body = $data['message'] . "<br/><br/>" . $data['email'];
    
            $mail->send();
            echo 'OK';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    die();
?>
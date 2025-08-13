<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
class Email
{

        public function sendMail($subject, $message)
        {
                $mail = new PHPMailer();
                $mail->IsSMTP();  // telling the class to use SMTP
                //        $mail->SMTPDebug = 1 ;
                $mail->Host = "smtp-relay.sendinblue.com"; // SMTP server
                $mail->SMTPAuth = true;      // enable SMTP authentication
                $mail->Port = "587";     // set the SMTP port for the GMAIL server
                $mail->Username = "noreply.palmea@gmail.com"; // SMTP account username
                $mail->Password = "qhrVzGa3QKyDpLEm";  // SMTP account password
                $mail->SetFrom("noreply.palmea@gmail.com", "Portfolio");
                $mail->Subject = $subject;
                $mail->CharSet = 'utf-8';
                $mail->AltBody = strip_tags($message);
                $mail->IsHTML(true);
                $mail->MsgHTML($message);
                $mail->AddAddress("ethan36@hotmail.fr");
                $mailer = $mail->send();
                if (!$mailer) {
                        echo $mail->ErrorInfo;
                } else {
                        echo 'Message bien envoyé';
                }
        }
}

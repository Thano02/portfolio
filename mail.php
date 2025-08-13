<?php
require 'contact.php';
if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['subject']) && !empty($_POST['message'])) {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailClass = new Email();
        // ici c'est le corps du mail qui doit etre en html obligatoirement 
        $html = "<strong>Une nouvelle demande est arrivée</strong>";
        $html .= "<br>";
        $html .= "<strong>Nom : </strong> " . $name;
        $html .= "<br>";
        $html .= "<strong>Email : </strong> " . $email;
        $html .= "<br>";
        $html .= "<strong>Message : </strong> " . $message;
        //Ici cest le sujet du mail 
        $subject = '[Portfolio] Nouvelle demande :: ' . $subject;
        $emailClass->sendMail($subject, $html);
    } else {
        echo "Email non valide";
    }
} else {
    header('Location:index.php');
    die();
}

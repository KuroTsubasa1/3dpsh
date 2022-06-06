<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class HomepageController extends AbstractController
{
    /**
     * @Route("/homepage", name="app_homepage")
     */
    public function index(Request $request, MailerInterface $mailer): Response
    {

        if ($request->isMethod("POST")) {
            $data = $request->request->all();

            if ($this->validate_email($data)) {
                $email = (new Email())
                    ->from($data['email'])
                    ->to('service@3dps.space')
                    ->subject('3D Printing Request from : ' . $data['first-name'])
                    ->text($data['user-request']);

                $mailer->send($email);
            }
        }

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
        ]);
    }

    public function legal(): Response
    {
        return $this->render('homepage/legal.html.twig', [
            'controller_name' => 'HomepageController',
        ]);
    }

    public function validate_email($data): bool
    {

        if (empty($data['first-name'])) {
            return false;
        }

        if (empty($data['email'])) {
            return false;
        }

        if (empty($data['user-request'])) {
            return false;
        }

        return true;
    }
}

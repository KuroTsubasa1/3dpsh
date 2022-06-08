<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use ReCaptcha\ReCaptcha;

use function Symfony\Component\Translation\t;

class HomepageController extends AbstractController
{
	/**
	 * @Route("/homepage", name="app_homepage")
	 */
	public function index(Request $request, MailerInterface $mailer): Response
	{
		$contact_form_msg = null;
		$contact_form_status = null;

		if ($request->isMethod("POST"))
		{
			$data = $request->request->all();

			$contact_form_msg = $this->validate_email($request, $data);

			if ($contact_form_msg === true)
			{
				$email = (new Email())->from($data['email'])->to('service@3dps.space')->subject('3D Printing Request from : '.$data['first-name'])->text($data['user-request']);

				$mailer->send($email);

				$contact_form_msg = null;
				$contact_form_msg[] = "Your request was successfully send !";
				$contact_form_status = "success";

			}
			else
			{
				$contact_form_status = "error";
			}
		}

		return $this->render('homepage/index.html.twig', [
			'controller_name' => 'HomepageController',
			'contact_form_msg' => $contact_form_msg,
			'contact_form_status' => $contact_form_status,
		]);
	}

	public function legal(): Response
	{
		return $this->render('homepage/legal.html.twig', [
			'controller_name' => 'HomepageController',
		]);
	}

	public function validate_email($request, $data)
	{
		$contact_form_error = [];

		$error_flag = false;

		$recaptcha = new ReCaptcha('6Lf01VIgAAAAADkxHslAju5FT6ENNOwY0oOnVoqT');
		$resp = $recaptcha->verify($request->request->get('g-recaptcha-response'), $request->getClientIp());

		if (!$resp->isSuccess())
		{
			$error_flag = true;
			$contact_form_error[] = "Please fill in the captcha";
		}

		if (empty($data['first-name']))
		{
			$error_flag = true;
			$contact_form_error[] = "Please fill your name correctly";
		}

		if (empty($data['email']))
		{
			$error_flag = true;
			$contact_form_error[] = "Please fill your email correctly";
		}

		if (empty($data['user-request']))
		{
			$error_flag = true;
			$contact_form_error[] = "Please fill in the request description";
		}

		if($error_flag)
		{
			return $contact_form_error;
		}

		return true;
	}
}

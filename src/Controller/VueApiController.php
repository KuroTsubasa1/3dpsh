<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VueApiController extends AbstractController
{



    public function index(Request $request, ManagerRegistry $doctrine): Response
    {
        /*
         * REST Api definition
         *
         * Route
         * /api/resource/{id}
         *
         * Controller
         * resource_{method}
         * return JSON
         *
         * GET
         * Retrieves the collection of resource
         *
         * POST
         * Creates a resource
         *
         * GET {id}
         * Retrieves a resource
         *
         * PUT {id}
         * Replaces the resource
         *
         * DELETE {id}
         * Removes a resource
         *
         * PATCH {id}
         * Updates a resource
         *
         * Reference
         * https://digitalfortress.tech/tutorial/rest-api-with-symfony-and-api-platform/
         */

        // check if all required methods are working
        dump($request->getMethod());
        die();

        return $this->render('vue_api/index.html.twig', [
            'controller_name' => 'VueApiController',
        ]);
    }
}

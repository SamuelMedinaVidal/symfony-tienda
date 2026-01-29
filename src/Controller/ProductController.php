<?php

namespace App\Controller;

use App\Service\ProductsService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'product')]
    public function product(ProductsService $productsService): Response
    {
        $products = $productsService->getProducts();
        return $this->render('product/product.html.twig', compact('products'));
    }

}

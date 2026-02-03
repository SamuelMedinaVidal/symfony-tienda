<?php

namespace App\Repository;

use App\Entity\Product;
use App\Service\CartService;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function getFromCart(CartService $cart): array
    {
        if (empty($cart->getCart())) {
            return [];
        }
        $ids = implode(',', array_keys($cart->getCart()));

        return $this->createQueryBuilder('p')
            ->andWhere("p.id IN ($ids)")
            ->getQuery()
            ->getResult();
    }
    
}

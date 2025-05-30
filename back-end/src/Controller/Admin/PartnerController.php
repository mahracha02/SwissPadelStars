<?php

namespace App\Controller\Admin;

use App\Entity\Partners;
use App\Repository\PartnersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/admin')]
class PartnerController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private PartnersRepository $partnersRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/partners', name: 'admin_partners_list', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $partners = $this->partnersRepository->findAll();
        $data = $this->serializer->serialize($partners, 'json', ['groups' => 'partner:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/partners', name: 'admin_partners_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $partner = new Partners();
        $partner->setName($data['name']);
        $partner->setImage($data['image']);
        $partner->setSiteUrl($data['site_url']);
        $partner->setPublished($data['published'] ?? false);

        $this->entityManager->persist($partner);
        $this->entityManager->flush();

        $response = $this->serializer->serialize($partner, 'json', ['groups' => 'partner:read']);
        return new JsonResponse($response, Response::HTTP_CREATED, [], true);
    }

    #[Route('/partners/{id}', name: 'admin_partners_update', methods: ['PUT'])]
    public function update(Request $request, Partners $partner): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $partner->setName($data['name']);
        if (isset($data['image'])) {
            $partner->setImage($data['image']);
        }
        $partner->setSiteUrl($data['site_url']);
        if (isset($data['published'])) {
            $partner->setPublished($data['published']);
        }

        $this->entityManager->flush();

        $response = $this->serializer->serialize($partner, 'json', ['groups' => 'partner:read']);
        return new JsonResponse($response, Response::HTTP_OK, [], true);
    }

    #[Route('/partners/{id}', name: 'admin_partners_delete', methods: ['DELETE'])]
    public function delete(Partners $partner): JsonResponse
    {
        $this->entityManager->remove($partner);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/partners/{id}/toggle-publish', name: 'admin_partners_toggle_publish', methods: ['PATCH'])]
    public function togglePublish(Partners $partner): JsonResponse
    {
        $partner->setPublished(!$partner->isPublished());
        $this->entityManager->flush();

        $response = $this->serializer->serialize($partner, 'json', ['groups' => 'partner:read']);
        return new JsonResponse($response, Response::HTTP_OK, [], true);
    }
}

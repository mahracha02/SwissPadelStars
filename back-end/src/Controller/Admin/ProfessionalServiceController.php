<?php

namespace App\Controller\Admin;

use App\Entity\ProfessionalService;
use App\Repository\ProfessionalServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/admin')]
class ProfessionalServiceController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProfessionalServiceRepository $professionalServiceRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/professional-services', name: 'admin_professional_services_list', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $services = $this->professionalServiceRepository->findAll();
        $data = $this->serializer->serialize($services, 'json', ['groups' => 'professional_service:read']);
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/professional-services', name: 'admin_professional_services_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $service = new ProfessionalService();
        $service->setTitle($data['title']);
        $service->setDescription($data['description']);
        $service->setImage($data['image']);
        $service->setPublished($data['published'] ?? false);

        $this->entityManager->persist($service);
        $this->entityManager->flush();

        $response = $this->serializer->serialize($service, 'json', ['groups' => 'professional_service:read']);
        return new JsonResponse($response, Response::HTTP_CREATED, [], true);
    }

    #[Route('/professional-services/{id}', name: 'admin_professional_services_update', methods: ['PUT'])]
    public function update(Request $request, ProfessionalService $service): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $service->setTitle($data['title']);
        $service->setDescription($data['description']);
        if (isset($data['image'])) {
            $service->setImage($data['image']);
        }
        if (isset($data['published'])) {
            $service->setPublished($data['published']);
        }

        $this->entityManager->flush();

        $response = $this->serializer->serialize($service, 'json', ['groups' => 'professional_service:read']);
        return new JsonResponse($response, Response::HTTP_OK, [], true);
    }

    #[Route('/professional-services/{id}', name: 'admin_professional_services_delete', methods: ['DELETE'])]
    public function delete(ProfessionalService $service): JsonResponse
    {
        $this->entityManager->remove($service);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/professional-services/{id}/toggle-publish', name: 'admin_professional_services_toggle_publish', methods: ['PATCH'])]
    public function togglePublish(ProfessionalService $service): JsonResponse
    {
        $service->setPublished(!$service->isPublished());
        $this->entityManager->flush();

        $response = $this->serializer->serialize($service, 'json', ['groups' => 'professional_service:read']);
        return new JsonResponse($response, Response::HTTP_OK, [], true);
    }
}

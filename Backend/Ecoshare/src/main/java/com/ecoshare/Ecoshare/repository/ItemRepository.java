package com.ecoshare.Ecoshare.repository;

import com.ecoshare.Ecoshare.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // Spring Data JPA va automatiquement générer le code SQL pour ces méthodes

    // Permet de trouver toutes les annonces d'une catégorie précise (ex: "Jardinage")
    List<Item> findByCategory(String category);

    // Permet de retrouver toutes les annonces publiées par un utilisateur spécifique
    List<Item> findByVendeurId(Long vendeurId);



    // Permet de faire une recherche par mot clé dans le titre
    List<Item> findByTitleContainingIgnoreCase(String keyword);
}
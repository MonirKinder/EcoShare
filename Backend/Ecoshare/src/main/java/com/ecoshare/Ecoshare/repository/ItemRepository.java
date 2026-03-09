package com.ecoshare.Ecoshare.repository;

import com.ecoshare.Ecoshare.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {




    List<Item> findByCategory(String category);    // Trouve toutes les annonces d'une category


    List<Item> findByVendeurId(Long vendeurId); // trouve toutes les annonces d'un vendeur



    List<Item> findByTitleContainingIgnoreCase(String keyword);   //  fait une recherche par mot clé dans le titre

    List<Item> findByTagsIn(List<String> tags);


}
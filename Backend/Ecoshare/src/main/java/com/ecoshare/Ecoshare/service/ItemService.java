package com.ecoshare.Ecoshare.service;

import com.ecoshare.Ecoshare.model.Item;
import com.ecoshare.Ecoshare.model.User;
import com.ecoshare.Ecoshare.repository.ItemRepository;
import com.ecoshare.Ecoshare.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public Item createItem(Item item, String sellerEmail) {       //cree  l'annonce dans l'a table items
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        item.setVendeur(seller);

        return itemRepository.save(item);
    }

    //recupere toutes les annonces findALL pas besoin detre ecrit dans repository, outil de base
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item updateItem(Long id, Item itemDetails, String sellerEmail) {

        Item existingItem = itemRepository.findById(id)                          //trouve l'annonce avecID
                .orElseThrow(() -> new RuntimeException("Article introuvable"));


        if (!existingItem.getVendeur().getEmail().equals(sellerEmail)) {    //verifie si l'utilisateur est le vendeur de l'article a modifier
            throw new RuntimeException("Accès refusé : vous n'êtes pas le vendeur de cet article.");
        }


        existingItem.setTitle(itemDetails.getTitle());                 //item details envoye par le frontend contient les donnees a modifier
        existingItem.setPrice(itemDetails.getPrice());                  //je dois regler dans le cas ou il y a pas de modification que d'un parametre
        existingItem.setCategory(itemDetails.getCategory());              //avec des nulls et modifier juste si cest pas null
        existingItem.setDescription(itemDetails.getDescription());
        existingItem.setPhotos(itemDetails.getPhotos());
        existingItem.setTags(itemDetails.getTags());


        return itemRepository.save(existingItem);
    }


    public void deleteItem(Long id, String sellerEmail) {                   //supprime l'article demandé
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article introuvable"));

        if (!existingItem.getVendeur().getEmail().equals(sellerEmail)) {
            throw new RuntimeException("Accès refusé : vous n'êtes pas le vendeur de cet article.");
        }

        itemRepository.delete(existingItem);
    }




}
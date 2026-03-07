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

    // Méthode renommée en createItem
    public Item createItem(Item item, String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));



        item.setVendeur(seller);

        return itemRepository.save(item);
    }

    // Méthode renommée en getAllItems
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    // Modifier un article existant
    public Item updateItem(Long id, Item itemDetails, String sellerEmail) {
        // 1. On cherche l'article
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article introuvable"));

        // 2. On vérifie que l'utilisateur qui fait la requête est bien le propriétaire
        if (!existingItem.getVendeur().getEmail().equals(sellerEmail)) {
            throw new RuntimeException("Accès refusé : vous n'êtes pas le vendeur de cet article.");
        }

        // 3. On met à jour les champs
        existingItem.setTitle(itemDetails.getTitle());
        existingItem.setPrice(itemDetails.getPrice());
        existingItem.setCategory(itemDetails.getCategory());
        existingItem.setDescription(itemDetails.getDescription());
        existingItem.setPhotos(itemDetails.getPhotos());
        existingItem.setTags(itemDetails.getTags());

        // 4. On sauvegarde
        return itemRepository.save(existingItem);
    }

    // Supprimer un article
    public void deleteItem(Long id, String sellerEmail) {
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article introuvable"));

        if (!existingItem.getVendeur().getEmail().equals(sellerEmail)) {
            throw new RuntimeException("Accès refusé : vous n'êtes pas le vendeur de cet article.");
        }

        itemRepository.delete(existingItem);
    }




}
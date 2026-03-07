package com.ecoshare.Ecoshare.controller;

import com.ecoshare.Ecoshare.model.Item;
import com.ecoshare.Ecoshare.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // Récupérer tous les articles (Public)
    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    // Créer un article (Protégé par JWT)
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        // 1. On récupère l'identité (email) validée par le JwtFilter
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sellerEmail = authentication.getName();

        // 2. On passe l'email au service pour lier l'annonce au bon utilisateur
        Item savedItem = itemService.createItem(item, sellerEmail);

        return ResponseEntity.ok(savedItem);
    }

    // Modifier un article (Protégé par JWT + Vérification du propriétaire)
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sellerEmail = authentication.getName();

        Item updatedItem = itemService.updateItem(id, itemDetails, sellerEmail);
        return ResponseEntity.ok(updatedItem);
    }

    // Supprimer un article (Protégé par JWT + Vérification du propriétaire)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String sellerEmail = authentication.getName();

        itemService.deleteItem(id, sellerEmail);
        return ResponseEntity.noContent().build(); // Renvoie un statut 204 (No Content) en cas de succès
    }




}
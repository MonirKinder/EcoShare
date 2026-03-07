package com.ecoshare.Ecoshare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "annonces")
@Data
// Items : { id, sellerId, photos: [string], title,
// price, category, description, tags: [string] }
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vendeur_id", nullable = false)
    private User vendeur;

    @Column(nullable = false)
    private String title;

    @ElementCollection
    private List<String> photos;

    private String description;

    private Double price;

    @Column(nullable = false)
    private String category;

    @ElementCollection
    private List<String> tags;
}


package com.ecoshare.Ecoshare.controller;

import com.ecoshare.Ecoshare.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileUploadService.storeFile(file);
            // On renvoie l'URL relative pour que le front puisse l'afficher
            return ResponseEntity.ok(Map.of("url", "/uploads/" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur upload : " + e.getMessage());
        }
    }
}
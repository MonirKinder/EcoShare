package com.ecoshare.Ecoshare.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;
import java.util.Objects;

@Service
public class FileUploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {

        String contentType = file.getContentType();                 //verifie si le fichier est une image
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("Le fichier doit être une image (jpg, png, etc.)."); // faudra faire try catch pour gerer ça
        }

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();  //fait ça pour que ça marche partout, windows, linux ...


        if (!Files.exists(uploadPath)) {       //cree le dossier pour les phots si ça n'existe pas
            Files.createDirectories(uploadPath);
        }



        String fileName = UUID.randomUUID().toString() + "_" + StringUtils.cleanPath(file.getOriginalFilename());   // genere nom unique pour chaque photo sans characeteres speciaux
        Path filePath = uploadPath.resolve(fileName);                                                               //dangers possibles, utilisateur enregistre avec des caracteres comme .. ou // pour sortir du dossier upload


        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }
}
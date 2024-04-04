package com.example.buzzloopbackend.controller;

import com.example.buzzloopbackend.model.Buzz;
import com.example.buzzloopbackend.model.BuzzRequest;
import com.example.buzzloopbackend.service.BuzzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/buzz")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BuzzController {

    private final BuzzService buzzService;

    @Autowired
    public BuzzController(BuzzService buzzService) {
        this.buzzService = buzzService;
    }

    @PostMapping("/")
    public ResponseEntity<String> createBuzz(@RequestBody BuzzRequest request) {
        if (request.getContent() == null || request.getContent().isEmpty()) {
            return ResponseEntity.badRequest().body("Buzz content cannot be empty");
        }

        Buzz buzz = new Buzz();
        buzz.setId(UUID.randomUUID().toString());
        buzz.setContent(request.getContent());
        buzz.setCreatedAt(LocalDateTime.now());
        buzz.setAuthor(request.getAuthor());

        buzzService.createBuzz(buzz);

        return ResponseEntity.status(HttpStatus.CREATED).body("Buzz created successfully");
    }

    @GetMapping("/")
    public ResponseEntity<List<Buzz>> getAllBuzzes() {
        List<Buzz> buzzes = buzzService.getAllBuzzes();
        return ResponseEntity.ok(buzzes);
    }
}

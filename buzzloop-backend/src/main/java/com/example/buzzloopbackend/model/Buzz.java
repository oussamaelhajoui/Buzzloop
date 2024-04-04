package com.example.buzzloopbackend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Buzz {
    private String id;
    private String content;
    private LocalDateTime createdAt;
    private String author;
}

package com.example.buzzloopbackend.model;

import lombok.Data;

@Data
public class BuzzRequest {
    private String content;
    private String author;
}

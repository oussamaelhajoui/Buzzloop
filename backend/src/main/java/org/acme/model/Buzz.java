package org.acme.model;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Buzz {

    private String id;
    private String content;
    private LocalDateTime createdAt;
    private String author;
}

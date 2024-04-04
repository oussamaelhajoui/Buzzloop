package com.example.buzzloopbackend.service;

import com.example.buzzloopbackend.model.Buzz;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuzzService {

    private final List<Buzz> buzzes = new ArrayList<>();

    public void createBuzz(Buzz buzz) {
        buzzes.add(buzz);
    }

    public List<Buzz> getAllBuzzes() {
        return new ArrayList<>(buzzes);
    }
}

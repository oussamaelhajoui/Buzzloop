package org.acme.repository;

import org.acme.model.Buzz;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class BuzzRepository {

    private final List<Buzz> buzzes = new ArrayList<>();

    public void save(Buzz buzz) {
        buzzes.add(buzz);
    }

    public List<Buzz> findAll() {
        return new ArrayList<>(buzzes);
    }
}

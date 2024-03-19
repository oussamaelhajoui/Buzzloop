package org.acme.service;

import org.acme.model.Buzz;
import org.acme.repository.BuzzRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class BuzzService {

    private final BuzzRepository buzzRepository;

    @Inject
    public BuzzService(BuzzRepository buzzRepository) {
        this.buzzRepository = buzzRepository;
    }

    
    public void createBuzz(Buzz buzz) {
        buzzRepository.save(buzz);
    }

    public List<Buzz> getAllBuzzes() {
        return buzzRepository.findAll();
    }

}

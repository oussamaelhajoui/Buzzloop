package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.acme.model.Buzz;
import org.acme.model.BuzzRequest;
import org.acme.service.BuzzService;

@Path("/api/buzz")
public class BuzzResource {

    @Inject
    BuzzService buzzService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createBuzz(BuzzRequest request) {
        if (request.getContent() == null || request.getContent().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Buzz content cannot be empty")
                    .build();
        }

        Buzz buzz = new Buzz();
        buzz.setId(UUID.randomUUID().toString());
        buzz.setContent(request.getContent());
        buzz.setCreatedAt(LocalDateTime.now());
        buzz.setAuthor(request.getAuthor());

        buzzService.createBuzz(buzz);

        return Response.status(Response.Status.CREATED)
                .entity("Buzz created successfully")
                .build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBuzzes() {
        List<Buzz> buzzes = buzzService.getAllBuzzes();
        return Response.ok(buzzes).build();
    }
}
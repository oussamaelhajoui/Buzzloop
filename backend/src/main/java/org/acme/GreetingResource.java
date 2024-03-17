package org.acme;

import java.util.ArrayList;
import java.util.List;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/api")
public class GreetingResource {

    @GET
    @Path("/")
    public String hello() {
        return "Hello World!";
    }

    @GET
    @Path("/tweets")
    public List<Tweets> tweet() {
        List<Tweets> tweetList = new ArrayList<>();
        tweetList.add(new Tweets("This is my first tweet"));
        tweetList.add(new Tweets("this is my second tweet"));
        tweetList.add(new Tweets("i like to tweet"));
        return tweetList;
    }
}

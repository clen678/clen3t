package dev.cleng.clen3t.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import dev.cleng.clen3t.UserRepository;
import dev.cleng.clen3t.domain.User;

@Service
public class UserService {
    @Autowired //automatically instantiates the userRepo var to access db
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a single user
    public Optional<User> getSingleUser(ObjectId id) {
        return userRepository.findById(id);
    }

    // Create a new user
    public User createNewUser(User user) {
        return userRepository.insert(user);
    }

    // Update a user
    public Optional<User> updateSingleUser(ObjectId id, User updatedUser) {
        Optional<User> foundUser = userRepository.findById(id);

        if (foundUser != null) {
            updatedUser.setId(id); // learn
            mongoTemplate.save(updatedUser);
            return Optional.of(updatedUser);
        } else {
            return null;
        }
    }
}

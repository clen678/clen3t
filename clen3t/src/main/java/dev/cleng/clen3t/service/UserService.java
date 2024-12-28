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
import dev.cleng.clen3t.exceptions.UserConflictException;

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
    public Optional<User> createNewUser(User user) throws UserConflictException {
        
        //validate unique username
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getUsername().equals(user.getUsername())) {
                throw new UserConflictException("Username already exists");
            }
        }
        
        try {
            return Optional.of(userRepository.insert(user));
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;
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

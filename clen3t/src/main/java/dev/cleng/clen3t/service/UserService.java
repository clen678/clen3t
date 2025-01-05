package dev.cleng.clen3t.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import dev.cleng.clen3t.UserRepository;
import dev.cleng.clen3t.domain.User;
import dev.cleng.clen3t.exceptions.UserConflictException;
import dev.cleng.clen3t.exceptions.UserNotFoundException;

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
    public Optional<User> getSingleUser(String id) {
        return userRepository.findUserByUserId(id);
    }

    // Create a new user
    public Optional<User> createNewUser(User user) throws UserConflictException {
        List<User> users = userRepository.findAll();

        // validate unique username
        for (User u : users) {
            if (u.getUsername().equals(user.getUsername())) {
                throw new UserConflictException("Username already exists");
            }
        }

        user.setUserId(UUID.randomUUID().toString());
        user.setHighscore(0);

        try {
            return Optional.of(userRepository.insert(user));
        } catch (Exception e) {
            // TODO: handle exception
        }
        return Optional.empty();
    }

    // Update a user
    public Optional<User> updateSingleUser(String id, User updatedUser) throws UserNotFoundException {
        Optional<User> foundUser = userRepository.findUserByUserId(id);
        System.out.println("finding");
        
        if (foundUser.isPresent()) {
            System.out.println("fioubd");
            // updatedUser.setUserId(id); // learn
            // userRepository.save(updatedUser); // persist changes
            User user = foundUser.get();
            user.setHighscore(updatedUser.getHighscore());
            userRepository.save(user);
            return Optional.of(updatedUser);
        } else {
            throw new UserNotFoundException("user not found");
        }
    }

    public void deleteSingleUser(String id) throws UserNotFoundException {
    try {
        Optional<User> user = userRepository.findUserByUserId(id);
        userRepository.deleteByUserId(id);
    } catch (UserNotFoundException e) {
        return;
    }
    }
}

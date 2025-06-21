package dev.cleng.clen3t.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import dev.cleng.clen3t.UserRepository;
import dev.cleng.clen3t.domain.LoginRequest;
import dev.cleng.clen3t.domain.User;
import dev.cleng.clen3t.exceptions.InvalidLoginDetailsException;
import dev.cleng.clen3t.exceptions.UserConflictException;
import dev.cleng.clen3t.exceptions.UserNotFoundException;

@Service
public class UserService {
    @Autowired //automatically instantiates the userRepo var to access db
    private UserRepository userRepository;

    // @Autowired
    // private MongoTemplate mongoTemplate;

    // Get all users
    // fix error handling for this
    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    // Get a single user by id
    public Optional<User> getSingleUser(String id) throws UserNotFoundException {
        Optional<User> foundUser = userRepository.findUserByUserId(id);

        if (!foundUser.isPresent()) {
            throw new UserNotFoundException("User not found for id: " + id);
        }

        return foundUser;
    }

    // Create a new user
    // error handling here is lazy fix this
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
        user.setGamesPlayedToday(0);
        user.setLastGamePlayedDate(null); // set to null initially

        try {
            return Optional.of(userRepository.insert(user));
        } catch (Exception e) {
            // do this
        }
        return Optional.empty();
    }

    // Update a user by id
    // possible security concerns?
    public Optional<User> updateSingleUserScore(String id, User updatedUser) throws UserNotFoundException {
        Optional<User> foundUser = userRepository.findUserByUserId(id);
        
        if (foundUser.isPresent()) {
            // updatedUser.setUserId(id); // learn
            // userRepository.save(updatedUser); // persist changes
            User user = foundUser.get();
            user.setHighscore(updatedUser.getHighscore());
            userRepository.save(user);
            return Optional.of(updatedUser);
        } else {
            throw new UserNotFoundException("User not found for id: " + id);
        }
    }

    // Delete a user by id
    public void deleteSingleUser(String id) throws UserNotFoundException {
        Optional<User> user = userRepository.findUserByUserId(id);

        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found for id: " + id);
        }

        userRepository.deleteByUserId(id);
    }

    // Login a user
    public Optional<User> loginSingleUser(LoginRequest loginRequest) throws UserNotFoundException, InvalidLoginDetailsException {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Optional<User> foundUser = userRepository.findUserByUsername(username);
        
        if (!foundUser.isPresent()) {
            throw new UserNotFoundException("User not found for username: " + username);
        }

        if (!foundUser.get().getPassword().equals(password)) {
            throw new InvalidLoginDetailsException("Invalid login details");
        }

        return foundUser;
    }

    // Increment games played today
    public Optional<User> incrementUserGamesPlayed(String id) throws UserNotFoundException {
        Optional<User> foundUser = userRepository.findUserByUserId(id);

        if (foundUser.isPresent()) {
            User existingUser = foundUser.get();
            Date now = new java.util.Date();

            // Check if lastGamePlayedDate is today
            boolean sameDay = false;
            if (existingUser.getLastGamePlayedDate() != null) {
                java.util.Calendar cal1 = java.util.Calendar.getInstance();
                java.util.Calendar cal2 = java.util.Calendar.getInstance();
                cal1.setTime(now);
                cal2.setTime(existingUser.getLastGamePlayedDate());
                sameDay = cal1.get(java.util.Calendar.YEAR) == cal2.get(java.util.Calendar.YEAR)
                        && cal1.get(java.util.Calendar.DAY_OF_YEAR) == cal2.get(java.util.Calendar.DAY_OF_YEAR);
            }

            if (sameDay) {
                existingUser.setGamesPlayedToday(existingUser.getGamesPlayedToday() + 1);
            } else {
                existingUser.setGamesPlayedToday(1);
            }
            existingUser.setLastGamePlayedDate(now);
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        } else {
            throw new UserNotFoundException("User not found for id: " + id);
        }
    }
}

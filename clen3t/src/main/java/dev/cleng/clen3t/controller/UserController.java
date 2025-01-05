package dev.cleng.clen3t.controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.cleng.clen3t.domain.User;
import dev.cleng.clen3t.exceptions.UserConflictException;
import dev.cleng.clen3t.exceptions.UserNotFoundException;
import dev.cleng.clen3t.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String id) {
        return new ResponseEntity<Optional<User>>(userService.getSingleUser(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Optional<User>> createUser(@RequestBody User user) throws UserConflictException {

        try {
            return new ResponseEntity<Optional<User>>(userService.createNewUser(user), HttpStatus.CREATED);
        } catch (UserConflictException e) {
            return new ResponseEntity<Optional<User>>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<Optional<User>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<User>> updateUser(@PathVariable String id, @RequestBody User user) throws UserNotFoundException {
        return new ResponseEntity<Optional<User>>(userService.updateSingleUser(id, user), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) throws UserNotFoundException {
        
        try {
            userService.deleteSingleUser(id);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
    }
    
}

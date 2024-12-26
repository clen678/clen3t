package dev.cleng.clen3t;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.cleng.clen3t.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    
}

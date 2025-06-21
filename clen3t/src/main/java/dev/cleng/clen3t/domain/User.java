package dev.cleng.clen3t.domain;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "users")
@Data // lombok annotation to generate getters and setters
@AllArgsConstructor // lombok annotation to generate constructors
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;
    
    @Indexed(unique = true)
    private String userId;

    @Indexed(unique = true)
    private String username;

    private String password;

    private Integer highscore;

    private Date lastGamePlayedDate;

    private Integer gamesPlayedToday;

    //future: rank, friends, userId, etc.


}

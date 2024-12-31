package dev.cleng.clen3t.controller;

import java.util.Optional;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.cleng.clen3t.domain.Board;
import dev.cleng.clen3t.service.BoardService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final ChatClient chatClient;

    public BoardController (ChatClient.Builder builder) {
        this.chatClient = builder
                        .defaultSystem(
                        "You are an AI playing Tic Tac Toe. The board is represented as a 3x3 grid. '0' means empty, '1' is the user's move, and '2' is your move. IMPORTANT! TRY TO WIN BY BLOCKING THREE 1's IN A ROW IN HORIZONTAL, VERTICAL OR DIAGONAL DIRECTIONS AND MAKING THREE 2's IN A ROW FOR YOURSELF. Respond only with the new grid as a 2d array.")
                        .build();
    }

    @Autowired
    private BoardService boardService;
    
    @PostMapping
    public ResponseEntity<Optional<Board>> processBoard(@RequestBody Board board){
        // System.out.println("processing board");

        String response = chatClient.prompt()
                .user(boardService.convertGridToString(board.getGrid()))
                .call()
                .content();

        System.out.println(response);

        return new ResponseEntity<Optional<Board>>(boardService.processUserBoard(response), HttpStatus.OK);
    }

}

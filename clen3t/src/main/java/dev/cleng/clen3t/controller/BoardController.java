package dev.cleng.clen3t.controller;

import java.util.Optional;

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

    @Autowired
    private BoardService boardService;
    
    @PostMapping
    public ResponseEntity<Optional<Board>> processBoard(@RequestBody Board board){
        // System.out.println("processing board");

        return new ResponseEntity<Optional<Board>>(boardService.processUserBoard(board), HttpStatus.OK);
    }

}

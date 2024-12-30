package dev.cleng.clen3t.service;

import org.springframework.stereotype.Service;
import java.util.Optional;

import dev.cleng.clen3t.domain.Board;

@Service
public class BoardService {
    
    public Optional<Board> processUserBoard(Board board) {
        
        
        return Optional.of(board);
    }
}

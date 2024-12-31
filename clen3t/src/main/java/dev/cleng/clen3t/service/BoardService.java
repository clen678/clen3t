package dev.cleng.clen3t.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import dev.cleng.clen3t.domain.Board;
import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BoardService {
    
    public Optional<Board> processUserBoard(String response) {
        
        // Board newBoard = [][];
        Board newBoard = new Board();
        newBoard.setGrid(new int[3][3]);
        
        return Optional.of(newBoard);
    }

    public String convertGridToString (int[][] grid) {
        String stringified = "[[" + grid[0][0] + "," + grid[0][1] + "," + grid[0][2] + "],[" + grid[1][0] + "," + grid[1][1] + "," + grid[1][2] + "],[" + grid[2][0] + "," + grid[2][1] + "," + grid[2][2] + "]]";
        return stringified;
    }
}

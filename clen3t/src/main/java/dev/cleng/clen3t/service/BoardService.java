package dev.cleng.clen3t.service;

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
    
    public Optional<Board> processUserBoard(Board board) {
        
        Board newBoard = board;
        // if((newBoard.getGrid()[2][2] == 2)&&(newBoard.getGrid()[2][1] == 2)){
        //     newBoard.getGrid()[2][0] = 2;
        //     return Optional.of(newBoard);
        // }

        // if (newBoard.getGrid()[2][2] == 2){
        //     newBoard.getGrid()[2][1] = 2;
        //     return Optional.of(newBoard);
        // }
        
        // newBoard.getGrid()[2][2] = 2;

        try {
            HttpResponse response = callOpenAi(convertGridToString(newBoard.getGrid()));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return Optional.of(newBoard);
    }

    private HttpResponse callOpenAi(String boardString) throws IOException, InterruptedException {
        Dotenv dotenv = Dotenv.configure()
                        .directory("C:/Users/Charles/OneDrive/Documents/Code/clen3t/src/main/resources/.env")
                        .load();
        String apiKey = dotenv.get("OPENAI_API_KEY");
        var body = String.format("""
                {
                    "model": "gpt-4o",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are an AI playing Tic Tac Toe. The board is represented as a 3x3 grid. '0' means empty, '1' is the user's move, and '2' is your move. IMPORTANT! TRY TO WIN BY BLOCKING THREE 1's IN A ROW IN HORIZONTAL, VERTICAL OR DIAGONAL DIRECTIONS AND MAKING THREE 2's IN A ROW FOR YOURSELF. Respond only with the new grid as a 2d array."
                        },
                        {
                            "role": "user",
                            "content": "%s"
                        }
                    ],
                    "max_tokens": 50
                }
                """, boardString);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        var client = HttpClient.newHttpClient();
        var response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        return response;
    }

    private String convertGridToString (int[][] grid) {
        String stringified = "[[" + grid[0][0] + "," + grid[0][1] + "," + grid[0][2] + "],[" + grid[1][0] + "," + grid[1][1] + "," + grid[1][2] + "],[" + grid[2][0] + "," + grid[2][1] + "," + grid[2][2] + "]]";
        return stringified;
    }
}

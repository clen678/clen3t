package dev.cleng.clen3t.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.TypeResolutionContext.Empty;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

import dev.cleng.clen3t.domain.Board;
import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BoardService {
    
    public Optional<Board> processUserBoard(Board board) {
        
        Board clientBoard = board;
        Board newBoard = new Board();

        try {
            HttpResponse<String> response = callOpenAi(convertGridToString(clientBoard.getGrid()));
            newBoard = convertToBoard(response);

            return Optional.of(newBoard);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
                    
            return Optional.empty();
        }
    
        private HttpResponse<String> callOpenAi(String boardString) throws IOException, InterruptedException {
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
                            "content": "You are an AI playing Tic Tac Toe. The board is a 3x3 grid, where '0' represents an empty spot, '1' is the user's move, and '2' is your move. Your will ALWAYS! place a 2 and block the user from completing three '1's in a row (horizontally, vertically, or diagonally) and to complete three '2's in a row to win. IMPORTANT Respond only with the updated grid as a list of numbers in the format '1,0,0,0,1,0,0,0,1', with no spaces, brackets, or line breaks, and without any extra text or explanations."
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
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return response;
    }

    private Board convertToBoard(HttpResponse<String> response) throws IOException {

        // parse the JSON response to extract the board
        String updatedPositions = parseResponse(response.body());
        System.out.println("Updated Board:\n" + updatedPositions);
        
        // convert the list to a new board grid
        return convertStringToBoard(updatedPositions);
    }

    private String convertGridToString (int[][] grid) {
        String stringified = "[[" + grid[0][0] + "," + grid[0][1] + "," + grid[0][2] + "],[" + grid[1][0] + "," + grid[1][1] + "," + grid[1][2] + "],[" + grid[2][0] + "," + grid[2][1] + "," + grid[2][2] + "]]";
        System.out.println("inputting board: " + stringified);
        return stringified;
    }

    private Board convertStringToBoard(String input) {
        input = input.replaceAll("\\n", ","); // Remove newline characters
        String[] temp = input.split(",");
        Board newBoard = new Board();
        newBoard.setGrid(new int[3][3]);
        for (String element : temp) {
            System.out.println(element);
        }
        
        newBoard.getGrid()[0][0] = Integer.parseInt(temp[0]);
        newBoard.getGrid()[0][1] = Integer.parseInt(temp[1]);
        newBoard.getGrid()[0][2] = Integer.parseInt(temp[2]);
        newBoard.getGrid()[1][0] = Integer.parseInt(temp[3]);
        newBoard.getGrid()[1][1] = Integer.parseInt(temp[4]);
        newBoard.getGrid()[1][2] = Integer.parseInt(temp[5]);
        newBoard.getGrid()[2][0] = Integer.parseInt(temp[6]);
        newBoard.getGrid()[2][1] = Integer.parseInt(temp[7]);
        newBoard.getGrid()[2][2] = Integer.parseInt(temp[8]);

        return newBoard;
    }

    private String parseResponse(String responseBody) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root = mapper.readTree(responseBody);
    
    // Navigate to the content field (e.g., choices[0].message.content)
    String content = root.get("choices").get(0).get("message").get("content").asText();
    return content;
    }
}

package dev.cleng.clen3t.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import dev.cleng.clen3t.domain.Board;
import io.github.cdimascio.dotenv.Dotenv;

@Service
public class BoardService {
    // Inject the API key directly using Spring's @Value annotation
    // Add for deployment
    @Value("${OPENAI_API_KEY}") 
    private String openAiApiKey;
    
    String responseChanger = "";
    
    public Optional<Board> processUserBoard(Board board) throws RuntimeErrorException {
        int loopCount = 0;
        Optional<Board> clientBoard = Optional.of(board);
        Optional<Board> newBoard = Optional.of(new Board());

        // first see if player wins. if winner is detected here
        Optional<Integer> winner = checkWinner(clientBoard.get().getGrid());
        if (winner.isPresent()) {
            newBoard = clientBoard;
            newBoard.get().setWinner(winner.get());
            System.out.println("winner set to (player): " + 1);
            return newBoard;
        }

        try {
            while(true) {
                // TODO: MAKE THIS ERROR HANDLING BETTER
                if (loopCount == 1) {
                    responseChanger = "GIVE A VALID RESPONSE, ONLY MODIFY THE 0's IN THE GRID as a list of numbers in the format '1,0,0,0,1,0,0,0,1', with no spaces, brackets, or line breaks, and without any extra text or explanations.";
                }
                
                // cancel if AI fails more than 5 times
                if (loopCount > 3) {
                    System.out.println("Board is full or unexpected AI error, ending connection with AI");
                    // throw new RuntimeException();
                    clientBoard.get().setWinner(4); // signifies ai error
                    return clientBoard; // return original board
                }

                // call api for the new board
                HttpResponse<String> response = callOpenAi(convertGridToString(clientBoard.get().getGrid()), clientBoard.get().getModel());
                newBoard = convertToBoard(response);

                // verify if ai response is valid
                if (newBoard.isPresent() && (validateAiBoard(clientBoard.get(), newBoard.get()))) {

                    //check if ai is winner
                    Optional<Integer> newWinner = checkWinner(newBoard.get().getGrid());
                    if (newWinner.isPresent()) {
                        newBoard.get().setWinner(newWinner.get());
                        System.out.println("winner set to (ai): " + newWinner.get());
                    }
                    break;
                }
                responseChanger = "Your last response was invalid, send a valid response either blocking the user from placing three 1's or try to make three 2's of yourself";
                loopCount++;
            }

            return newBoard;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
                    
            return Optional.empty();
        }
    
        private HttpResponse<String> callOpenAi(String boardString, String model) throws IOException, InterruptedException {
        // Comment out for deployment on fly.io
        // Dotenv dotenv = Dotenv.configure()
        //         .directory("clen3t/src/main/resources")
        //         .load();
        // String apiKey = dotenv.get("OPENAI_API_KEY");
        // System.out.println("apiKeyYYYYYYYYYYY: " + apiKey);
        String body;
        System.out.println("recived request for model: " + model);
        if (model != null && model.equals("GPTO1MINI")) {
            body = String.format(
                    """
                        {
                            "model": "o1-mini",
                            "messages": [
                                {
                                    "role": "user",
                                    "content": "You are an AI playing Tic Tac Toe. The board is a 3x3 grid, where '0' represents an empty spot, '1' is the user's move, and '2' is your move. Your will ALWAYS! place a 2 and block the user from completing three '1's in a row (horizontally, vertically, or diagonally). ALSO TRY TO WIN THE GAME and place three '2's in a row. IMPORTANT Respond only with the updated grid as a list of numbers in the format '1,0,0,0,1,0,0,0,1', with no spaces, brackets, or line breaks, and without any extra text or explanations. The user input is as 2d array: %s, %s"
                                }
                            ]
                        }
                        """,
                    boardString, responseChanger);
            System.out.println("responding with o1-mini");
        } else {
                body = String.format(
                        """
                            {
                                "model": "gpt-4o",
                                "messages": [
                                    {
                                        "role": "system",
                                        "content": "You are an AI playing Tic Tac Toe. The board is a 3x3 grid, where '0' represents an empty spot, '1' is the user's move, and '2' is your move. Your will ALWAYS! place a 2 and block the user from completing three '1's in a row (horizontally, vertically, or diagonally). ALSO TRY TO WIN THE GAME and place three '2's in a row. IMPORTANT Respond only with the updated grid as a list of numbers in the format '1,0,0,0,1,0,0,0,1', with no spaces, brackets, or line breaks, and without any extra text or explanations. The user input is as 2d array"
                                    },
                                    {
                                        "role": "user",
                                        "content": "%s,%s"
                                    }
                                ],
                                "max_tokens": 50
                            }
                            """,
                        boardString, responseChanger);
                System.out.println("responding with 4o");
        }

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openAiApiKey) // apiKey from environment variable for local development
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        var client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        responseChanger = "";
        System.out.println("raw response: " + response.body());
        return response;
    }
    
    private String convertGridToString (int[][] grid) {
        String stringified = "[[" + grid[0][0] + "," + grid[0][1] + "," + grid[0][2] + "],[" + grid[1][0] + "," + grid[1][1] + "," + grid[1][2] + "],[" + grid[2][0] + "," + grid[2][1] + "," + grid[2][2] + "]]";
        System.out.println("inputting board: " + stringified);
        System.out.println("with responseChanger: "+ responseChanger);
        return stringified;
    }

    // converts the ai response to a board
    private Optional<Board> convertToBoard(HttpResponse<String> response) throws IOException {

        // parse the JSON response to extract the board
        String updatedPositions = parseResponse(response.body());
        System.out.println("Updated Board:\n" + updatedPositions);
        
        // convert the list to a new board grid
        return convertStringToBoard(updatedPositions);
    }

    private Optional<Board> convertStringToBoard(String input) {
        input = input.replaceAll("\\n", ","); // Remove newline characters
        String[] temp = input.split(",");

        if(!validateAiResponse(temp)){
            System.out.println("ai did not respond in correct format, trying again");
            return Optional.empty();
        }

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

        // could move validateAiBoard into here?
        return Optional.of(newBoard);
    }

    private String parseResponse(String responseBody) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root = mapper.readTree(responseBody);
    
    // Navigate to the content field (e.g., choices[0].message.content)
    String content = root.get("choices").get(0).get("message").get("content").asText();
    return content;
    }

    private Boolean validateAiBoard(Board oldBoard, Board newBoard) {
        Boolean result = true;
        int[][] oldGrid = oldBoard.getGrid();
        int[][] newGrid = newBoard.getGrid();
        int OldOneCount = 0;
        int OldTwoCount = 0;
        int NewOneCount = 0;
        int NewTwoCount = 0;

        // check if ai returned duplicate board or changed already placed moves
        for (int row=0; row <=2; row++) {
            for (int col = 0; col <= 2; col++) {
                if (oldGrid[row][col] == 1) {
                    OldOneCount++;
                } else if (oldGrid[row][col] == 2) {
                    OldTwoCount++;
                }

                if (newGrid[row][col] == 1) {
                    NewOneCount++;
                } else if (newGrid[row][col] == 2) {
                    NewTwoCount++;
                }
            }
        }

        if (!(OldOneCount == NewOneCount) || (OldTwoCount == NewTwoCount)) {
            System.out.println("Invalid AI move, trying again");
            result = false;
        }

        return result;
    }
    
    private Boolean validateAiResponse(String[] input) {
        return (input.length == 9 ? true : false);
    }

    private Optional<Integer> checkWinner(int[][] grid) {
        System.out.println("checking winner...");
        int winner = 0;
        int nonZero = 0;

        // check rows
        for (int row=0; row<3; row++) {
            if ((grid[row][0] == grid[row][1]) && (grid[row][1] == grid[row][2]) && (grid[row][0] != 0)) {
                System.out.println(grid[row][0] + " wins");
                winner = grid[row][0];
            }
        }

        // check cols
        for (int col = 0; col < 3; col++) {
            if ((grid[0][col] == grid[1][col]) && (grid[1][col] == grid[2][col]) && (grid[0][col] != 0)) {
                System.out.println(grid[0][col] + " wins");
                winner = grid[0][col];
            }
        }

        // check diagonals
        if (grid[0][0] != 0 && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
            System.out.println(grid[0][0] + " wins");
            winner = grid[0][0];
        }
        if (grid[0][2] != 0 && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
            System.out.println(grid[0][2] + " wins");
            winner = grid[0][2];
        }

        // check for tie (if board is full)
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                if (grid[row][col] != 0) {
                    nonZero++;
                }
            }
        }
        
        // tie if no winner already found and board is full
        if (nonZero == 9 && winner ==0) {
            winner = 3;
        }

        if (winner != 0) {
            System.out.println("winner nonzero");
            return Optional.of(winner);
        } else {
            return Optional.empty();
        }
    }
}

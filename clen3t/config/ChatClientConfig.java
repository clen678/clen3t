package dev.cleng.clen3t.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient.Builder chatClientBuilder() {
        return ChatClient.builder()
                .apiKey(System.getenv("OPENAI_API_KEY")) // Use an environment variable for the API key
                .baseUrl("https://api.openai.com/v1"); // Ensure this base URL is correct for OpenAI
    }
}

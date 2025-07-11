package dev.cleng.clen3t;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource; // Add this import

@SpringBootTest
@TestPropertySource(properties = { "OPENAI_API_KEY=test-api-key" }) // Add this annotation
class Clen3tApplicationTests {

	@Test
	void contextLoads() {
	}

}

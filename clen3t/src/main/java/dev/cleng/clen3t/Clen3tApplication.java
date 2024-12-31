package dev.cleng.clen3t;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "dev.cleng.clen3t", "org.springframework.ai" })
public class Clen3tApplication {

	public static void main(String[] args) {
		SpringApplication.run(Clen3tApplication.class, args);
	}

}

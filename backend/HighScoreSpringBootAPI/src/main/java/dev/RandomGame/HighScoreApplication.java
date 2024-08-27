package dev.RandomGame;

import dev.RandomGame.repository.HighScoreRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HighScoreApplication {

	public static void main(String[] args) {
		HighScoreRepository highScoreRepository = new HighScoreRepository();

		SpringApplication.run(HighScoreApplication.class, args);


		System.out.println(highScoreRepository.toString());

	}

}

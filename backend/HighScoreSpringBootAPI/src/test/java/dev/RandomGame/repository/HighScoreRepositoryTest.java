package dev.RandomGame.repository;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HighScoreRepositoryTest {

    HighScoreRepository highScoreRepository = new HighScoreRepository();
    @Test
    void add() {
        highScoreRepository.add("AndyPandy", 1000);
        if (highScoreRepository.highScores.contains("AndyPandy")) {
            System.out.println("AndyPandy has been added to the high scores");
        }
        int score = highScoreRepository.getScore("AndyPandy");
        assertEquals(1000, score);
        highScoreRepository.remove("AndyPandy");
    }

    @Test
    void remove() {

        highScoreRepository.add("AndyPandy", 1000);
        if(highScoreRepository.highScores.contains("AndyPandy")) {
            System.out.println("AndyPandy has been added to the high scores");
        }
        highScoreRepository.remove("AndyPandy");
        if (!highScoreRepository.highScores.contains("AndyPandy")) {
            System.out.println("AndyPandy has been removed from the high scores");
        }

    }

    @Test
    void update() {

        highScoreRepository.add("AndyPandy", 1000);
        if(highScoreRepository.highScores.contains("AndyPandy")) {
            System.out.println("AndyPandy has been added to the high scores");
        }
        highScoreRepository.update("AndyPandy", 2000);

        int score = highScoreRepository.getScore("AndyPandy");
        assertEquals(2000, score);
    }

    @Test
    void clear() {

        highScoreRepository.add("AndyPandy", 1000);
        highScoreRepository.add("AndyPandy2", 1000);
      System.out.println(highScoreRepository.highScores.size());
      highScoreRepository.clear();
      assertEquals(0, highScoreRepository.highScores.size());
        System.out.println(highScoreRepository.highScores.size());
    }
}
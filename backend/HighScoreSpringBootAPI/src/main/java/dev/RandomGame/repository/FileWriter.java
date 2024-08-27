package dev.RandomGame.repository;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev.RandomGame.model.HighScore;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import java.io.*;
import java.lang.reflect.Type;

public class FileWriter {

    private HighScore highScore;
    private static final String FILE_NAME = "highscores.json";

    private Gson gson;
    public FileWriter() {
        this.gson = new Gson();
    }

    public void saveToFile(List<HighScore> highScores) {
        try (Writer writer = new java.io.FileWriter(FILE_NAME)) {
            gson.toJson(highScores, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<HighScore> loadFromFile() {
        File file = new File(FILE_NAME);
        if (file.exists()) {
            try (Reader reader = new FileReader(file)) {
                Type highScoreListType = new TypeToken<List<HighScore>>() {
                }.getType();
                List<HighScore> friends = gson.fromJson(reader, highScoreListType);
                if (friends != null) {
                    return friends;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ArrayList<>();
    }
}

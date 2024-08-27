package dev.RandomGame.model;


import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

public class HighScore {

    private String name;
    private int score;
    private String date;


    public HighScore(String name, int score) {
        this.name = name;
        this.score = score;
        this.date = new Date().toString();

    }

    /**
     * Formats the date to a readable format
     *
     * @param date
     * @return formatted date
     */
    public String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        String formattedDate = sdf.format(date);
        return formattedDate;
    }

    public String getName() {
        return name;
    }


    void setName(String name) {
        this.name = name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getDate() {
        return date;
    }

    @Override
    public String toString() {
        return "HighScore{" +
                "name='" + name + '\'' +
                ", score=" + score +
                ", date='" + date + '\'' +
                '}';
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HighScore highScore = (HighScore) o;
        return score == highScore.score && Objects.equals(name, highScore.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, score);
    }
}

#!/usr/bin/env python
import random

word_list = ['apple', 'mango', 'orange']
current_state = ''
maximum_guess = 6
num_wrong_guesses = 0

def select_word():
    word = random.choice(word_list)
    return word

def draw_figure(num_wrong_guesses):
    if num_wrong_guesses == 0:
        print("______")
        print("|    |")
        print("|")
        print("|")
        print("|")
        print("|")
    elif num_wrong_guesses == 1:
        print("______")
        print("|    |")
        print("|    O")
        print("|")
        print("|")
        print("|")
    elif num_wrong_guesses == 2:
        print("______")
        print("|    |")
        print("|    O")
        print("|    |")
        print("|")
        print("|")
    elif num_wrong_guesses == 3:
        print("______")
        print("|    |")
        print("|    O")
        print("|   /|")
        print("|")
        print("|")
    elif num_wrong_guesses == 4:
        print("______")
        print("|    |")
        print("|    O")
        print("|   /|\\")
        print("|")
        print("|")
    elif num_wrong_guesses == 5:
        print("______")
        print("|    |")
        print("|    O")
        print("|   /|\\")
        print("|   /")
        print("|")
    else:
        print("______")
        print("|    |")
        print("|    O")
        print("|   /|\\")
        print("|   / \\")
        print("|")
        print("Game over!")

selected_word = select_word()
current_state = '-' * len(selected_word)

while maximum_guess != 0:
    print("Current state:", current_state)
    chosen_letter = input("Enter the guess letter: ")

    if chosen_letter in selected_word:
        new_state = ''
        for i, char in enumerate(selected_word):
            if char == chosen_letter:
                new_state += chosen_letter
            else:
                new_state += current_state[i]
        current_state = new_state
    else:
        num_wrong_guesses += 1
        draw_figure(num_wrong_guesses)
        print("Incorrect guess. You have", maximum_guess - num_wrong_guesses, "guesses remaining.")

    if current_state == selected_word:
        print("Congratulations, you won!")
        break

    maximum_guess -= 1

if maximum_guess == 0:
    print("You have run out of guesses. The word was", selected_word)

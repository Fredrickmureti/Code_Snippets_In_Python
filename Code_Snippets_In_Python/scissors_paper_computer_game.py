#!/usr/bin/env python
#This is a simple game where the player chooses either scissors, rock or paper and computer randomly chooses
#one as well. The winner is determined by set of rules: [scissors beats paper, paper  beats rock and rock beats
#scissors]

import random

def get_player_choice():
    choice = input("Enter your choice(paper/scissors/rock): ")
    while choice not in ['scissors', 'paper', 'rock']:
        choice = input("Invalid choice! please choose again: ")
    return choice


def get_computer_choice():
    return random.choice(['scissors', 'paper', 'rock'])


def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        print("Tie!")
    
    elif (player_choice == 'scissors' and computer_choice == 'paper' or
          player_choice == 'paper' and computer_choice == 'rock' or
          player_choice == 'rock' and computer_choice == 'scissors'):
        print('You Win!')
    else:
        print("Computer wins!")


def play_game():
    print("let's play scissors computer game!")
    player_choice = get_player_choice()
    computer_choice = get_computer_choice()

    print("You chose:", player_choice)
    print("Computer chose:", computer_choice)
    determine_winner(player_choice, computer_choice)



play_game()
    

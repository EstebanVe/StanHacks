import Classes
# .py
from Classes import User, PFA, Reply
from Execution import create_PFA, list_PFA, filter_PFA, reply_PFA

# Temp users
users = [
    User("Police"),
    User("Citizen"),
]

# Menu Options / will be changed to use UI instead
def main():
    while True:
        print("\n--- Welcome to PFAA ---")
        print("New PFAA")
        print("View current PFAA's")
        print("Search PFA's")

        choice = input("1 2 3")

        if choice == "1":
            # New PFA
            content = input("Enter PFA Content: ")
            level = input("Enter Danger Level: ")
            username = input("Name: ")
            author = find_user_by_name(username)
            if author:
                PFA = create_PFA


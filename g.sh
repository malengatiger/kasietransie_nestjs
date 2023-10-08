#!/bin/bash

# Get the commit message from the command-line argument
message="$1"

echo "💙💙💙 Start GitHub Commit ... "

# Add all changes to the Git staging area
git add .

# Commit the changes with the provided commit message
git commit -m "$message"

echo "💙💙💙 Start GitHub Push ... "
git push
#!/bin/bash
echo "Starting cleanup of node_modules and package-lock.json files..."

# Remove all node_modules directories
echo "Removing node_modules directories..."
find . -name "node_modules" -type d -exec rm -rf {} +
echo "Removed node_modules directories."

# Remove all package-lock.json files
echo "Removing package-lock.json files..."
find . -name "package-lock.json" -type f -delete
echo "Removed package-lock.json files."

echo "Operation completed!"

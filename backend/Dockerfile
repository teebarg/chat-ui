# Use the official Python image as the base image
FROM python:3.11-slim-buster as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the project dependencies
RUN pip install -r requirements.txt

# Copy the entire project to the container's working directory
COPY . .

# Copy your Bash script into the container
COPY prestart.sh /usr/local/bin/

# Make the script executable (if needed)
RUN chmod +x /usr/local/bin/prestart.sh

# Run your existing command and then the Bash script
CMD ["sh", "-c", "/usr/local/bin/prestart.sh && uvicorn main:app --host 0.0.0.0 --port 80 --reload"]

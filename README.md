## Application 1: Rule Engine with AST (Client)

### Prerequisites
- Ensure you have [Docker](https://www.docker.com/get-started) installed on your system.
- Confirm that port **80** is free for the client application.

### Setup Instructions

1. **Clone the Repository**
   Open your terminal and navigate to the directory where you want to clone the repository. Run the following command:
   ```bash
   git clone https://github.com/fredrick2002/ruleengine-client
   cd ruleeengine-client
   ```

2. **Build the Docker Image**
   Execute the following command to build the Docker image for the client application. This process may take some time:
   ```bash
   docker build -t ruleengine-client .
   ```

3. **Verify Port Availability**
   Before running the Docker container, ensure that port **80** is not in use. You can check for active connections using:
   - On **Linux/Mac**:
     ```bash
     lsof -i :80
     ```
   - On **Windows**:
     ```bash
     netstat -ano | findstr :80
     ```

4. **Run the Docker Image**
   Start the client application by running the following command, mapping port **80** on your host to port **80** in the container:
   ```bash
   docker run -p 80:80 ruleengine-client
   ```

5. **Access the Rule Engine Client Application**
   Open your web browser and navigate to:
   ```
   http://localhost/
   ```

6. **Run the Backend Server**
   Make sure the backend server is running by cloning the server repository and following the setup instructions provided there:
   ```bash
   git clone https://github.com/fredrick2002/ruleengine-server.git
   ```

### Notes
- If you encounter any issues during the build process, check the terminal logs for errors and ensure that Docker has permission to access the necessary resources.
- To stop the running Docker container, you can use `Ctrl + C` in the terminal where it's running or find the container ID using:
  ```bash
  docker ps
  ```
  Then stop it using:
  ```bash
  docker stop <container-id>
  ```

## Application 1 : Rule Engine with AST(Client)
   
1. After clone open up the terminal from that directory

3. Then type this command to build the docker image(Takes some time to build)

```
docker build -t ruleengine-client .
```

4. Make sure port 80 is free 

5. run the image in docker

```
docker run -p 80:80 ruleengine-client
```

6. now open up browser and go to http://localhost/

7. Next run the backend server https://github.com/fredrick2002/ruleengine-server.git

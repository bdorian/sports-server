I) Deploying a node.js app on AWS EB + Docker

follow: https://medium.com/@sommershurbaji/deploying-a-docker-container-to-aws-with-elastic-beanstalk-28adfd6e7e95

1. Download Elastic Beanstalk (EB) and Docker

2. Dockerize fsm-server app (add Dockerfile and .dockerignore files)

3. Run docker build -t fsm-server .

4. Deploy the application with Elastic Beanstalk CLI

    in IAM generate an access key:
        access key ID: AKIAIPITIPUWHSVYKJFA
        Secret access key: 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

    * Save the secret access key for future use

    eb init
    * say no to "code commit" and "ssh"

    eb create
    * follow the prompts

    subsequently, to upgrade application
    eb deploy

II) Deploy admin application locally with docker

    * install docker on your computer

    1. Run docker build -t fsm-admin .

    2. docker save -o <path for generated tar file> <image name>

    3. docker load -i <path to image tar file>


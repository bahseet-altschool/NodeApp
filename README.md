# NodeApp

## Let's get coding!

Continuous Integration/Continuous Deployment (CI/CD)

-A functioning, well written workflows ease the task of developers by automating what developers will do manually, allowing developers to focus more on writing codes and other aspects.

-Created a workflow that integrate new codes that is pushed to the main branch, build it and deploy it to an EC2 server to see the effect of the new changes made to the code.

This workflow runs whenever there is a push event on the main branch

Context:

1. Environment variables where values are declared, and secrets stored inside the GitHub secrets are referenced,

2. Concurrency that ensures that multiple runs of this workflow(on the same branch) do not overlap,

3. Two jobs named "build" and "deploy to staging".

A. The build job runs on ubuntu machine and does four steps using prepackaged actions:

Prepackaged actions are re-usable, pre-defined tasks or functions that can be integrated into ones workflows to perform specific action.

i) Checkout code using actions/checkout@v4, a prepackaged action that fetches code from the repository, combined with "fetch-depth: 1" ensures that the latest commit is being fetched.

ii) Configure AWS credentials using aws-actions/configure-aws-credentials@v4 prepackaged action, which uses the AWS access key id, AWS secret access key, and a particular AWS region stored and/or declared inside the GitHub secrets and the environments variable. This sets up AWS authentication.

iii) Login to ECR (Elastic Container Registry) using aws-actions/amazon-ecr-login@v2 which logs into AWS ECR.

iv) Build and Push using a prepackaged actions that builds a docker image, pushes the image to ECR and tag the image with latest.

B. The "deploy to staging" job depends on the build job and will only run if the build job is successful. It runs a step on ubuntu machine.

Deploying the app to an EC2 instance using the prepackaged action named appleboy/ssh-action@master, which SSH into an EC2 instance.

The step will only run "if" the trigger (push) is on the main branch, and runs the following script:

set -ex: -x enables debug mode, and -e exit the script on encountering an error.

export IMAGE_TAG=latest: setting the value of variable IMAGE_TAG to latest, and makes the variable available to the following commands(child process). Which I did not later reference.

cd ~/alt-sch: change directory into an already created directory (alt-sch) which has a docker compose file.

aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin ${{ env.AWS_ECR_REGISTRY }}: authenticate docker with ECR so it can pull the latest image.

docker compose pull node-app: pulls the latest node-app service image from ECR

docker compose down -v --remove-orphans: this stops and remove any existing containers of the image.

docker compose up -d --force-recreate node-app: using the new image, it restarts the node-app service and runs the image in a detached mode using -d option.

docker image prune -af: this removes all unused docker images, else freeing up the disk spaces.

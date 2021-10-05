# Pipeline Designer
This is a simple react project create with create-react-project. It provides an area where 'Nodes' or 'items' (which are hard-coded & already added) can be moved around. Nodes can be connected to each other as well with the use of drag-and-drop - this uses a very basic collision detection system to check if two nodes are overlapping. However, this collision detection is limited in power and requires the current object & target object provided as parameters.

## Overview / Demo
Find a [quick video demo here](https://www.loom.com/share/cdae8ffdbe95415eb5cfdc11fd521790)

## Folder structure
Other than the boilerplate added by create-react-object, the file structure consists of a `components` folder inside the main `src` folder. Each component has its own dedicated folder with the `.tsx` file as well as the `.css` file (where needed).  
Other than the `components` file, there is also a `types` folder which exposes the types / interfaces used.

## Scripts
* Run `npm i` to install dependencies
* Run `npm start` to start the app locally
* Run `npm run build` to build production ready bundle of the app

## Limitations
* The pipeline design area has hardcoded amount of nodes. New nodes cannot be added
* The methods which check for connection of nodes receive hard-coded values (which means to scale this for x number of nodes, they will have to be refactored to check a current node for connection against all possible nodes)
* The connector between nodes does not automatically update its position if the nodes change their position (it needs to be clicked to update it)

## Package & Deployment
A Dockerfile has been created and added to the repo. This can be used to create a docker image.

* Navigate to the `pipeline-designer` folder if you haven't already (`cd pipeline-designer`)
* Run `docker build -t pipeline-designer .`. This would create the image
* Run `docker run -d -p 3000:3000 pipeline-designer` to run the image in a container

Once this image has been created - this means that the application has been packaged. So, this image can then be shared / pushed to a shared repository.

For deployment, different options can be used - of which Amazon ECS (AWS) and Kubernetes (Google Cloud Services) come to mind. A CI/CD pipeline can be created to handle this deployment for new versions of the application


## Improvements
* Add tests for the util methods used (detectCollision, handleConnection) -> it would be easier once they are refactored to move out of the App component (they were kept there for ease of use)
* Adding state management (redux or context-api) would make it easier to share state across the app instead of passing down props
* Support dynamic nodes (instead of hardcoding target node ref - passed to the `detectCollision` function)
* Allow user to add nodes by themselves instead of hardcoding
* Support multiple connections between nodes
* Scoped styling
* Using scss instead of css for styling (for ease of use)
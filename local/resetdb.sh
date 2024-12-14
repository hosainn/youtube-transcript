#!/bin/bash

dbContainerName=youtubeplayerdb
commandPrefix=sudo

getDBContainerId() {
	$commandPrefix docker ps -aqf "name=$dbContainerName"
}

removeDbContainer() {
	local dbContaierId=$1
	$commandPrefix docker rm $dbContaierId
}

echo "Resetting local DB..."
dbContaierId=$(getDBContainerId)

if [ -z "$dbContaierId" ]
then
	echo "No DB container found!"
else
	echo "Removing DB container name matching:" $dbContainerName " with id: " $dbContaierId
	removeDbContainer $dbContaierId
fi
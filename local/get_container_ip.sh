dbContainerName=youtubeplayerdb
commandPrefix=sudo

getDBContainerId() {
	$commandPrefix docker ps -aqf "name=$dbContainerName"
}

sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(getDBContainerId)
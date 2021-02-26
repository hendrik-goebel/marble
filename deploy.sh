#!/bin/bash
mkdir ./release;
tar -xvzf ./artifacts.tar.gz --directory ./release
rm ./backup -Rf;
mv ./master ./backup;
mv ./release ./master;
rm ./artifacts.tar.gz

echo $PROJECT_KEY
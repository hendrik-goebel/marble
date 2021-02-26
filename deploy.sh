#!/bin/bash
mkdir release;
mv artifacts.tar.gz release;
tar -xvzf release/artifacts.tar.gz;
rm backup -Rf;
mv master backup;
mv release master;

echo $PROJECT_KEY
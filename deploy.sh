#!/bin/bash
mkdir $REMOTE_PATH/test/release;
tar -xvzf $REMOTE_PATH/test/artifacts.tar.gz --directory $REMOTE_PATH/test/release
rm $REMOTE_PATH/test/backup -Rf;
mv $REMOTE_PATH/test/master ./backup;
mv $REMOTE_PATH/test/release ./master;
rm $REMOTE_PATH/test/artifacts.tar.gz
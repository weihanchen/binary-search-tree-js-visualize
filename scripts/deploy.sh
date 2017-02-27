#!/bin/bash

# variables
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
TARGET_FOLDER="public"
GITHUB_REPO="@github.com/weihanchen/binary-search-tree-js-visualize.git"
FULL_REPO="https://${GITHUB_TOKEN}${GITHUB_REPO}"

# config
git config --global user.email "${GITHUB_MAIL}"
git config --global user.name "${GITHUB_USER}"

#deploy
git clone -b $TARGET_BRANCH $FULL_REPO $TARGET_FOLDER
cp -r builds/* $TARGET_FOLDER
cp readme.md  $TARGET_FOLDER
cd $TARGET_FOLDER
git add .
MESSAGE=`date +\ %Y-%m-%d\ %H:%M:%S`
git commit -m "Site updated:${MESSAGE}"
git push --force "https://${GITHUB_TOKEN}${GITHUB_REPO}" $TARGET_BRANCH:$TARGET_BRANCH > /dev/null 2>&1

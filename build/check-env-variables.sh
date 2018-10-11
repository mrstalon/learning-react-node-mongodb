#!/bin/bash

echo "===== Checking your environment variables."

appEnvVariables=(
    YA_SCHOOL_TASK1_ENV
)

for i in "${!appEnvVariables[@]}"
do
    if [ "${!appEnvVariables[$i]}" = "" ]; then
        echo "===== ERROR: ${appEnvVariables[$i]} environment variables is not specified, please fix it."
        exit 1
    fi
done

echo "===== SUCCESS: All environment variables are OK."

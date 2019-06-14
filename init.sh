#!/bin/bash

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

exec $*
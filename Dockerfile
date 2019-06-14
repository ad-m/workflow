FROM node:lts

# Create app directory
WORKDIR /usr/src/app

ENV GCLOUD_HOME=/opt/google-cloud-sdk

RUN \
GCLOUD_HOME=/opt/google-cloud-sdk \
&& GCLOUD_URL=https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-250.0.0-linux-x86_64.tar.gz \
&& GCLOUD_TMP_FILE=/tmp/google-cloud-sdk.tar.gz \
&& curl -sL ${GCLOUD_URL} > ${GCLOUD_TMP_FILE} \
&& mkdir ${GCLOUD_HOME} \
&& tar xzf ${GCLOUD_TMP_FILE} --strip-components 1 -C ${GCLOUD_HOME} \
&& rm ${GCLOUD_TMP_FILE}

ENV PATH="${GCLOUD_HOME}/bin:${PATH}"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

CMD [ "npm", "start" ]
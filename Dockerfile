# Download alpine image
FROM alpine:3.11

# Set Java runtime environment variable
ENV JAVA_HOME=/usr/lib/jvm/default-jvm
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Install required dependencies
RUN apk add --no-cache openjdk8
RUN apk add --update npm curl docker git

RUN curl -s -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873.zip -o sonarscanner.zip \
  && unzip -qq sonarscanner.zip \
  && rm -rf sonarscanner.zip \
  && mv sonar-scanner-4.2.0.1873 sonar-scanner
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /sonar-scanner/bin/sonar-scanner

ENV SONAR_RUNNER_HOME=sonar-scanner
ENV PATH $PATH:/sonar-scanner/bin

WORKDIR /usr/src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

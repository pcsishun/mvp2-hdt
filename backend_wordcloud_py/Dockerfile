FROM python:3.10-alpine

RUN apk add --no-cache tini && mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN apk add g++ jpeg-dev zlib-dev libjpeg make
RUN pip3 install --upgrade setuptools
RUN pip3 install -r requirements.txt

ENTRYPOINT [ "python" ]
CMD ["main.py" ]
